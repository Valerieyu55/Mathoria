/* MATHORIA 課程頁引擎
   網址：lessons/index.html?id=s2-1 → 載入 lessons/data/s2-1.js（內容寫在 window.MATHORIA_LESSON）
   每一課由多個區塊組成：story 情境對話、concept 概念、widget 互動圖、example 例題、
   practice 即時練習、myth 迷思破解、summary 重點整理、extend 高中延伸。 */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const C = window.MATHORIA_CONFIG;
  const A = window.MATHORIA_AUDIO || { sfx() {}, isOn() { return false; } };
  /* 數學式裡的 < > 先換成 \lt \gt，避免被當成 HTML 標籤 */
  const prep = h => String(h == null ? "" : h).replace(/\$\$[\s\S]+?\$\$|\$[^$]+?\$/g, m => m.replace(/</g, "\\lt ").replace(/>/g, "\\gt "));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- 學生資料（沿用學院登入；沒有就用預設角色） ---------- */
  let profile = null;
  try { const ses = JSON.parse(sessionStorage.getItem("mathoria.session")); profile = ses && ses.profile ? ses.profile : JSON.parse(localStorage.getItem("mathoria.profile")); } catch (e) {}
  const P = Object.assign({ name: "冒險者", gender: "female", pet: "crystal_fox" }, profile || {});
  const pet = (C.pets || []).find(p => p.id === P.pet) || { id: "crystal_fox", name: "晶狐" };
  const voice = (window.MATHORIA_STORY && window.MATHORIA_STORY.petVoice && window.MATHORIA_STORY.petVoice[pet.id]) || { tic: "" };

  const id = new URLSearchParams(location.search).get("id") || "";
  if (!/^s\d-\d$/.test(id)) { fail("找不到這堂課。"); return; }
  $("#ls-back").href = `../index.html?from=${encodeURIComponent(id)}`;   /* 回到學院地圖，並打開本課所在的據點 */
  const station = C.stations.find(s => s.lessons.some(l => l.id === id));
  const lessonCfg = station && station.lessons.find(l => l.id === id);
  document.body.dataset.station = station ? station.id : "";

  const sc = document.createElement("script");
  sc.src = `data/${id}.js?v=20261110a`;
  sc.onload = () => { try { render(window.MATHORIA_LESSON); } catch (e) { console.error(e); fail("課程內容讀取失敗。"); } };
  sc.onerror = () => fail("這堂課還在準備中。");
  document.head.appendChild(sc);

  function fail(msg) { $("#ls-main").innerHTML = `<div class="ls-card ls-empty"><p>${msg}</p><a class="btn-gold" href="../index.html">回到學院</a></div>`; }

  /* ---------- 共用：數學式、角色、文字替換 ---------- */
  const fillText = t => prep(t).replace(/\{name\}/g, esc(P.name)).replace(/\{pet\}/g, esc(pet.name)).replace(/\{boss\}/g, station ? esc(station.boss.name) : "魔王");
  function math(el) {
    if (!window.renderMathInElement) return;
    try { window.renderMathInElement(el, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }], throwOnError: false }); } catch (e) {}
  }
  const who = {
    player: () => ({ img: `../assets/portrait/${P.gender}_portrait_1.webp`, name: P.name, cls: "player" }),
    pet: () => ({ img: `../assets/pet/${pet.id}_stage_1_token.webp`, name: pet.name, cls: "pet" }),
    boss: () => ({ img: `../assets/boss/boss_${station ? station.id : "final"}.webp`, name: station ? station.boss.name : "魔王", cls: "boss" }),
    narrator: () => ({ img: "", name: "學院之聲", cls: "narrator" }),
    teacher: () => ({ img: "", name: "余老師", cls: "narrator" })
  };

  /* ---------- 渲染 ---------- */
  let practiceTotal = 0, practiceDone = 0, practiceRight = 0;
  function render(L) {
    document.title = `${L.title}｜MATHORIA 課程`;
    $("#ls-crumb").innerHTML = station ? `<img src="../assets/badge/badge_${station.id}.webp" alt=""><span>第 ${esc(station.num)} 站・${esc(station.name)}</span>` : "";
    const main = $("#ls-main"); main.innerHTML = "";
    main.appendChild(hero(L));
    const toc = [];
    L.sections.forEach((s, i) => {
      const box = document.createElement("section");
      box.className = `ls-sec ls-t-${s.type}`; box.id = `sec-${i}`;
      const R = renderers[s.type]; if (!R) return;
      R(box, s, L);
      main.appendChild(box);
      if (s.title && s.type !== "story") toc.push({ i, title: s.title, type: s.type });
    });
    main.appendChild(finish(L));
    $("#ls-toc").innerHTML = toc.map(t => `<a href="#sec-${t.i}" data-t="${t.type}"><i></i><span>${fillText(esc(t.title))}</span></a>`).join("");
    math(main);
    observe();
  }

  const typeLabel = { concept: "概念", widget: "動手玩", example: "例題", practice: "即時練習", myth: "迷思破解", summary: "重點整理", extend: "高中延伸" };
  function head(box, s, icon) {
    const h = document.createElement("div"); h.className = "ls-head";
    h.innerHTML = `<span class="ls-kicker">${icon} ${typeLabel[s.type] || ""}</span><h2>${fillText(s.title || "")}</h2>`;
    box.appendChild(h); return h;
  }

  function hero(L) {
    const d = document.createElement("section"); d.className = "ls-hero";
    const boss = station ? `../assets/boss/boss_${station.id}.webp` : "";
    d.innerHTML = `
      <div class="ls-hero-art">${boss ? `<img src="${boss}" alt="">` : ""}</div>
      <div class="ls-hero-text">
        <p class="ls-unit">${esc(L.unit || "")}</p>
        <h1>${esc(L.title)}</h1>
        ${L.subtitle ? `<p class="ls-sub">${prep(L.subtitle)}</p>` : ""}
        ${L.codes ? `<p class="ls-codes">${L.codes.map(c => `<span>${esc(c)}</span>`).join("")}</p>` : ""}
        <div class="ls-goals"><b>✦ 這堂課你會學到</b><ul>${(L.goals || []).map(g => `<li>${prep(g)}</li>`).join("")}</ul></div>
        ${L.time ? `<p class="ls-time">⏱ 建議時間 ${esc(L.time)}</p>` : ""}
      </div>`;
    return d;
  }

  const renderers = {
    /* 情境對話 */
    story(box, s) {
      if (s.title) head(box, { type: "story", title: s.title }, "📜");
      const wrap = document.createElement("div"); wrap.className = "ls-chat";
      s.lines.forEach(l => {
        const w = (who[l.who] || who.narrator)();
        const tic = l.who === "pet" && voice.tic ? voice.tic : "";
        const row = document.createElement("div"); row.className = `ls-say ${w.cls}`;
        row.innerHTML = `${w.img ? `<img class="ls-face" src="${w.img}" alt="">` : `<span class="ls-face nf">✦</span>`}<div class="ls-bubble"><b>${esc(w.name)}</b><p>${fillText(l.text)}${tic && !/[～喵咕嗷]$/.test(l.text) ? tic : ""}</p></div>`;
        wrap.appendChild(row);
      });
      box.appendChild(wrap);
    },
    /* 概念講解（html，可用 $…$ 數學式、.key 重點框、.note 小提醒、.fig 圖） */
    concept(box, s) {
      head(box, s, "📖");
      const b = document.createElement("div"); b.className = "ls-card ls-body"; b.innerHTML = prep(s.html); box.appendChild(b);
    },
    /* 互動圖：由各課的 widgets[name](容器, 工具) 畫出 */
    widget(box, s, L) {
      head(box, s, "🔮");
      const card = document.createElement("div"); card.className = "ls-card ls-widget";
      if (s.intro) { const p = document.createElement("p"); p.className = "ls-w-intro"; p.innerHTML = prep(s.intro); card.appendChild(p); }
      const stage = document.createElement("div"); stage.className = "ls-w-stage"; card.appendChild(stage);
      if (s.caption) { const p = document.createElement("p"); p.className = "ls-w-cap"; p.innerHTML = prep(s.caption); card.appendChild(p); }
      box.appendChild(card);
      const fn = L.widgets && L.widgets[s.widget];
      if (fn) { try { fn(stage, H); } catch (e) { console.error(e); stage.textContent = "互動圖載入失敗"; } }
    },
    /* 例題：逐步揭曉 */
    example(box, s) {
      head(box, s, "✏️");
      const card = document.createElement("div"); card.className = "ls-card ls-ex";
      card.innerHTML = `<div class="ls-ex-q"><span class="ls-ex-tag">題目</span>${prep(s.problem)}</div>${s.figure ? `<div class="fig">${s.figure}</div>` : ""}<ol class="ls-steps"></ol><div class="ls-ex-acts"><button class="btn-gold" data-step>看下一步 ▸</button><button class="btn-ghost" data-all>全部展開</button></div><div class="ls-ex-ans" hidden><span>答</span>${prep(s.answer)}</div>`;
      const ol = $(".ls-steps", card); let k = 0;
      const show = () => {
        if (k < s.steps.length) { const li = document.createElement("li"); li.innerHTML = prep(s.steps[k++]); ol.appendChild(li); math(li); A.sfx("page"); }
        if (k >= s.steps.length) { $(".ls-ex-ans", card).hidden = false; math($(".ls-ex-ans", card)); $(".ls-ex-acts", card).hidden = true; A.sfx("m-happy"); }
      };
      $("[data-step]", card).onclick = show;
      $("[data-all]", card).onclick = () => { while (k < s.steps.length) show(); show(); };
      box.appendChild(card);
    },
    /* 即時練習：選擇題（o, a）或填答題（answer: 數字或字串陣列） */
    practice(box, s) {
      head(box, s, "⚔️");
      s.items.forEach((it, n) => {
        practiceTotal++;
        const card = document.createElement("div"); card.className = "ls-card ls-q";
        const order = it.o ? shuffle(it.o.map((_, i) => i)) : null;
        card.innerHTML = `<p class="ls-q-n">第 ${n + 1} 題${it.level ? ` <span class="lv">${esc(it.level)}</span>` : ""}</p><div class="ls-q-text">${prep(it.q)}</div>
          ${order ? `<div class="ls-opts">${order.map((k, i) => `<button class="ls-opt" data-k="${k}"><b>${"ABCD"[i]}</b><span>${prep(it.o[k])}</span></button>`).join("")}</div>`
                  : `<form class="ls-fill"><input inputmode="decimal" autocomplete="off" placeholder="輸入答案"><button class="btn-gold">送出</button></form>`}
          <div class="ls-fb" hidden></div>`;
        const fb = $(".ls-fb", card);
        const judge = (ok, tries) => {
          fb.hidden = false; fb.className = "ls-fb " + (ok ? "ok" : "no");
          fb.innerHTML = (ok ? `<b>✔ 答對了！${tries > 1 ? "（訂正成功）" : ""}</b>` : `<b>✘ 再想想看</b>`) + (ok || tries >= 2 ? `<div>${prep(it.ex)}</div>` : (it.hint ? `<div>提示：${prep(it.hint)}</div>` : ""));
          math(fb);
          if (ok || tries >= 2) { if (!card.dataset.done) { card.dataset.done = 1; practiceDone++; if (ok && tries === 1) practiceRight++; updateFinish(); } }
          A.sfx(ok ? "correct" : "wrong");
        };
        let tries = 0;
        if (order) $$(".ls-opt", card).forEach(b => b.onclick = () => {
          if (card.dataset.locked) return; tries++;
          const ok = +b.dataset.k === it.a;
          b.classList.add(ok ? "right" : "wrong");
          if (ok || tries >= 2) { card.dataset.locked = 1; $$(".ls-opt", card).forEach(x => { x.disabled = true; if (+x.dataset.k === it.a) x.classList.add("right"); }); }
          judge(ok, tries);
        });
        else $(".ls-fill", card).onsubmit = e => {
          e.preventDefault(); if (card.dataset.locked) return;
          const v = $("input", card).value.trim().replace(/\s/g, "").replace(/，/g, ",").replace(/－/g, "-");
          if (!v) return; tries++;
          const answers = [].concat(it.answer).map(String);
          const ok = answers.some(a => a.replace(/\s/g, "") === v || (!isNaN(+a) && !isNaN(+v) && Math.abs(+a - +v) < 1e-6));
          if (ok || tries >= 2) { card.dataset.locked = 1; $("input", card).disabled = true; if (!ok) fb.dataset.ans = answers[0]; }
          judge(ok, tries);
          if (!ok && tries >= 2) fb.insertAdjacentHTML("afterbegin", `<p class="ls-ans">正確答案：${prep(it.show || answers[0])}</p>`), math(fb);
        };
        box.appendChild(card);
      });
    },
    /* 迷思破解 */
    myth(box, s) {
      head(box, s, "🔍");
      const g = document.createElement("div"); g.className = "ls-myths";
      g.innerHTML = s.items.map(m => `<div class="ls-card ls-myth"><p class="m-wrong"><span>✘ 迷思</span>${prep(m.wrong)}</p><p class="m-right"><span>✔ 正解</span>${prep(m.right)}</p>${m.why ? `<p class="m-why">${prep(m.why)}</p>` : ""}</div>`).join("");
      box.appendChild(g);
    },
    /* 重點整理 */
    summary(box, s) {
      head(box, s, "📌");
      const c = document.createElement("div"); c.className = "ls-card ls-scroll";
      c.innerHTML = `<ul>${s.items.map(x => `<li>${prep(x)}</li>`).join("")}</ul>${s.formula ? `<div class="ls-formula">${prep(s.formula)}</div>` : ""}`;
      box.appendChild(c);
    },
    /* 高中延伸 */
    extend(box, s) {
      head(box, s, "🚀");
      const c = document.createElement("div"); c.className = "ls-card ls-ext";
      c.innerHTML = `${s.where ? `<p class="ls-where">${prep(s.where)}</p>` : ""}${prep(s.html)}`;
      box.appendChild(c);
    }
  };

  function finish(L) {
    const d = document.createElement("section"); d.className = "ls-sec ls-finish"; d.id = "ls-finish";
    d.innerHTML = `<div class="ls-card"><h2>✦ 完成本課</h2><p id="ls-fin-text"></p>
      <div class="ls-fin-acts"><a class="btn-gold big" id="ls-fin-go" href="../index.html?done=${encodeURIComponent(id)}">完成任務・回到學院領取 XP ✦</a></div>
      <p class="ls-fin-note">完成所有即時練習後就能領取 XP。答錯沒關係，看完解析也算完成。</p></div>`;
    setTimeout(updateFinish, 0);
    return d;
  }
  function updateFinish() {
    const t = $("#ls-fin-text"), go = $("#ls-fin-go"); if (!t) return;
    const left = practiceTotal - practiceDone;
    t.innerHTML = left > 0 ? `還有 <b>${left}</b> 題即時練習沒做完。` : `即時練習完成！一次就答對 <b>${practiceRight} / ${practiceTotal}</b> 題。`;
    go.classList.toggle("locked", left > 0);
    if (left === 0 && !go.dataset.cheer) { go.dataset.cheer = 1; A.sfx("xp"); }
  }
  document.addEventListener("click", e => {
    const go = e.target.closest("#ls-fin-go");
    if (go && go.classList.contains("locked")) { e.preventDefault(); toast("先完成上面的即時練習喔！"); A.sfx("locked"); const q = $(".ls-q:not([data-done])"); if (q) q.scrollIntoView({ behavior: "smooth", block: "center" }); }
  });

  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2600); }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  /* ---------- 捲動進度與目錄 ---------- */
  function observe() {
    const bar = $("#ls-progress");
    const onScroll = () => {
      const h = document.documentElement; bar.style.width = Math.min(100, h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + "%";
      let cur = null; $$(".ls-sec").forEach(s => { if (s.getBoundingClientRect().top < innerHeight * 0.35) cur = s.id; });
      $$("#ls-toc a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + cur));
    };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* ---------- 音效開關（與學院共用設定） ---------- */
  const snd = $("#ls-sound");
  const syncSnd = () => { let off = false; try { off = localStorage.getItem("mathoria.sound") === "off"; } catch (e) {} snd.textContent = off ? "🔇" : "🔊"; };
  snd.onclick = () => { let off = false; try { off = localStorage.getItem("mathoria.sound") === "off"; localStorage.setItem("mathoria.sound", off ? "on" : "off"); } catch (e) {} syncSnd(); if (off) A.sfx("toggle"); };
  syncSnd();
  document.addEventListener("click", e => { const b = e.target.closest(".btn-ghost, .ls-toc a, .ls-back"); if (b) A.sfx("click"); }, true);

  /* ================= 互動圖工具 H ================= */
  const NS = "http://www.w3.org/2000/svg";
  const H = {
    /* 建立 SVG：座標用 viewBox 的單位 */
    svg(parent, w, h, cls = "") {
      const s = document.createElementNS(NS, "svg"); s.setAttribute("viewBox", `0 0 ${w} ${h}`); s.setAttribute("class", "ls-svg " + cls);
      parent.appendChild(s); return s;
    },
    el(tag, attrs, parent) {
      const e = document.createElementNS(NS, tag);
      for (const k in attrs || {}) { if (k === "text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); }
      if (parent) parent.appendChild(e); return e;
    },
    set(e, attrs) { for (const k in attrs) { if (k === "text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); } return e; },
    /* 可拖曳的點：onMove(x, y) 回傳修正後的 [x, y]（例如限制在圓上） */
    drag(svg, node, onMove) {
      node.classList.add("ls-handle");
      const pt = svg.createSVGPoint();
      const at = ev => { pt.x = ev.clientX; pt.y = ev.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); };
      node.addEventListener("pointerdown", ev => {
        ev.preventDefault(); node.setPointerCapture(ev.pointerId); node.classList.add("grab");
        const move = e2 => { const p = at(e2); onMove(p.x, p.y); };
        const up = () => { node.classList.remove("grab"); node.removeEventListener("pointermove", move); node.removeEventListener("pointerup", up); A.sfx("tab"); };
        node.addEventListener("pointermove", move); node.addEventListener("pointerup", up);
      });
    },
    /* 滑桿：{label, min, max, step, value, fmt} */
    slider(parent, o, onInput) {
      const w = document.createElement("label"); w.className = "ls-slider";
      w.innerHTML = `<span class="sl-l">${o.label}</span><input type="range" min="${o.min}" max="${o.max}" step="${o.step || 1}" value="${o.value}"><b class="sl-v"></b>`;
      const inp = $("input", w), v = $(".sl-v", w);
      const upd = () => { const x = +inp.value; v.textContent = o.fmt ? o.fmt(x) : x; onInput(x); };
      inp.addEventListener("input", upd); parent.appendChild(w); setTimeout(upd, 0);
      return inp;
    },
    /* 選項按鈕組 */
    toggle(parent, labels, onPick, start = 0) {
      const w = document.createElement("div"); w.className = "ls-toggle";
      w.innerHTML = labels.map((l, i) => `<button type="button" data-i="${i}" class="${i === start ? "on" : ""}">${l}</button>`).join("");
      w.onclick = e => { const b = e.target.closest("button"); if (!b) return; $$("button", w).forEach(x => x.classList.toggle("on", x === b)); A.sfx("tab"); onPick(+b.dataset.i); };
      parent.appendChild(w); setTimeout(() => onPick(start), 0); return w;
    },
    /* 讀數面板：H.readout(容器) → set(html) 會自動排版數學式 */
    readout(parent, cls = "") {
      const d = document.createElement("div"); d.className = "ls-readout " + cls; parent.appendChild(d);
      return { el: d, set(html) { if (d._h === html) return; d._h = html; d.innerHTML = prep(html); math(d); } };
    },
    row(parent, cls = "") { const d = document.createElement("div"); d.className = "ls-w-row " + cls; parent.appendChild(d); return d; },
    button(parent, text, onClick, cls = "btn-ghost") { const b = document.createElement("button"); b.type = "button"; b.className = cls; b.innerHTML = text; b.onclick = onClick; parent.appendChild(b); return b; },
    /* 幾何小工具 */
    dist: (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]),
    angleAt(P, A, B) {   /* ∠APB（度） */
      const a1 = Math.atan2(A[1] - P[1], A[0] - P[0]), a2 = Math.atan2(B[1] - P[1], B[0] - P[0]);
      let d = Math.abs(a1 - a2) * 180 / Math.PI; if (d > 180) d = 360 - d; return d;
    },
    /* 在 P 點畫出 ∠APB 的小圓弧（半徑 r） */
    arcPath(P, A, B, r) {
      const a1 = Math.atan2(A[1] - P[1], A[0] - P[0]), a2 = Math.atan2(B[1] - P[1], B[0] - P[0]);
      let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
      const s = [P[0] + r * Math.cos(a1), P[1] + r * Math.sin(a1)], e = [P[0] + r * Math.cos(a1 + d), P[1] + r * Math.sin(a1 + d)];
      return `M${s[0]},${s[1]} A${r},${r} 0 0 ${d > 0 ? 1 : 0} ${e[0]},${e[1]}`;
    },
    fmt: (x, d = 1) => { const v = Math.round(x * 10 ** d) / 10 ** d; return (Object.is(v, -0) ? 0 : v).toString(); },
    sfx: n => A.sfx(n),
    math, prep
  };
  window.MATHORIA_LESSON_TOOLS = H;
})();
