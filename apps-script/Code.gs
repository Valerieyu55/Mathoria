/**
 * MATHORIA 數域魔法學院 — Google Apps Script 後端
 * ------------------------------------------------------------
 * 功能
 *   1. 記錄學生事件（登入、任務回報、擊敗魔王）到「事件紀錄」工作表
 *   2. 在後端驗證魔王核可碼（密語只存在這裡，前端看不到）
 *   3. 學生換裝置時，依班級座號還原進度
 *   4. 教師後台：全班統計、每位學生明細、全班核可碼表
 *
 * 部署方式（詳見 README）
 *   擴充功能 → Apps Script → 貼上本檔 → 執行一次 setup()
 *   → 專案設定 → 指令碼屬性：TEACHER_KEY、APPROVAL_SECRET
 *   → 部署 → 新增部署作業 → 網頁應用程式
 *      執行身分：我　｜　存取權：任何人
 *   → 複製網址，貼到 js/courses.js 的 apiUrl
 */

const SHEET_EVENTS = '事件紀錄';
const SHEET_STUDENTS = '學生名冊';
const EVENT_HEADERS = ['時間', '班級', '座號', '暱稱', '造型', '寵物', '類型', '項目', 'XP', '裝置'];
const STUDENT_HEADERS = ['班級', '座號', '暱稱', '造型', '寵物', '首次登入', '最後活動'];

/* 據點 id 清單需與 js/courses.js 一致（用於核可碼表） */
const STATIONS = [
  { id: 'similar', name: '相似形之森' }, { id: 'circle', name: '圓環聖殿' },
  { id: 'truth', name: '真理審判庭' }, { id: 'threecenter', name: '三心神殿' },
  { id: 'parabola', name: '拋物線天空塔' }, { id: 'probability', name: '機率命運島' },
  { id: 'space', name: '空間魔方城' }, { id: 'final', name: '終焉試煉之地' }
];

/* ---------- 第一次使用：建立工作表 ---------- */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  [[SHEET_EVENTS, EVENT_HEADERS], [SHEET_STUDENTS, STUDENT_HEADERS]].forEach(([name, headers]) => {
    let sh = ss.getSheetByName(name);
    if (!sh) sh = ss.insertSheet(name);
    if (sh.getLastRow() === 0) {
      sh.appendRow(headers);
      sh.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#efedff');
      sh.setFrozenRows(1);
    }
  });
  const props = PropertiesService.getScriptProperties();
  const rnd = n => Utilities.getUuid().replace(/-/g, '').slice(0, n);
  if (!props.getProperty('TEACHER_KEY')) props.setProperty('TEACHER_KEY', 'mt-' + rnd(10));
  if (!props.getProperty('APPROVAL_SECRET')) props.setProperty('APPROVAL_SECRET', rnd(24));
  Logger.log('完成。教師後台金鑰 TEACHER_KEY = ' + props.getProperty('TEACHER_KEY'));
  Logger.log('核可碼密語已自動產生並存在「專案設定 → 指令碼屬性 → APPROVAL_SECRET」，之後不要再改。');
}

/* ---------- 共用 ---------- */
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
function prop(k) { return PropertiesService.getScriptProperties().getProperty(k) || ''; }
function sheet(name) { return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name); }
function normSeat(s) { return String(parseInt(s, 10)); }
function clean(s, n) { return String(s == null ? '' : s).replace(/[\r\n\t]/g, ' ').trim().slice(0, n || 40); }

/* 與前端相同的核可碼演算法（FNV-1a 雙向） */
function approvalCode(secret, cls, seat, stationId) {
  const str = secret + '|' + String(cls).trim() + '|' + normSeat(seat) + '|' + stationId;
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  let h2 = 0x811c9dc5;
  for (let i = str.length - 1; i >= 0; i--) { h2 ^= str.charCodeAt(i); h2 = Math.imul(h2, 0x01000193) >>> 0; }
  return ((h.toString(36) + h2.toString(36)).toUpperCase().replace(/[^A-Z0-9]/g, '') + 'ZZZZZZ').slice(0, 6);
}

function readEvents() {
  const sh = sheet(SHEET_EVENTS); const n = sh.getLastRow();
  if (n < 2) return [];
  return sh.getRange(2, 1, n - 1, EVENT_HEADERS.length).getValues().map(r => ({
    t: r[0] instanceof Date ? r[0].getTime() : r[0], cls: String(r[1]), seat: String(r[2]), name: r[3],
    gender: r[4], pet: r[5], type: r[6], id: r[7], xp: Number(r[8]) || 0
  }));
}

function upsertStudent(p) {
  const sh = sheet(SHEET_STUDENTS); const n = sh.getLastRow(); const now = new Date();
  if (n >= 2) {
    const rows = sh.getRange(2, 1, n - 1, 2).getValues();
    for (let i = 0; i < rows.length; i++) {
      if (String(rows[i][0]) === p.cls && String(rows[i][1]) === p.seat) {
        sh.getRange(i + 2, 3, 1, 3).setValues([[p.name, p.gender, p.pet]]);
        sh.getRange(i + 2, 7).setValue(now);
        return;
      }
    }
  }
  sh.appendRow([p.cls, p.seat, p.name, p.gender, p.pet, now, now]);
}

