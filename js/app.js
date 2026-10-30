/* MATHORIA 數域魔法學院 — 主程式（純前端，進度存於 localStorage） */
(function () {
  "use strict";
  const C = window.MATHORIA_CONFIG;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- 儲存 ---------- */
  const KEY_PROFILE = "mathoria.profile";
  const keyProgress = (p) => `mathoria.progress.${p.cls}-${p.seat}`;
  let profile = null, prog = null;

  function loadProfile() { try { return JSON.parse(localStorage.getItem(KEY_PROFILE)); } catch (e) { return null; } }
  /* 模式：student 正式學生｜guest 訪客試玩（不存檔、不回傳）｜preview 教師預覽（全關卡開放、可切換進度） */
  let MODE = "student";
  const isReal = () => MODE === "student";
  function saveProfile() { if (isReal()) localStorage.setItem(KEY_PROFILE, JSON.stringify(profile)); }
  function blankProgress() { return { xp: 0, done: {}, bosses: {}, stats: { calc: 0, shape: 0, reason: 0, proof: 0, apply: 0 }, log: [] }; }
  function loadProgress() {
    if (!isReal()) { if (!prog) prog = blankProgress(); return; }
    try { prog = JSON.parse(localStorage.getItem(keyProgress(profile))); } catch (e) { prog = null; }
    if (!prog) prog = { xp: 0, done: {}, bosses: {}, stats: { calc: 0, shape: 0, reason: 0, proof: 0, apply: 0 }, log: [] };
    prog.stats = Object.assign({ calc: 0, shape: 0, reason: 0, proof: 0, apply: 0 }, prog.stats || {});
    prog.log = prog.log || [];
  }
  function saveProgress() { if (isReal()) localStorage.setItem(keyProgress(profile), JSON.stringify(prog)); }

  /* ---------- 等級／階段 ---------- */
  function levelInfo(xp) {
    let lv = 1, rest = xp, need = C.xpForLevel(1);
    while (rest >= need && lv < 99) { rest -= need; lv++; need = C.xpForLevel(lv); }
    return { lv, cur: rest, need };
  }
  function stageOf(lv) {
    let s = C.stages[0];
    for (const st of C.stages) if (lv >= st.min) s = st;
    return s;
  }
  function nextStage(lv) { return C.stages.find(st => st.min > lv) || null; }
  const charImg = (stage) => `assets/char/${profile.gender}_stage_${stage}.png`;
  const faceImg = (n = 1) => `assets/face/${profile.gender}_expression_0${n}.png`;
  const petOf = () => C.pets.find(x => x.id === profile.pet) || C.pets[0];
  const petImg = (stage, p = petOf()) => p.hd ? `assets/pet/${p.file}_stage_${stage}.png` : `assets/pet/${p.file}_stage_${stage}_token.png`;

  /* ---------- 核可碼（與 teacher.html 相同演算法） ---------- */
  function approvalCode(cls, seat, stationId) {
    const str = `${C.approvalSecret}|${String(cls).trim()}|${String(parseInt(seat, 10))}|${stationId}`;
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    let h2 = 0x811c9dc5;
    for (let i = str.length - 1; i >= 0; i--) { h2 ^= str.charCodeAt(i); h2 = Math.imul(h2, 0x01000193) >>> 0; }
    return ((h.toString(36) + h2.toString(36)).toUpperCase().replace(/[^A-Z0-9]/g, "") + "ZZZZZZ").slice(0, 6);
  }
  window.MATHORIA_approvalCode = approvalCode;

  /* ---------- 雲端回傳（Google Apps Script） ---------- */
  const API = (C.apiUrl || "").trim();
  const KEY_OUTBOX = "mathoria.outbox";
  async function apiPost(body) {
    const r = await fetch(API, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(Object.assign({ cls: profile.cls, seat: profile.seat, name: profile.name, gender: profile.gender, pet: profile.pet, ua: navigator.userAgent.slice(0, 60) }, body)) });
    return r.json();
  }
  async function apiGet(params) {
    const r = await fetch(API + "?" + new URLSearchParams(params).toString());
    return r.json();
  }
  function outbox() { try { return JSON.parse(localStorage.getItem(KEY_OUTBOX)) || []; } catch (e) { return []; } }
  function queue(item) { const q = outbox(); q.push(item); localStorage.setItem(KEY_OUTBOX, JSON.stringify(q)); }
  async function flushOutbox() {
    if (!API) return; const q = outbox(); if (!q.length) return;
    const left = [];
    for (const it of q) { try { const r = await apiPost(it); if (!r.ok && r.error !== "bad_student") left.push(it); } catch (e) { left.push(it); } }
    localStorage.setItem(KEY_OUTBOX, JSON.stringify(left));
  }
  function lessonById(id) {
    for (const s of C.stations) { const l = s.lessons.find(x => x.id === id) || (s.project && s.project.id === id ? s.project : null); if (l) return l; }
    return null;
  }
  /* 從雲端合併進度：雲端有、本機沒有的事件補進來（換裝置時就是整個還原） */
  async function syncFromCloud() {
    if (!API) return;
    try {
      const r = await apiGet({ action: "progress", cls: profile.cls, seat: profile.seat });
      if (!r.ok) return;
      let added = 0;
      r.events.forEach(ev => {
        if (ev.type === "lesson" && /^boss:/.test(ev.id)) {   /* 魔王戰勝利（相容紀錄） */
          const sid = ev.id.slice(5).split("#")[0];
          if (!prog.done[ev.id]) { prog.done[ev.id] = true; prog.xp += ev.xp; added++; }
          prog.bosses[sid] = true; return;
        }
        if (ev.type === "lesson" && !prog.done[ev.id]) {
          prog.done[ev.id] = true; prog.xp += ev.xp; added++;
          const l = lessonById(ev.id); if (l && prog.stats[l.stat] !== undefined) prog.stats[l.stat] += 1;
        }
        if (ev.type === "boss" && !prog.bosses[ev.id]) { prog.bosses[ev.id] = true; prog.xp += ev.xp; added++; }
      });
      if (added) { saveProgress(); renderAll(); toast(`已從雲端還原 ${added} 筆進度`); }
    } catch (e) { /* 離線時略過 */ }
  }

  /* ---------- 據點狀態 ---------- */
  function stationProgress(st) {
    const total = st.lessons.length + (st.project ? 1 : 0) + 1;
    let done = st.lessons.filter(l => prog.done[l.id]).length;
    if (st.project && prog.done[st.project.id]) done++;
    if (prog.bosses[st.id]) done++;
    return { done, total, pct: Math.round(done / total * 100) };
  }
  function isOpen(st) {
    if (MODE === "preview") return true;
    if (st.sealed) return false;
    if (st.isFinal) return C.stations.filter(s => !s.sealed && !s.isFinal).every(s => prog.bosses[s.id]);
    const active = C.stations.filter(s => !s.sealed && !s.isFinal);
    const i = active.indexOf(st);
    if (i <= 0) return true;
    const prev = active[i - 1];
    return prev.lessons.some(l => prog.done[l.id]) || !!prog.bosses[prev.id];
  }
  function stateOf(st) {
    if (prog.bosses[st.id]) return "cleared";
    return isOpen(st) ? "open" : "locked";
  }
  function currentStation() {
    return C.stations.find(st => stateOf(st) === "open") || null;
  }

  /* ---------- 入口畫面 ---------- */
  function initGate() {
    const petRow = $("#pick-pet");
    petRow.innerHTML = C.pets.map((p, i) => `
      <button type="button" class="pick ${i === 0 ? "is-on" : ""}" data-v="${p.id}">
        <img class="${p.hd ? "pet-hd" : "pet-token"}" src="${petImg(1, p)}" alt=""><span>${p.name}</span><small>${p.trait}</small>
      </button>`).join("");
    $$(".pick-row").forEach(row => row.addEventListener("click", e => {
      const b = e.target.closest(".pick"); if (!b) return;
      $$(".pick", row).forEach(x => x.classList.remove("is-on")); b.classList.add("is-on");
      if (row.id === "pick-gender") $$("#pick-pet img").forEach(img => { /* 寵物圖不分性別 */ });
    }));
    const saved = loadProfile();
    if (saved) { $("#in-class").value = saved.cls; $("#in-seat").value = saved.seat; $("#in-name").value = saved.name; }
    let guestPick = false;
    const openGate = (guest) => {
      guestPick = guest;
      $("#modal-gate").classList.toggle("is-guest", guest);
      $("#in-class").required = !guest; $("#in-seat").required = !guest; $("#in-name").required = !guest;
      $("#gate-title").textContent = guest ? "訪客試玩" : "入學登記";
      $("#gate-sub").textContent = guest ? "不用填班級座號，進度不會儲存，關掉網頁就重來。" : "建立你的冒險者，進入數域魔法學院。";
      $("#gate-submit").textContent = guest ? "開始試玩 ✦" : "入學・進入數域 ✦";
      $("#modal-gate").hidden = false; A.sfx("open");
      setTimeout(() => (guest ? $("#in-name") : $("#in-class")).focus(), 50);
    };
    $("#btn-start").addEventListener("click", () => openGate(false));
    /* 教師登入：後端驗證密碼，通過後帶著密碼進後台（只存在這個分頁，關掉就登出） */
    $("#btn-teacher-login").addEventListener("click", () => { $("#modal-tlogin").hidden = false; A.sfx("open"); setTimeout(() => $("#tlogin-key").focus(), 50); });
    $("#tlogin-form").addEventListener("submit", async e => {
      e.preventDefault();
      const key = $("#tlogin-key").value.trim(), err = $("#tlogin-err"), btn = $("#tlogin-submit");
      const fail = m => { err.textContent = m; err.hidden = false; A.sfx("fail"); btn.disabled = false; btn.textContent = "進入教師後台"; };
      if (!key) return fail("請輸入教師密碼。");
      if (!API) { location.href = "teacher.html"; return; }
      btn.disabled = true; btn.textContent = "驗證中…"; err.hidden = true;
      try {
        const r = await apiGet({ action: "ping", key });
        if (!r.ok) return fail("密碼不正確。");
        try { sessionStorage.setItem("mathoria.teacherKey", key); } catch (e2) {}
        location.href = "teacher.html";
      } catch (e2) { fail("暫時連不上學院伺服器，稍後再試。"); }
    });
    $("#btn-guest").addEventListener("click", () => openGate(true));
    $("#gate-form").addEventListener("submit", e => {
      e.preventDefault();
      const err = $("#gate-err");
      if (guestPick) {
        MODE = "guest"; prog = null;
        profile = { guest: true, cls: "訪客", seat: "0", name: $("#in-name").value.trim() || "訪客冒險者",
          gender: $("#pick-gender .is-on").dataset.v, pet: $("#pick-pet .is-on").dataset.v };
        err.hidden = true; $("#modal-gate").hidden = true; enterHub(); armAudio(); return;
      }
      MODE = "student";
      const cls = $("#in-class").value.trim(), seat = $("#in-seat").value.trim(), name = $("#in-name").value.trim();
      if (!cls || !seat || !name) { err.textContent = "請填寫班級、座號與暱稱。"; err.hidden = false; return; }
      if (!/^\d{1,3}$/.test(seat)) { err.textContent = "座號請填數字。"; err.hidden = false; return; }
      err.hidden = true;
      profile = { cls, seat: String(parseInt(seat, 10)), name,
        gender: $("#pick-gender .is-on").dataset.v, pet: $("#pick-pet .is-on").dataset.v, created: Date.now() };
      saveProfile(); $("#modal-gate").hidden = true; enterHub(); armAudio();
    });
  }

  /* ---------- 主城 ---------- */
  function enterHub() {
    loadProgress();
    $("#screen-gate").hidden = true; $("#screen-hub").hidden = false;
    renderAll();
    pan = { x: 0, y: 0 }; layoutStage();
    const cur = currentStation(); if (cur) centerOn(cur);
    updateSoundBtn();
    if (MODE !== "preview" && !seen("opening")) setTimeout(() => playStory(S.opening, null, () => markSeen("opening")), 500);
    if (API && isReal()) { apiPost({ action: "login" }).catch(() => {}); flushOutbox().then(syncFromCloud); }
  }
  function renderAll() { renderHUD(); renderMap(); renderList(); renderQuest(); if (typeof renderModeBar === "function" && MODE !== "student") renderModeBar(); }

  function renderHUD() {
    const li = levelInfo(prog.xp), st = stageOf(li.lv), nx = nextStage(li.lv);
    $("#chip-face").src = faceImg(1); $("#chip-name").textContent = profile.name;
    $("#chip-title").textContent = `${profile.cls} 班 ${profile.seat} 號 ・ ${st.name}`; $("#chip-lv").textContent = `Lv.${li.lv}`;
    $("#hud-name").textContent = profile.name; $("#hud-lv").textContent = `Lv.${li.lv}`;
    $("#hud-title").textContent = st.name; $("#hud-title-en").textContent = st.en;
    $("#char-img").src = charImg(st.id); $("#pet-img").src = petImg(st.id); $("#pet-img").classList.toggle("token", !petOf().hd);
    $("#status-img").src = charImg(st.id); $("#status-pet").src = petImg(st.id); $("#status-pet").classList.toggle("token", !petOf().hd);
    $("#char-aura").className = `char-aura s${st.id}`;
    $("#xp-mini-fill").style.width = `${Math.round(li.cur / li.need * 100)}%`;
    $("#xp-fill").style.width = `${Math.round(li.cur / li.need * 100)}%`;
    $("#xp-text").textContent = `${li.cur} / ${li.need} XP`;
    $("#hud-next").textContent = nx ? `再 ${nx.min - li.lv} 級進化為「${nx.name}」` : "已達最終型態，守護數域世界！";
    /* 能力 */
    const colors = { calc: "#8fd0ff", shape: "#ffd166", reason: "#f4a3c8", proof: "#a79bf0", apply: "#5fd3a8" };
    const max = Math.max(5, ...Object.values(prog.stats));
    $("#stats").innerHTML = Object.entries(C.stats).map(([k, n]) =>
      `<div class="stat"><span>${n}</span><div class="bar"><i style="width:${Math.round(prog.stats[k] / max * 100)}%;background:${colors[k]}"></i></div><b>${prog.stats[k]}</b></div>`).join("");
    /* 徽章 */
    const got = C.stations.filter(s => prog.bosses[s.id]).length;
    $("#badge-count").textContent = `${got} / ${C.stations.length}`;
    $("#badges").innerHTML = C.stations.map(s =>
      `<div class="badge ${prog.bosses[s.id] ? "on" : ""}" title="${s.name}"><img src="assets/badge/${s.badge}" alt=""><span>${s.isFinal ? "守護者之章" : s.name.slice(0, 2) + "之章"}</span></div>`).join("");
  }

  function renderMap() {
    const cur = currentStation();
    $("#stage-fog").innerHTML = C.stations.filter(s => stateOf(s) === "locked").map(s => {
      const q = s.pos; return `<span class="fog" style="left:${q.x}%;top:${q.y}%;width:${q.fogW}%;height:${q.fogH}%"></span>`;
    }).join("");
    $("#map-nodes").innerHTML = C.stations.map(s => {
      const state = stateOf(s), q = s.pos, p = stationProgress(s);
      const medal = state === "cleared" ? `<img src="assets/badge/${s.badge}" alt="">` : (state === "locked" ? "🔒" : s.num);
      const sub = state === "locked" ? (s.sealed ? "迷霧封印" : "尚未開放") : (state === "cleared" ? "魔王已擊敗" : `${p.done}/${p.total}`);
      return `<button class="node ${state} ${s.isFinal ? "final" : ""} ${cur && cur.id === s.id ? "current" : ""}" style="left:${q.x}%;top:${q.y}%" data-st="${s.id}" title="${s.name}">
        <span class="node-ring"></span><span class="node-medal">${medal}</span>
        <span class="node-label"><b>${s.name}</b><small>${sub}</small></span>
        ${cur && cur.id === s.id ? `<span class="node-now">目前任務</span>` : ""}</button>`;
    }).join("");
  }

  function renderList() {
    $("#station-list").innerHTML = C.stations.map(s => {
      const state = stateOf(s), p = stationProgress(s);
      return `<button class="scard ${state}" data-st="${s.id}">
        <span class="m">${state === "cleared" ? "✓" : s.num}</span>
        <span><b>${s.name}</b><small>${s.term}・${s.chapter}${s.sealed ? "・迷霧封印" : ""}</small>
        <span class="prog"><i style="width:${p.pct}%"></i></span></span></button>`;
    }).join("");
  }

  function renderQuest() {
    const box = $("#quest-now"), st = currentStation();
    if (!st) {
      const all = C.stations.every(s => s.sealed || prog.bosses[s.id]);
      box.innerHTML = all ? `<span class="q-k">任務</span><b>你已成為數域守護者！</b><span>Find the value of you — x = 你。</span>`
        : `<span class="q-k">任務</span><b>等待新的據點開放</b><span>老師解除迷霧封印後，新的冒險就會出現在地圖上。</span>`;
      return;
    }
    const lesson = st.lessons.find(l => !prog.done[l.id]);
    const text = lesson ? `前往 ${lesson.title}` : (st.project && !prog.done[st.project.id] ? `完成專題：${st.project.title}` : `挑戰魔王「${st.boss.name}」`);
    box.innerHTML = `<span class="q-k">目前任務</span><b>${st.num}・${st.name}</b><span>${text}</span><button class="btn-gold" data-st="${st.id}">前往 ✦</button>`;
  }

  /* ---------- 據點面板 ---------- */
  let openStationId = null;
  function renderStation(id) {
    const st = C.stations.find(s => s.id === id); if (!st) return;
    openStationId = id;
    const state = stateOf(st), p = stationProgress(st);
    const stat = k => C.stats[k] || "";
    const lessonHTML = (l, kind) => {
      const done = !!prog.done[l.id];
      const xp = kind === "project" ? C.xp.project : C.xp.lesson;
      const link = l.url ? `<a class="btn-line" href="${l.url}" target="_blank" rel="noopener">前往探索 ↗</a>` : "";
      const act = done ? `<span class="done-mark">✓ 已完成 +${xp} XP</span>` : `<button class="btn-gold" data-done="${l.id}" data-xp="${xp}" data-stat="${l.stat}">回報完成</button>`;
      return `<div class="lesson ${done ? "done" : ""}"><div><b>${l.title}<span class="tag">${stat(l.stat)}</span></b><p>${l.task}${l.urlLabel ? `　｜ 課程：${l.urlLabel}` : ""}</p></div><div class="acts">${link}${act}</div></div>`;
    };
    let body = "";
    if (state === "locked") {
      body = st.sealed
        ? `<div class="st-sealed">🌫️ 這座據點仍被迷霧封印。老師在課堂上開放後，就能進入探索。<br><small>本章內容：${st.lessons.map(l => l.title).join("、")}</small></div>`
        : (st.isFinal ? `<div class="st-sealed">⛩️ 金色之門緊閉。集齊其他據點的徽章後，才能進入終焉試煉之地。</div>`
          : `<div class="st-sealed">🔒 先在前一個據點完成至少一個任務，這裡的道路就會打開。</div>`);
    } else {
      const bossDone = !!prog.bosses[st.id];
      const bossXP = st.isFinal ? C.xp.finalBoss : C.xp.boss;
      body = `
        <div class="st-section"><h3>探索任務</h3>${st.lessons.map(l => lessonHTML(l, "lesson")).join("")}</div>
        ${st.project ? `<div class="st-section"><h3>專題任務</h3>${lessonHTML(st.project, "project")}</div>` : ""}
        <div class="st-section"><h3>魔王戰</h3>
          <div class="boss ${bossDone ? "defeated" : ""}">
            <img class="b-art" src="assets/boss/boss_${st.id}.png" alt="${st.boss.name}" onerror="this.remove()">
            <p class="b-name">${bossDone ? "✦ 已擊敗：" : "👾 "}${st.boss.name} <button class="b-replay" data-replay="${st.id}" title="重播魔王對話">▶ 對話</button></p>
            <p class="b-myth"><b>它的迷思：</b>${st.boss.myth}</p>
            <p class="b-hint">破解之道：${st.boss.hint}</p>
            ${bossDone ? `<p class="b-note">你已獲得徽章與 ${bossXP} XP。</p><div class="b-form"><button class="btn-line" data-boss="${st.id}" data-practice="1">⚔️ 再戰一次（練習）</button></div>` : `
              <div class="b-form"><button class="btn-gold btn-fight" data-boss="${st.id}" data-xp="${bossXP}">⚔️ 挑戰魔王</button></div>
              <p class="b-note">答對題目就能攻擊魔王，連續答對 3 題會爆擊；答錯會被反擊。失去 ${QB.battle.hearts} 顆心就要重新挑戰，可以無限次挑戰。${MODE === "preview" ? "（教師預覽：不會寫入試算表）" : MODE === "guest" ? "（訪客模式：不會儲存）" : ""}</p>`}
          </div></div>`;
    }
    $("#station-content").innerHTML = `
      <div class="st-head"><img src="assets/badge/${st.badge}" alt="" style="${state === "cleared" ? "" : "filter:grayscale(1) brightness(.6)"}">
        <div><p class="k">${st.term}・${st.chapter}・進度 ${p.done}/${p.total}</p><h2>${st.num}・${st.name}<small>${st.en}</small></h2></div></div>
      <p class="st-intro">${st.intro}</p>${MODE === "preview" && st.sealed ? `<div class="st-sealed" style="margin-bottom:12px">👁️ 教師預覽：這座據點目前對學生仍是「迷霧封印」。</div>` : ""}${body}`;
    $("#modal-station").hidden = false;
    A.sfx("open");
  }

  function completeLesson(id, xp, stat) {
    if (prog.done[id]) return;
    if (isReal() && !confirm("確定你已經完成這個任務了嗎？\n誠實回報，才是真正的守護者精神。")) return;
    prog.done[id] = true; prog.log.push({ t: Date.now(), id, xp });
    if (stat && prog.stats[stat] !== undefined) prog.stats[stat] += 1;
    gainXP(xp, "任務完成");
    renderStation(openStationId);
    maybeBossBefore(C.stations.find(s => s.id === openStationId));
    if (API && isReal()) { const item = { action: "lesson", id, xp }; apiPost(item).then(r => { if (!r.ok) queue(item); }).catch(() => queue(item)); }
  }
  function defeatBoss(stId, xp, practice) {
    const st = C.stations.find(s => s.id === stId);
    inBattle = true;
    battle(st, won => {
      if (!won || practice) {
        inBattle = false; setTimeout(() => A.theme("map"), won ? 3000 : 300);
        if (won) toast("練習戰勝利！題目越熟，下次越快破關。");
        return;
      }
      prog.bosses[stId] = true; prog.log.push({ t: Date.now(), id: "boss:" + stId, xp });
      saveProgress();
      if (API && isReal()) reportBoss(stId, xp);
      renderStation(stId);
      playStory(storyFor(stId, "bossAfter"), st, () => { inBattle = false; gainXP(xp, `擊敗「${st.boss.name}」，獲得徽章！`); renderStation(stId); setTimeout(() => A.theme("map"), 5000); });
    });
  }
  /* 回報魔王勝利：新版後台用 bossWin；舊版後台改用 lesson 紀錄（id 為 boss:據點） */
  async function reportBoss(stId, xp) {
    const fallback = () => {
      const items = xp > 200 ? [{ action: "lesson", id: "boss:" + stId, xp: 200 }, { action: "lesson", id: "boss:" + stId + "#2", xp: xp - 200 }]
                             : [{ action: "lesson", id: "boss:" + stId, xp }];
      items.forEach(it => apiPost(it).then(r => { if (!r.ok) queue(it); }).catch(() => queue(it)));
    };
    try { const r = await apiPost({ action: "bossWin", station: stId }); if (!r.ok) fallback(); }
    catch (e) { fallback(); }
  }
  function gainXP(xp, why) {
    const before = levelInfo(prog.xp), bs = stageOf(before.lv);
    prog.xp += xp; saveProgress();
    const after = levelInfo(prog.xp), as = stageOf(after.lv);
    renderAll();
    toast(`+${xp} XP　${why}`);
    if (as.id !== bs.id) { A.sfx("evolve"); showLevelUp(true, after.lv, as); }
    else if (after.lv !== before.lv) { A.sfx("levelup"); showLevelUp(false, after.lv, as); }
    else A.sfx("xp");
  }
  function showLevelUp(evolved, lv, st) {
    if (evolved) pendingEvolve = st.id;
    $("#levelup-kicker").textContent = evolved ? "EVOLUTION!" : "LEVEL UP!";
    $("#levelup-img").src = charImg(st.id);
    $("#levelup-title").textContent = evolved ? `進化為「${st.name}」！` : `Lv.${lv}`;
    $("#levelup-desc").textContent = evolved ? st.desc : `${st.name}，距離下一次進化更近了。`;
    $("#chip-face").src = faceImg(2);
    setTimeout(() => { $("#modal-levelup").hidden = false; }, 350);
  }

  /* ---------- 人物對話 ---------- */
  const S = window.MATHORIA_STORY || { opening: [], stations: {}, evolve: {}, petVoice: {} };
  let pendingEvolve = null;
  const seen = k => !!(prog && prog.seen && prog.seen[k]);
  function markSeen(k) { prog.seen = prog.seen || {}; prog.seen[k] = true; saveProgress(); }
  const storyFor = (id, part) => (S.stations[id] && S.stations[id][part]) || [];
  function fill(text, st) {
    const pet = C.pets.find(p => p.id === profile.pet) || C.pets[0], v = S.petVoice[pet.id] || {};
    return text.replace(/\{name\}/g, profile.name).replace(/\{pet\}/g, pet.name).replace(/\{petIntro\}/g, v.intro || "")
      .replace(/\{boss\}/g, st ? st.boss.name : "").replace(/\{station\}/g, st ? st.name : "");
  }
  function withTic(text) {
    const pet = C.pets.find(p => p.id === profile.pet) || C.pets[0], tic = (S.petVoice[pet.id] || {}).tic || "";
    if (!tic) return text;
    const m = text.match(/^(.*?)([？！。]?)$/s);
    return m[1] + tic + m[2];
  }
  let dlgBusy = false; const dlgQueue = [];
  function playStory(lines, st, done) {
    if (!lines || !lines.length) { if (done) done(); return; }
    if (dlgBusy) { dlgQueue.push([lines, st, done]); return; }   /* 正在播別段：排隊，播完再接著播 */
    dlgBusy = true;
    const box = $("#dlg"), stage = stageOf(levelInfo(prog.xp).lv).id;
    const P = $("#dlg-player"), PET = $("#dlg-pet"), B = $("#dlg-boss");
    P.src = charImg(stage); PET.src = petImg(stage);
    const hasBoss = !!(st && lines.some(l => l.who === "boss"));
    B.hidden = !hasBoss; box.classList.toggle("solo", !hasBoss);   /* 沒有魔王時，主角與寵物置中 */ if (hasBoss) { B.src = `assets/boss/boss_${st.id}.png`; B.onerror = () => { B.hidden = true; }; }
    const pet = C.pets.find(p => p.id === profile.pet) || C.pets[0];
    const names = { player: profile.name, pet: pet.name, boss: st ? st.boss.name : "", narrator: "學院之聲" };
    let i = -1, typing = null, full = "", bossShown = false;
    if (hasBoss && !inBattle) A.theme("boss");
    const finish = () => { clearInterval(typing); typing = null; $("#dlg-text").textContent = full; };
    const show = () => {
      i++;
      if (i >= lines.length) { close(); return; }
      const l = lines[i];
      let text = fill(l.text, st); if (l.who === "pet") text = withTic(text);
      full = text;
      $("#dlg-name").textContent = names[l.who] || "";
      $("#dlg-box").className = "dlg-box who-" + l.who;
      [[P, "player"], [PET, "pet"], [B, "boss"]].forEach(([el, w]) => {
        el.classList.toggle("on", l.who === w); el.classList.toggle("off", l.who !== w && l.who !== "narrator");
        el.classList.remove("m-happy", "m-shock", "m-think", "m-angry");
        if (l.who === w && l.mood) { void el.offsetWidth; el.classList.add("m-" + l.mood); }
      });
      /* 音效：魔王第一次開口→登場吼聲；其他依情緒 */
      if (l.who === "boss" && !bossShown) { bossShown = true; A.sfx(inBattle ? "boss-hurt" : "boss-appear"); B.classList.add("enter"); setTimeout(() => B.classList.remove("enter"), 900); }
      else if (l.mood) A.sfx("m-" + l.mood);
      const T = $("#dlg-text"); T.textContent = ""; let k = 0; clearInterval(typing);
      typing = setInterval(() => { k++; T.textContent = text.slice(0, k); const ch = text[k - 1];
        if (k % 2 && ch && !/[\s，。！？、…「」（）～]/.test(ch)) A.voice(l.who);
        if (k >= text.length) { clearInterval(typing); typing = null; } }, 30);
    };
    const next = () => { A.sfx("page"); if (typing) finish(); else show(); };
    const key = e => { if (["Enter", " ", "ArrowRight"].includes(e.key)) { e.preventDefault(); e.stopPropagation(); next(); } if (e.key === "Escape") { e.stopPropagation(); close(); } };
    const close = () => {
      clearInterval(typing); box.hidden = true; dlgBusy = false; A.sfx("dlg-out");
      if (hasBoss && !inBattle) A.theme("map");
      box.removeEventListener("click", onClick); document.removeEventListener("keydown", key, true);
      if (done) done();
      if (dlgQueue.length && !dlgBusy) { const q = dlgQueue.shift(); setTimeout(() => playStory(...q), 250); }
    };
    const onClick = e => { if (e.target.closest("#dlg-skip")) { A.sfx("click"); close(); return; } next(); };
    box.addEventListener("click", onClick); document.addEventListener("keydown", key, true);
    box.hidden = false; A.sfx("dlg-in"); show();
  }
  function allDone(st) { return st.lessons.every(l => prog.done[l.id]) && (!st.project || prog.done[st.project.id]); }
  function maybeBossBefore(st) {
    if (!st || prog.bosses[st.id] || !allDone(st) || seen("bossBefore:" + st.id)) return;
    setTimeout(() => {
      if (!$("#modal-levelup").hidden) { pendingBossBefore = st; return; }   /* 等升級畫面關掉再登場 */
      playStory(storyFor(st.id, "bossBefore"), st, () => markSeen("bossBefore:" + st.id));
    }, 700);
  }
  function openStation(id) {
    const st = C.stations.find(s => s.id === id); if (!st) return;
    const open = () => { renderStation(id); maybeBossBefore(st); };
    if (stateOf(st) !== "locked" && !seen("enter:" + id) && storyFor(id, "enter").length) {
      playStory(storyFor(id, "enter"), st, () => { markSeen("enter:" + id); open(); });
    } else open();
  }
  let pendingBossBefore = null;
  function afterLevelUp() {
    if (pendingEvolve) { const s = pendingEvolve; pendingEvolve = null; playStory(S.evolve[s], null); }
    if (pendingBossBefore) { const st = pendingBossBefore; pendingBossBefore = null; setTimeout(() => maybeBossBefore(st), 300); }
  }


  /* ---------- 魔王戰：答題戰鬥 ---------- */
  const QB = window.MATHORIA_QUESTIONS || { battle: { hits: 6, finalHits: 10, hearts: 3, time: 60 } };
  let inBattle = false;
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function questionPool(st) {
    if (!st.isFinal) return shuffle(QB[st.id] || []);
    const mix = []; C.stations.filter(s => !s.isFinal).forEach(s => mix.push(...shuffle(QB[s.id] || []).slice(0, 2)));
    return shuffle((QB.final || []).concat(mix));
  }
  function battle(st, done) {
    const ov = $("#battle"), stage = stageOf(levelInfo(prog.xp).lv).id, cfg = QB.battle;
    const pet = C.pets.find(p => p.id === profile.pet) || C.pets[0];
    const need = st.isFinal ? cfg.finalHits : cfg.hits;
    let pool = questionPool(st), qi = 0, hits = 0, hearts = cfg.hearts, combo = 0, right = 0, asked = 0, locked = true, ended = false, timer = null, T = [];
    $("#bt-boss").src = `assets/boss/boss_${st.id}.png`; $("#bt-player").src = charImg(stage); $("#bt-pet").src = petImg(stage);
    $("#bt-bossname").textContent = st.boss.name;
    const at = (ms, fn) => T.push(setTimeout(() => { if (!ended) fn(); }, ms));
    const log = t => { const L = $("#bt-log"); L.textContent = t; L.hidden = !t; L.classList.remove("pop"); void L.offsetWidth; L.classList.add("pop"); };
    const fx = c => { ov.classList.remove(c); void ov.offsetWidth; ov.classList.add(c); };
    const hpView = () => { const v = Math.max(0, Math.round((1 - hits / need) * 100)); $("#bt-hp").style.width = v + "%"; $("#bt-hpnum").textContent = v + "%"; };
    const heartView = () => { $("#bt-hearts").innerHTML = Array.from({ length: cfg.hearts }, (_, i) => `<i class="${i < hearts ? "" : "lost"}">♥</i>`).join(""); };
    const comboView = () => { const c = $("#bt-combo"); c.textContent = combo >= 2 ? `${combo} COMBO${combo >= 3 ? "・爆擊！" : ""}` : ""; c.classList.toggle("hot", combo >= 3); };
    const dmg = (txt, cls, left) => { const d = document.createElement("span"); d.className = "bt-dmg " + (cls || ""); d.textContent = txt;
      d.style.left = (left ?? (48 + Math.random() * 16)) + "%"; $("#bt-field").appendChild(d); setTimeout(() => d.remove(), 1300); };
    const shot = cls => { const s = document.createElement("i"); s.className = "bt-shot " + cls; $("#bt-field").appendChild(s); setTimeout(() => s.remove(), 700); };
    const spell = (st.lessons[0] && C.stats[st.lessons[0].stat]) || "智慧";

    ov.className = "battle"; ov.hidden = false; $("#bt-q").hidden = true; $("#bt-ex").hidden = true; $("#bt-end").hidden = true;
    hpView(); heartView(); comboView(); log("");
    A.theme("boss");
    at(0, () => { A.sfx("boss-appear"); fx("intro"); log(`魔王「${st.boss.name}」出現了！答對題目就能攻擊它！`); });
    at(1300, () => { ov.classList.add("heroes"); });
    at(2000, ask);
    const onKey = e => {
      const i = "1234".indexOf(e.key) >= 0 ? "1234".indexOf(e.key) : "abcd".indexOf(e.key.toLowerCase());
      if (i >= 0 && !$("#bt-q").hidden) { const b = $$("#bt-opts .bt-opt")[i]; if (b && !b.disabled) b.click(); }
      if (e.key === "Enter" && !$("#bt-ex").hidden) $("#bt-ex-go").click();
    };
    document.addEventListener("keydown", onKey);

    function ask() {
      if (qi >= pool.length) { pool = questionPool(st); qi = 0; }
      const q = pool[qi++]; asked++;
      const order = shuffle([0, 1, 2, 3]);
      $("#bt-qnum").textContent = `第 ${asked} 題`;
      $("#bt-qtext").textContent = q.q;
      $("#bt-opts").innerHTML = order.map((k, i) => `<button class="bt-opt" data-k="${k}"><b>${"ABCD"[i]}</b><span>${q.o[k]}</span></button>`).join("");
      $("#bt-q").hidden = false; $("#bt-q").classList.remove("in"); void $("#bt-q").offsetWidth; $("#bt-q").classList.add("in");
      log(""); locked = false;
      $$("#bt-opts .bt-opt").forEach(b => b.addEventListener("click", () => answer(q, +b.dataset.k, b)));
      startTimer(q);
    }
    function startTimer(q) {
      clearInterval(timer); const bar = $("#bt-time"), total = cfg.time * 1000, t0 = Date.now(); let warned = false;
      bar.style.width = "100%"; bar.classList.remove("low");
      timer = setInterval(() => {
        const left = total - (Date.now() - t0), pct = Math.max(0, left / total * 100);
        bar.style.width = pct + "%";
        if (left < 10000) { bar.classList.add("low"); if (!warned || Math.floor(left / 1000) !== warned) { warned = Math.floor(left / 1000); if (left > 0) A.sfx("tick"); } }
        if (left <= 0) { clearInterval(timer); answer(q, -1, null); }
      }, 200);
    }
    function answer(q, k, btn) {
      if (locked || ended) return; locked = true; clearInterval(timer);
      const ok = k === q.a;
      $$("#bt-opts .bt-opt").forEach(b => { b.disabled = true; if (+b.dataset.k === q.a) b.classList.add("right"); });
      if (btn && !ok) btn.classList.add("wrong");
      if (ok) attack(); else counter(q, k < 0);
    }
    function attack() {
      right++; combo++; const crit = combo >= 3, n = crit ? 2 : 1;
      A.sfx("correct"); comboView();
      at(350, () => { $("#bt-q").hidden = true; const usePet = right % 2 === 0;
        log(crit ? `連續答對！${profile.name} 與 ${pet.name} 合力爆擊！` : usePet ? `${pet.name} 發動突擊！` : `${profile.name} 詠唱「${spell}魔法」！`);
        if (crit) { A.sfx("charge"); ov.classList.add("charge"); } else if (usePet) A.sfx("slash"); else A.sfx("charge"); });
      at(crit ? 950 : 800, () => { ov.classList.remove("charge"); A.sfx(crit ? "magic" : (right % 2 === 0 ? "slash" : "magic")); shot(crit ? "final" : (right % 2 === 0 ? "slash" : "magic")); });
      at(crit ? 1200 : 1050, () => {
        hits = Math.min(need, hits + n); hpView();
        A.sfx(crit ? "crit" : "hit"); A.sfx("boss-hurt"); fx(crit ? "shake-big" : "shake"); fx("bhit");
        dmg(crit ? "CRITICAL! −" + (180 + Math.floor(Math.random() * 120)) : "−" + (80 + Math.floor(Math.random() * 60)), crit ? "crit" : "");
      });
      at(crit ? 2100 : 1900, () => { if (hits >= need) win(); else ask(); });
    }
    function counter(q, timeout) {
      combo = 0; comboView(); A.sfx("wrong");
      at(450, () => { $("#bt-q").hidden = true; log(timeout ? `時間到！「${st.boss.name}」趁機反擊！` : `「${st.boss.name}」的迷思反擊！`); A.sfx("counter"); ov.classList.add("bossatk"); });
      at(900, () => { ov.classList.remove("bossatk"); hearts--; heartView(); fx("hurt"); fx("shake"); A.sfx("hit"); dmg("−♥", "hurt", 18); });
      at(1600, () => {
        if (hearts <= 0) { lose(); return; }
        $("#bt-ex-text").textContent = q.ex; $("#bt-ex-ans").textContent = "正確答案：" + q.o[q.a];
        $("#bt-ex").hidden = false; A.sfx("m-think"); log("");
      });
    }
    $("#bt-ex-go").onclick = e => { e.stopPropagation(); if (ended) return; $("#bt-ex").hidden = true; ask(); };
    function win() {
      log(`「${st.boss.name}」的迷思被破解了！`); A.sfx("explode"); ov.classList.add("explode");
      at(1200, () => { A.theme("victory"); A.sfx("victory"); ov.classList.add("win"); log("");
        showEnd(true, `答對 ${right} / ${asked} 題`, "繼續 ✦"); });
    }
    function lose() {
      A.theme("map"); A.sfx("defeat"); ov.classList.add("lose"); log("");
      showEnd(false, `答對 ${right} / ${asked} 題・魔王剩 ${Math.round((1 - hits / need) * 100)}% 血量`, "重新挑戰 ⚔️");
    }
    function showEnd(won, sub, cta) {
      $("#bt-end").hidden = false; $("#bt-end").className = "bt-end " + (won ? "won" : "lost");
      $("#bt-end-title").textContent = won ? "VICTORY!" : "挑戰失敗…";
      $("#bt-end-sub").textContent = won ? sub : sub + "。看看解析，再試一次！";
      $("#bt-end-go").textContent = cta; $("#bt-end-quit").hidden = won;
      $("#bt-end-go").onclick = e => { e.stopPropagation(); if (won) finish(true); else { finish(null); setTimeout(() => battle(st, done), 200); } };
      $("#bt-end-quit").onclick = e => { e.stopPropagation(); finish(false); };
    }
    $("#bt-quit").onclick = e => { e.stopPropagation(); if (ended) return; if ($("#bt-end").hidden && !confirm("確定要撤退嗎？這場戰鬥不會保留。")) return; finish(false); };
    function finish(result) {
      if (ended) return; ended = true; clearInterval(timer); T.forEach(clearTimeout); document.removeEventListener("keydown", onKey);
      ov.hidden = true; ov.className = "battle"; $$("#bt-field .bt-dmg, #bt-field .bt-shot").forEach(x => x.remove());
      if (result !== null) done(result);
    }
  }

  /* ---------- 全域介面音效：每個按鈕都有聲音 ---------- */
  function uiSound(el) {
    if (el.closest("#dlg") || el.matches(".bt-opt")) return null;
    if (el.matches(".node")) return el.classList.contains("locked") ? "locked" : "node";
    if (el.matches(".scard.locked")) return "locked";
    if (el.matches("[data-close], .modal-close")) return "close";
    if (el.matches("[data-boss]")) return "confirm";
    if (el.matches("[data-done]")) return "confirm";
    if (el.matches("#btn-sound")) return "toggle";
    if (el.matches(".pick")) return "pick";
    if (el.matches(".ui-link, .pv-group button, .b-replay")) return "tab";
    if (el.matches(".btn-gold, .gate-cta")) return "confirm";
    return "click";
  }
  function bindUiSounds() {
    document.addEventListener("click", e => {
      const el = e.target.closest("button, a, .node, .scard, [role=button]"); if (!el || el.disabled) return;
      const s = uiSound(el); if (s) A.sfx(s);
    }, true);
    document.addEventListener("pointerover", e => {
      if (e.pointerType !== "mouse") return;
      const el = e.target.closest("button, a, .node, .scard"); if (!el || el.disabled || el.contains(e.relatedTarget)) return;
      if (el.closest("#dlg")) return;
      A.sfx("hover");
    });
    document.addEventListener("pointerdown", armAudioAny, { once: true });
  }
  function armAudioAny() { try { A.sfx("hover"); } catch (e) {} }

  /* ---------- 圖鑑 ---------- */
  function openCodex() {
    const lv = levelInfo(prog.xp).lv, now = stageOf(lv);
    $("#codex-stages").innerHTML = C.stages.map(s => `
      <div class="cstage ${s.id > now.id ? "locked" : ""} ${s.id === now.id ? "now" : ""}">
        <img src="${charImg(s.id)}" alt=""><b>Lv.${s.min}${s.id === 4 ? "+" : "–" + (C.stages[s.id] ? C.stages[s.id].min - 1 : "")} ${s.name}</b><small>${s.en}</small><p>${s.desc}</p></div>`).join("");
    const pet = C.pets.find(p => p.id === profile.pet);
    const names = ["幼年期", "成長期", "進化期", "完全體"];
    $("#codex-pets").innerHTML = [1, 2, 3, 4].map(i => `<div class="cpet ${i > now.id ? "locked" : ""}"><img class="${pet.hd ? "pet-hd" : "pet-token"}" src="${petImg(i)}" alt=""><div>${pet.name}・${names[i - 1]}</div></div>`).join("");
    $("#modal-codex").hidden = false;
  }

  /* ---------- 其他 ---------- */
  let toastTimer;
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => t.hidden = true, 2600); }

  /* ---------- 全畫面地圖：縮放至填滿視窗 + 拖曳平移 ---------- */
  const MAP_W = 1672, MAP_H = 940;
  let pan = { x: 0, y: 0 }, stageW = 0, stageH = 0, dragging = false, moved = false, start = null;
  function layoutStage() {
    const vp = $("#viewport"), vw = vp.clientWidth, vh = vp.clientHeight;
    const scale = Math.max(vw / MAP_W, vh / MAP_H);
    stageW = MAP_W * scale; stageH = MAP_H * scale;
    const st = $("#stage"); st.style.width = stageW + "px"; st.style.height = stageH + "px";
    pan.x = Math.min(0, Math.max(vw - stageW, pan.x || (vw - stageW) / 2));
    pan.y = Math.min(0, Math.max(vh - stageH, pan.y || (vh - stageH) / 2));
    applyPan();
  }
  function applyPan() {
    $("#stage").style.transform = `translate(${pan.x}px, ${pan.y}px)`;
    requestAnimationFrame(dodgeLogo);
  }
  /* LOGO 不可遮住據點：有熱點進到 LOGO 範圍時，LOGO 自動淡出讓位 */
  function dodgeLogo() {
    const logo = $("#btn-home"); if (!logo) return;
    const L = logo.getBoundingClientRect();
    const hit = $$("#map-nodes .node").some(n => { const r = n.getBoundingClientRect(); return r.right > L.left && r.left < L.right && r.bottom > L.top && r.top < L.bottom; });
    logo.classList.toggle("dodge", hit);
  }
  function clampPan() { const vp = $("#viewport"); pan.x = Math.min(0, Math.max(vp.clientWidth - stageW, pan.x)); pan.y = Math.min(0, Math.max(vp.clientHeight - stageH, pan.y)); }
  function centerOn(st) { /* 把目前任務的據點移到畫面中央 */
    const vp = $("#viewport"), q = st.pos;
    pan.x = vp.clientWidth / 2 - q.x / 100 * stageW; pan.y = vp.clientHeight * 0.56 - q.y / 100 * stageH;
    clampPan(); applyPan();
  }
  function bindStage() {
    const vp = $("#viewport");
    vp.addEventListener("pointerdown", e => { if (e.button !== 0) return; dragging = true; moved = false; start = { x: e.clientX - pan.x, y: e.clientY - pan.y }; });
    window.addEventListener("pointermove", e => { if (!dragging) return; const nx = e.clientX - start.x, ny = e.clientY - start.y; if (Math.abs(nx - pan.x) + Math.abs(ny - pan.y) > 3) moved = true; pan.x = nx; pan.y = ny; clampPan(); applyPan(); });
    const up = () => { dragging = false; };
    window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
    vp.addEventListener("click", e => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
    window.addEventListener("resize", layoutStage);
    new MutationObserver(() => requestAnimationFrame(dodgeLogo)).observe($("#map-nodes"), { childList: true });
  }

  /* ---------- 音樂 ---------- */
  const A = window.MATHORIA_AUDIO;
  function updateSoundBtn() { $("#btn-sound").textContent = A.isOn() ? "🔊" : "🔇"; $("#btn-sound").classList.toggle("off", !A.isOn()); }
  let audioArmed = false;
  function armAudio() { /* 瀏覽器需要使用者互動後才能播放 */
    if (audioArmed) return; audioArmed = true;
    if (A.wantsOn()) A.start(); updateSoundBtn();
  }

  function bind() {
    document.addEventListener("click", e => {
      const stBtn = e.target.closest("[data-st]"); if (stBtn) { openStation(stBtn.dataset.st); return; }
      const d = e.target.closest("[data-done]"); if (d) { completeLesson(d.dataset.done, +d.dataset.xp, d.dataset.stat); return; }
      const b = e.target.closest("[data-boss]"); if (b) { defeatBoss(b.dataset.boss, +b.dataset.xp || 0, !!b.dataset.practice); return; }
      const rp = e.target.closest("[data-replay]"); if (rp) { const s = C.stations.find(x => x.id === rp.dataset.replay); playStory(storyFor(s.id, prog.bosses[s.id] ? "bossAfter" : "bossBefore"), s); return; }
      if (e.target.closest("[data-close]")) { const m = e.target.closest(".modal"); m.hidden = true; if (m.id === "modal-levelup") afterLevelUp(); return; }
      if (e.target.classList.contains("modal")) { e.target.hidden = true; A.sfx("close"); }
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") $$(".modal").forEach(m => m.hidden = true); });
    $("#btn-codex").addEventListener("click", () => { openCodex(); });
    $("#btn-stations").addEventListener("click", () => { A.sfx("open"); $("#modal-list").hidden = false; });
    $("#player-chip").addEventListener("click", () => { $("#modal-status").hidden = false; });
    $("#ui-char").addEventListener("click", () => { A.sfx("m-happy"); $("#modal-status").hidden = false; });
    $("#btn-teacher").addEventListener("click", () => location.href = "teacher.html");
    $("#btn-home").addEventListener("click", () => { $("#screen-hub").hidden = true; $("#screen-gate").hidden = false; });
    $("#btn-logout").addEventListener("click", () => {
      if (MODE === "preview") { location.href = "teacher.html"; return; }
      if (MODE === "guest") { MODE = "student"; prog = null; profile = null; }
      $("#screen-hub").hidden = true; $("#screen-gate").hidden = false; renderModeBar();
    });
    $("#mode-cta").addEventListener("click", () => { MODE = "student"; prog = null; $("#screen-hub").hidden = true; $("#screen-gate").hidden = false; renderModeBar(); $("#btn-start").click(); });
    $$("#preview-bar [data-pv]").forEach(b => b.addEventListener("click", () => applyPreview(b.dataset.pv)));
    $$("#preview-bar [data-pstage]").forEach(b => b.addEventListener("click", () => applyPreviewStage(+b.dataset.pstage)));
    $("#pv-opening").addEventListener("click", () => playStory(S.opening, null));
    $("#pv-gender").addEventListener("click", () => { profile.gender = profile.gender === "male" ? "female" : "male"; renderAll(); });
    $("#pv-pet").addEventListener("click", () => { const i = C.pets.findIndex(p => p.id === profile.pet); profile.pet = C.pets[(i + 1) % C.pets.length].id; renderAll(); });
    $("#btn-sound").addEventListener("click", () => { audioArmed = true; A.toggle(); updateSoundBtn(); });
    $("#btn-fullmap").addEventListener("click", () => { if (document.fullscreenElement) document.exitFullscreen(); else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen(); });
    document.addEventListener("fullscreenchange", () => setTimeout(layoutStage, 50));
    $("#screen-hub").addEventListener("pointerdown", armAudio, { once: false });
    setTimeout(() => { const h = $("#ui-hint"); if (h) h.classList.add("fade"); }, 6000);
    bindStage();
  }

  /* ---------- 訪客／預覽 ---------- */
  function renderModeBar() {
    const bar = $("#mode-bar"), pv = $("#preview-bar");
    bar.hidden = MODE !== "guest"; pv.hidden = MODE !== "preview";
    document.body.classList.toggle("mode-guest", MODE === "guest");
    document.body.classList.toggle("mode-preview", MODE === "preview");
    if (MODE === "preview") {
      const lv = levelInfo(prog.xp).lv, st = stageOf(lv);
      $$("#preview-bar [data-pstage]").forEach(b => b.classList.toggle("on", +b.dataset.pstage === st.id));
      $$("#preview-bar [data-pv]").forEach(b => b.classList.toggle("on", b.dataset.pv === pvState));
      $("#pv-gender").textContent = profile.gender === "male" ? "男生造型" : "女生造型";
      $("#pv-pet").textContent = "寵物：" + (C.pets.find(p => p.id === profile.pet) || C.pets[0]).name;
    }
  }
  const xpAtLevel = lv => { let t = 0; for (let i = 1; i < lv; i++) t += C.xpForLevel(i); return t; };
  let pvState = "new";
  function allItems(st) { return st.lessons.concat(st.project ? [st.project] : []); }
  function applyPreview(kind) {
    pvState = kind; prog = blankProgress();
    const list = C.stations;
    const mark = (st, boss) => { allItems(st).forEach(l => { prog.done[l.id] = true; prog.stats[l.stat] = (prog.stats[l.stat] || 0) + 1; prog.xp += l === st.project ? C.xp.project : C.xp.lesson; });
      if (boss) { prog.bosses[st.id] = true; prog.xp += st.isFinal ? C.xp.finalBoss : C.xp.boss; } };
    if (kind === "mid") { list.slice(0, 2).forEach(st => mark(st, true)); const third = list[2]; prog.done[third.lessons[0].id] = true; prog.xp += C.xp.lesson; }
    if (kind === "all") list.forEach(st => mark(st, true));
    renderAll(); renderModeBar(); const cur = currentStation(); if (cur) centerOn(cur);
    toast(kind === "new" ? "預覽：全新學生" : kind === "mid" ? "預覽：進行中（前兩站已破關）" : "預覽：全數破關");
  }
  function applyPreviewStage(stageId) {
    const st = C.stages.find(s => s.id === stageId); prog.xp = xpAtLevel(st.min);
    renderAll(); renderModeBar(); showLevelUp(true, st.min, st);
  }

  /* ---------- 啟動 ---------- */
  initGate(); bind(); bindUiSounds();
  const urlMode = new URLSearchParams(location.search).get("mode");
  if (urlMode === "preview") {
    MODE = "preview"; prog = blankProgress();
    profile = { preview: true, cls: "預覽", seat: "0", name: "教師預覽", gender: "female", pet: "crystal_fox" };
    $("#screen-gate").hidden = true; enterHub(); renderModeBar();
    applyPreview(new URLSearchParams(location.search).get("state") || "new");
  } else renderModeBar();
  const saved = loadProfile();
  if (urlMode !== "preview" && saved && saved.cls && saved.seat && saved.name) { profile = saved; enterHub(); }
})();