/* ---------- POST：學生端寫入 ---------- */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const body = JSON.parse(e.postData.contents || '{}');
    const p = {
      cls: clean(body.cls, 6), seat: normSeat(body.seat), name: clean(body.name, 12),
      gender: clean(body.gender, 8), pet: clean(body.pet, 20)
    };
    if (!p.cls || p.seat === 'NaN') return json({ ok: false, error: 'bad_student' });

    if (body.action === 'login') { upsertStudent(p); return json({ ok: true }); }

    if (body.action === 'lesson') {
      const id = clean(body.id, 20), xp = Math.max(0, Math.min(200, Number(body.xp) || 0));
      const already = readEvents().some(ev => ev.cls === p.cls && ev.seat === p.seat && ev.type === 'lesson' && ev.id === id);
      if (!already) sheet(SHEET_EVENTS).appendRow([new Date(), p.cls, p.seat, p.name, p.gender, p.pet, 'lesson', id, xp, clean(body.ua, 60)]);
      upsertStudent(p);
      return json({ ok: true, duplicate: already });
    }

    if (body.action === 'boss') {
      const st = clean(body.station, 20), code = clean(body.code, 6).toUpperCase();
      if (!STATIONS.some(s => s.id === st)) return json({ ok: false, error: 'bad_station' });
      if (code !== approvalCode(prop('APPROVAL_SECRET'), p.cls, p.seat, st)) return json({ ok: false, error: 'bad_code' });
      const xp = st === 'final' ? 400 : 150;
      const already = readEvents().some(ev => ev.cls === p.cls && ev.seat === p.seat && ev.type === 'boss' && ev.id === st);
      if (!already) sheet(SHEET_EVENTS).appendRow([new Date(), p.cls, p.seat, p.name, p.gender, p.pet, 'boss', st, xp, clean(body.ua, 60)]);
      upsertStudent(p);
      return json({ ok: true, xp: xp, duplicate: already });
    }
    return json({ ok: false, error: 'bad_action' });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* ---------- GET：讀取 ---------- */
function doGet(e) {
  const q = e.parameter || {};
  try {
    /* 學生：還原自己的進度 */
    if (q.action === 'progress') {
      const cls = clean(q.cls, 6), seat = normSeat(q.seat);
      const evs = readEvents().filter(ev => ev.cls === cls && ev.seat === seat);
      return json({ ok: true, events: evs.map(ev => ({ t: ev.t, type: ev.type, id: ev.id, xp: ev.xp })) });
    }

    /* 以下需要教師金鑰 */
    if (!q.key || q.key !== prop('TEACHER_KEY')) return json({ ok: false, error: 'unauthorized' });

    if (q.action === 'ping') return json({ ok: true });

    if (q.action === 'dashboard') {
      const evs = readEvents().filter(ev => !q.cls || ev.cls === String(q.cls));
      const shS = sheet(SHEET_STUDENTS); const n = shS.getLastRow();
      const roster = n >= 2 ? shS.getRange(2, 1, n - 1, STUDENT_HEADERS.length).getValues() : [];
      const map = {};
      roster.forEach(r => {
        const cls = String(r[0]), seat = String(r[1]);
        if (q.cls && cls !== String(q.cls)) return;
        map[cls + '-' + seat] = { cls, seat, name: r[2], gender: r[3], pet: r[4],
          first: r[5] instanceof Date ? r[5].getTime() : r[5], last: r[6] instanceof Date ? r[6].getTime() : r[6],
          xp: 0, lessons: [], bosses: [] };
      });
      evs.forEach(ev => {
        const k = ev.cls + '-' + ev.seat;
        if (!map[k]) map[k] = { cls: ev.cls, seat: ev.seat, name: ev.name, xp: 0, lessons: [], bosses: [] };
        map[k].xp += ev.xp;
        if (ev.type === 'lesson') map[k].lessons.push(ev.id);
        if (ev.type === 'boss') map[k].bosses.push(ev.id);
        if (!map[k].last || ev.t > map[k].last) map[k].last = ev.t;
      });
      const recent = evs.slice(-30).reverse();
      return json({ ok: true, students: Object.values(map), recent: recent });
    }

    if (q.action === 'codes') {
      const cls = clean(q.cls, 6), from = parseInt(q.from, 10) || 1, to = parseInt(q.to, 10) || 35;
      const secret = prop('APPROVAL_SECRET'); const rows = [];
      for (let s = from; s <= to; s++) rows.push({ seat: s, codes: STATIONS.map(st => approvalCode(secret, cls, s, st.id)) });
      return json({ ok: true, stations: STATIONS, rows: rows });
    }
    return json({ ok: false, error: 'bad_action' });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}
