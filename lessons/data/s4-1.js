/* 3-2 三角形的外心、內心、重心（康軒九上 第 3 章 三角形的心）
   對應 108 課綱：S-9-8 外心、S-9-9 內心、S-9-10 重心 */
(function () {
  /* ---------- 本課共用的幾何計算（全部用公式精確計算，不靠估算） ---------- */
  const Gm = {
    mid: (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2],
    len: (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]),
    area: (P, Q, R) => Math.abs((Q[0] - P[0]) * (R[1] - P[1]) - (R[0] - P[0]) * (Q[1] - P[1])) / 2,
    /* 外心：三邊中垂線的交點（公式解） */
    circum(A, B, C) {
      const D = 2 * (A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1]));
      const a2 = A[0] * A[0] + A[1] * A[1], b2 = B[0] * B[0] + B[1] * B[1], c2 = C[0] * C[0] + C[1] * C[1];
      return [(a2 * (B[1] - C[1]) + b2 * (C[1] - A[1]) + c2 * (A[1] - B[1])) / D,
              (a2 * (C[0] - B[0]) + b2 * (A[0] - C[0]) + c2 * (B[0] - A[0])) / D];
    },
    /* 內心：以對邊長為權重的加權平均 (aA + bB + cC) / (a + b + c) */
    incenter(A, B, C) {
      const a = Gm.len(B, C), b = Gm.len(C, A), c = Gm.len(A, B), s = a + b + c;
      return [(a * A[0] + b * B[0] + c * C[0]) / s, (a * A[1] + b * B[1] + c * C[1]) / s];
    },
    /* 重心：三頂點坐標平均 */
    centroid: (A, B, C) => [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3],
    /* 點 P 到直線 QR 的垂足 */
    foot(P, Q, R) {
      const dx = R[0] - Q[0], dy = R[1] - Q[1], t = ((P[0] - Q[0]) * dx + (P[1] - Q[1]) * dy) / (dx * dx + dy * dy);
      return [Q[0] + t * dx, Q[1] + t * dy];
    },
    angle(P, Q, R) { /* ∠QPR（度） */
      const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]];
      const c = (u[0] * v[0] + u[1] * v[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]));
      return Math.acos(Math.max(-1, Math.min(1, c))) * 180 / Math.PI;
    },
    inside(P, A, B, C) {
      const s = (X, Y, Z) => (Y[0] - X[0]) * (Z[1] - X[1]) - (Z[0] - X[0]) * (Y[1] - X[1]);
      const d1 = s(A, B, P), d2 = s(B, C, P), d3 = s(C, A, P);
      return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
    }
  };

  /* 三個頂點可拖曳的三角形（兩個互動圖共用）；snap = 接近直角時吸附成直角 */
  function dragTriangle(H, svg, V, layerTop, onChange, snap) {
    const names = ["A", "B", "C"];
    const handles = V.map((p, i) => H.el("circle", { r: 12, fill: "#f6dc9a", stroke: "#fff", "stroke-width": 2 }, layerTop));
    const labels = V.map((p, i) => H.el("text", { text: names[i], "font-size": 17, "font-weight": 700 }, layerTop));
    const ok = W => {
      if (Gm.area(W[0], W[1], W[2]) < 4500) return false;
      for (let i = 0; i < 3; i++) { if (Gm.len(W[i], W[(i + 1) % 3]) < 70) return false; if (Gm.angle(W[i], W[(i + 1) % 3], W[(i + 2) % 3]) < 12) return false; }
      return true;
    };
    const place = () => {
      const G = Gm.centroid(V[0], V[1], V[2]);
      V.forEach((p, i) => {
        H.set(handles[i], { cx: p[0], cy: p[1] });
        const dx = p[0] - G[0], dy = p[1] - G[1], L = Math.hypot(dx, dy) || 1;
        let lx = p[0] + dx / L * 24 - 6, ly = p[1] + dy / L * 24 + 6;
        lx = Math.max(4, Math.min(462, lx)); ly = Math.max(16, Math.min(324, ly));
        H.set(labels[i], { x: lx, y: ly });
      });
    };
    handles.forEach((h, k) => H.drag(svg, h, (x, y) => {
      let p = [Math.max(16, Math.min(464, x)), Math.max(16, Math.min(314, y))];
      const W = V.slice(); W[k] = p;
      if (snap) {
        for (let j = 0; j < 3; j++) {
          const ang = Gm.angle(W[j], W[(j + 1) % 3], W[(j + 2) % 3]);
          if (Math.abs(ang - 90) < 1.6) {
            if (j === k) { /* 被拖的點自己是直角頂點：投影到以對邊為直徑的圓上 */
              const P1 = W[(k + 1) % 3], P2 = W[(k + 2) % 3], M = Gm.mid(P1, P2), r = Gm.len(P1, P2) / 2, d = Gm.len(p, M) || 1;
              p = [M[0] + (p[0] - M[0]) * r / d, M[1] + (p[1] - M[1]) * r / d];
            } else { /* 直角在固定點 j：把被拖的點投影到過 j 且垂直於另一邊的直線上 */
              const o = 3 - j - k, Vj = W[j], Vo = W[o];
              const n = [-(Vo[1] - Vj[1]), Vo[0] - Vj[0]], L = Math.hypot(n[0], n[1]);
              const t = ((p[0] - Vj[0]) * n[0] + (p[1] - Vj[1]) * n[1]) / (L * L);
              p = [Vj[0] + t * n[0], Vj[1] + t * n[1]];
            }
            W[k] = p; break;
          }
        }
      }
      if (!ok(W)) return;
      V[k] = W[k]; place(); onChange();
    }));
    place();
  }

  window.MATHORIA_LESSON = {
    title: "3-2 三角形的外心、內心、重心",
    unit: "康軒 九上 ・ 第 3 章 三角形的心",
    subtitle: "三種線、三顆心：中垂線生外心、角平分線生內心、中線生重心。",
    codes: ["S-9-8 外心", "S-9-9 內心", "S-9-10 重心"],
    time: "3 節課",
    goals: [
      "知道外心是三邊中垂線的交點，到三頂點等距，是外接圓的圓心",
      "會依三角形是銳角、直角、鈍角判斷外心的位置（直角三角形外心在斜邊中點）",
      "知道內心是三內角平分線的交點，到三邊等距，並會用「面積＝周長×$r$÷2」與直角三角形 $r=\\dfrac{a+b-c}{2}$",
      "知道重心是三中線的交點，$\\overline{AG}:\\overline{GD}=2:1$，三中線把面積六等分",
      "能清楚分辨三心，不被「誰到誰等距」騙倒"
    ],
    sections: [
      { type: "story", lines: [
        { who: "narrator", text: "三心神殿的地板上浮著一個巨大的三角形，裡面有三顆光核忽明忽暗。" },
        { who: "boss", text: "我是{boss}！我能變成任何一顆心——重心到三個頂點一樣遠，內心也到三個頂點一樣遠，你分得出誰是誰嗎？" },
        { who: "player", text: "三顆心都在三角形裡發光……到底哪一顆才是真的？" },
        { who: "pet", text: "{name}，別看它長在哪裡，要看它是用什麼線作出來的！中垂線、角平分線、中線，三種線生出三種心" },
        { who: "player", text: "好！我把三種線一條條畫出來，讓你現出原形！" }
      ] },

      { type: "concept", title: "外心：三邊中垂線的交點", html: `
        <p><b>中垂線性質</b>：線段 $\\overline{AB}$ 的中垂線上任一點 $P$，都滿足 $\\overline{PA}=\\overline{PB}$。<br>（設 $M$ 為 $\\overline{AB}$ 中點，因為 $\\triangle PMA\\cong\\triangle PMB$，SAS 全等：$\\overline{MA}=\\overline{MB}$、直角、$\\overline{PM}$ 共用。）</p>
        <p><b>為什麼三條中垂線會交於一點？</b>設 $\\overline{AB}$、$\\overline{BC}$ 的中垂線交於 $O$：</p>
        <ul>
          <li>$O$ 在 $\\overline{AB}$ 的中垂線上 ⇒ $\\overline{OA}=\\overline{OB}$；</li>
          <li>$O$ 在 $\\overline{BC}$ 的中垂線上 ⇒ $\\overline{OB}=\\overline{OC}$；</li>
          <li>所以 $\\overline{OA}=\\overline{OC}$，$O$ 也在 $\\overline{AC}$ 的中垂線上（到線段兩端等距的點在它的中垂線上，SSS 全等）。三線共點！</li>
        </ul>
        <div class="key"><b>外心 $O$</b>＝三邊中垂線的交點<br>
          ・到三頂點等距：$\\overline{OA}=\\overline{OB}=\\overline{OC}=R$<br>
          ・以 $O$ 為圓心、$R$ 為半徑的圓通過三頂點，叫做<b>外接圓</b>。</div>
        <div class="table-wrap"><table>
          <tr><th>三角形</th><th>銳角三角形</th><th>直角三角形</th><th>鈍角三角形</th></tr>
          <tr><th>外心位置</th><td>三角形內部</td><td>斜邊中點</td><td>三角形外部</td></tr>
        </table></div>
        <p>直角三角形為什麼外心在斜邊中點？因為 $90^\\circ$ 的圓周角所對的弦是直徑，斜邊就是外接圓的直徑，所以 $R=\\dfrac{\\text{斜邊}}{2}$。</p>
        <p class="note"><b>補充</b>：銳角三角形中，$\\angle BAC$ 是外接圓的圓周角，$\\angle BOC$ 是同一弧 $\\overset{\\frown}{BC}$ 所對的圓心角，所以 $\\angle BOC=2\\angle A$。</p>
      ` },

      { type: "widget", title: "三心變身器：拖曳三角形，召喚三顆心", widget: "centers",
        intro: "拖曳三個金色頂點改變三角形，按上方按鈕切換<b>外心／內心／重心</b>，觀察作圖線與讀數。（每格 1 單位）",
        caption: "試試看：把一個角拉成直角（會自動吸附），看外心是不是剛好落在斜邊中點；再拉成鈍角，看外心跑到哪裡。" },

      { type: "example", title: "例題 1　直角三角形的外接圓與內切圓", problem: "$\\triangle ABC$ 中，$\\angle C=90^\\circ$，$\\overline{AC}=6$，$\\overline{BC}=8$。求外接圓半徑 $R$ 與內切圓半徑 $r$。",
        figure: `<svg viewBox="0 0 300 250"><circle cx="148" cy="134" r="110" fill="none" stroke="#f6dc9a" stroke-width="2" stroke-dasharray="6 4"/><circle cx="104" cy="156" r="44" fill="rgba(95,211,168,.12)" stroke="#5fd3a8" stroke-width="2"/><polygon points="60,68 236,200 60,200" fill="none" stroke="#cdc5ff" stroke-width="2.5"/><path d="M60,188 h12 v12" fill="none" stroke="#fff"/><circle cx="148" cy="134" r="4" fill="#ff8fa3"/><circle cx="104" cy="156" r="3.5" fill="#5fd3a8"/><text x="44" y="66" font-size="14" fill="#fff">A</text><text x="240" y="214" font-size="14" fill="#fff">B</text><text x="44" y="214" font-size="14" fill="#fff">C</text><text x="154" y="128" font-size="14" fill="#ff8fa3">O</text><text x="108" y="152" font-size="13" fill="#5fd3a8">I</text><text x="40" y="140" font-size="13" fill="#8fd0ff">6</text><text x="144" y="220" font-size="13" fill="#8fd0ff">8</text></svg>`,
        steps: [
          "斜邊 $\\overline{AB}=\\sqrt{6^2+8^2}=\\sqrt{100}=10$。",
          "直角三角形的外心在斜邊中點，外接圓半徑 $R=\\dfrac{10}{2}=5$。",
          "直角三角形內切圓半徑 $r=\\dfrac{\\text{兩股和}-\\text{斜邊}}{2}=\\dfrac{6+8-10}{2}=2$。",
          "驗算：面積 $=\\dfrac{6\\times 8}{2}=24$；用「周長×$r$÷2」$=\\dfrac{24\\times 2}{2}=24$，兩者相同 ✔"
        ],
        answer: "$R=5$，$r=2$" },

      { type: "concept", title: "內心：三內角平分線的交點", html: `
        <p><b>角平分線性質</b>：$\\angle A$ 的平分線上任一點，到角的兩邊距離相等（兩個直角三角形 AAS 全等）。</p>
        <p>設 $\\angle B$、$\\angle C$ 的平分線交於 $I$：$I$ 到 $\\overline{AB}$、$\\overline{BC}$ 等距，也到 $\\overline{BC}$、$\\overline{CA}$ 等距，所以 $I$ 到三邊都等距，自然也在 $\\angle A$ 的平分線上（在角內部、到角兩邊等距的點在角平分線上，RHS 全等）。三線共點！</p>
        <div class="key"><b>內心 $I$</b>＝三內角平分線的交點<br>
          ・到三邊等距，這個距離就是<b>內切圓</b>半徑 $r$<br>
          ・內心一定在三角形<b>內部</b><br>
          ・$\\angle BIC=90^\\circ+\\dfrac{1}{2}\\angle A$</div>
        <p><b>$\\angle BIC$ 的由來</b>：$I$ 在角平分線上，所以</p>
        $$\\angle IBC+\\angle ICB=\\tfrac{1}{2}(\\angle B+\\angle C)$$
        $$=\\tfrac{1}{2}(180^\\circ-\\angle A)=90^\\circ-\\tfrac{1}{2}\\angle A$$
        $$\\angle BIC=180^\\circ-\\left(90^\\circ-\\tfrac{1}{2}\\angle A\\right)$$
        $$=90^\\circ+\\tfrac{1}{2}\\angle A$$
        <h3>內切圓半徑的兩個公式</h3>
        <p><b>① 三角形面積＝周長 × $r$ ÷ 2</b>：連 $\\overline{IA}$、$\\overline{IB}$、$\\overline{IC}$，把三角形切成三塊，每塊的高都是 $r$：</p>
        $$\\triangle ABC=\\triangle IAB+\\triangle IBC+\\triangle ICA$$
        $$=\\frac{\\overline{AB}\\cdot r}{2}+\\frac{\\overline{BC}\\cdot r}{2}+\\frac{\\overline{CA}\\cdot r}{2}$$
        $$=\\frac{\\text{周長}\\times r}{2}$$
        <p><b>② 直角三角形</b>（兩股 $a$、$b$，斜邊 $c$）：$r=\\dfrac{a+b-c}{2}$</p>
        <p>理由：內切圓與三邊的切點，把三邊分成切線段，而<b>從同一點到圓的兩條切線段等長</b>。直角頂點 $C$ 和兩個切點、內心 $I$ 圍成一個邊長 $r$ 的正方形，所以從 $C$ 出發的切線段長都是 $r$。設從 $A$、$B$ 出發的切線段長為 $x$、$y$，則 $a=r+y$、$b=r+x$、$c=x+y$，相減得 $a+b-c=2r$。</p>
      ` },

      { type: "example", title: "例題 2　用面積求內切圓半徑", problem: "$\\triangle ABC$ 三邊長為 13、14、15，邊長 14 上的高為 12。求內切圓半徑 $r$。",
        steps: [
          "面積 $=\\dfrac{14\\times 12}{2}=84$。",
          "周長 $=13+14+15=42$。",
          "由 面積 ＝ 周長 × $r$ ÷ 2：$84=\\dfrac{42\\times r}{2}=21r$。",
          "$r=84\\div 21=4$。"
        ],
        answer: "$r=4$" },

      { type: "example", title: "例題 3　外心角與內心角", problem: "銳角 $\\triangle ABC$ 中，$\\angle A=70^\\circ$，$\\angle B=60^\\circ$，$\\angle C=50^\\circ$。$O$ 為外心、$I$ 為內心，求 $\\angle BOC$ 與 $\\angle BIC$。",
        steps: [
          "外心：$\\angle BOC$ 是 $\\overset{\\frown}{BC}$ 所對的圓心角，$\\angle A$ 是同弧所對的圓周角，所以 $\\angle BOC=2\\times 70^\\circ=140^\\circ$。",
          "內心：$\\angle IBC=\\dfrac{60^\\circ}{2}=30^\\circ$，$\\angle ICB=\\dfrac{50^\\circ}{2}=25^\\circ$。",
          "$\\angle BIC=180^\\circ-30^\\circ-25^\\circ=125^\\circ$，也可以直接用 $90^\\circ+\\dfrac{70^\\circ}{2}=125^\\circ$ 驗證。"
        ],
        answer: "$\\angle BOC=140^\\circ$，$\\angle BIC=125^\\circ$" },

      { type: "concept", title: "重心：三中線的交點", html: `
        <p>連接頂點與對邊中點的線段叫<b>中線</b>。三角形的三條中線交於一點，這點叫<b>重心</b> $G$，而且重心一定在三角形<b>內部</b>。</p>
        <div class="key"><b>重心 $G$</b>＝三中線的交點（$D$ 為 $\\overline{BC}$ 中點）<br>
          ・重心到頂點的距離是到對邊中點距離的 2 倍：$\\overline{AG}:\\overline{GD}=2:1$<br>
          　也就是 $\\overline{AG}=\\dfrac{2}{3}\\overline{AD}$，$\\overline{GD}=\\dfrac{1}{3}\\overline{AD}$<br>
          ・三中線把三角形分成 6 個面積相等的小三角形，每塊 $=\\dfrac{1}{6}\\triangle ABC$</div>
        <p><b>為什麼是 2：1？</b>設 $D$、$E$ 分別是 $\\overline{BC}$、$\\overline{AC}$ 的中點，中線 $\\overline{AD}$、$\\overline{BE}$ 交於 $G$。由中點連線性質，$\\overline{DE}\\parallel\\overline{AB}$ 且 $\\overline{DE}=\\dfrac{1}{2}\\overline{AB}$。於是 $\\triangle GDE\\sim\\triangle GAB$（AA 相似），對應邊比 $1:2$，所以 $\\overline{GD}:\\overline{GA}=1:2$。</p>
        <p><b>為什麼六等分？</b>$\\overline{BD}=\\overline{DC}$ 且同高，所以 $\\triangle ABD=\\dfrac{1}{2}\\triangle ABC$；又 $\\overline{GD}=\\dfrac{1}{3}\\overline{AD}$，$\\triangle GBD$ 和 $\\triangle ABD$ 同底 $\\overline{BD}$，高是它的 $\\dfrac{1}{3}$，所以 $\\triangle GBD=\\dfrac{1}{3}\\times\\dfrac{1}{2}\\triangle ABC=\\dfrac{1}{6}\\triangle ABC$。其他五塊同理。</p>
        <p><b>重心的物理意義</b>：用厚薄均勻的紙板剪一個三角形，用指尖頂住重心，紙板就能保持平衡；用釘子穿過其他點把它吊起來，紙板會轉到重心落在釘子的正下方才停下。</p>
      ` },

      { type: "widget", title: "中線切蛋糕：六塊一樣大？", widget: "sixAreas",
        intro: "三條中線把三角形切成 6 塊。拖曳頂點，看每一塊的面積（平方格）怎麼變。",
        caption: "不管三角形多歪，六塊面積永遠相等，各占全部的 $\\dfrac{1}{6}$。" },

      { type: "example", title: "例題 4　重心的計算", problem: "$\\triangle ABC$ 的面積為 60，$\\overline{AD}$ 是 $\\overline{BC}$ 上的中線，$\\overline{AD}=15$，$G$ 為重心。求 $\\overline{AG}$、$\\overline{GD}$、$\\triangle GBC$ 與 $\\triangle GBD$ 的面積。",
        steps: [
          "$\\overline{AG}:\\overline{GD}=2:1$，所以 $\\overline{AG}=15\\times\\dfrac{2}{3}=10$，$\\overline{GD}=15\\times\\dfrac{1}{3}=5$。",
          "三中線把面積六等分，每一小塊 $=60\\div 6=10$。",
          "$\\triangle GBD$ 是其中一塊，面積 $=10$；$\\triangle GBC=\\triangle GBD+\\triangle GDC=20$（也就是全部的 $\\dfrac{1}{3}$）。"
        ],
        answer: "$\\overline{AG}=10$，$\\overline{GD}=5$，$\\triangle GBC=20$，$\\triangle GBD=10$" },

      { type: "widget", title: "吊掛紙板：誰才是平衡點？", widget: "balance",
        intro: "左邊：拖曳釘子（粉紅點）到三角形紙板上任一點，或按按鈕直接釘在三心上。右邊：紙板掛在釘子上後會怎麼轉？",
        caption: "均勻的紙板吊起來時，重心一定會轉到釘子的正下方（鉛垂線上）。只有釘在重心，紙板才能在任何角度都靜止平衡。" },

      { type: "concept", title: "三心大比較", html: `
        <div class="table-wrap"><table>
          <tr><th></th><th>外心 $O$</th><th>內心 $I$</th><th>重心 $G$</th></tr>
          <tr><th>由什麼線交成</th><td>三邊的中垂線</td><td>三內角的平分線</td><td>三條中線</td></tr>
          <tr><th>等距性質</th><td>到三<b>頂點</b>等距</td><td>到三<b>邊</b>等距</td><td>（沒有等距性質）<br>分中線為 $2:1$</td></tr>
          <tr><th>相關的圓</th><td>外接圓，半徑 $R$</td><td>內切圓，半徑 $r$</td><td>—</td></tr>
          <tr><th>位置</th><td>銳角：內部<br>直角：斜邊中點<br>鈍角：外部</td><td>一定在內部</td><td>一定在內部</td></tr>
          <tr><th>常用結論</th><td>$\\angle BOC=2\\angle A$（銳角三角形）</td><td>$\\angle BIC=90^\\circ+\\dfrac{1}{2}\\angle A$<br>面積＝周長×$r$÷2</td><td>三中線面積六等分<br>物理上的平衡點</td></tr>
        </table></div>
        <div class="key"><b>正三角形：三心合一</b><br>正三角形每條中線同時也是中垂線、角平分線，所以外心、內心、重心是同一點。<br>邊長 $a$ 時，高 $h=\\dfrac{\\sqrt{3}}{2}a$；由重心 $2:1$ 得 $R=\\dfrac{2}{3}h$、$r=\\dfrac{1}{3}h$，所以 $R=2r$。</div>
        <p class="note">例：邊長 6 的正三角形，$h=3\\sqrt{3}$，$R=2\\sqrt{3}$，$r=\\sqrt{3}$。等腰三角形的三心則都落在底邊的中垂線（對稱軸）上，但不一定重合。</p>
      ` },

      { type: "myth", title: "破解{boss}的擬態", items: [
        { wrong: "重心到三個頂點的距離相等。", right: "到三頂點等距的是<b>外心</b>；重心是把每條中線分成 $2:1$。", why: "拿 6、8、10 的直角三角形試：重心到三頂點的距離分別是 $\\tfrac{2}{3}$ 倍的三條中線長，三條中線不一樣長，距離當然不同。" },
        { wrong: "內心到三個頂點的距離相等。", right: "內心是到三<b>邊</b>等距（內切圓半徑），不是到三頂點。", why: "記法：「外」接圓碰到頂點 → 外心管頂點；「內」切圓碰到三邊 → 內心管邊。" },
        { wrong: "外心一定在三角形裡面。", right: "只有銳角三角形外心在內部；直角在斜邊中點；鈍角在外部。", why: "內心和重心才是一定在內部。外心的位置看三角形最大的角。" },
        { wrong: "重心把中線分成 $1:2$，靠近頂點那段比較短。", right: "$\\overline{AG}:\\overline{GD}=2:1$，靠近<b>頂點</b>那段是長的。", why: "重心離對邊中點比較近，離頂點比較遠：$\\overline{AG}=\\dfrac{2}{3}\\overline{AD}$。" }
      ] },

      { type: "practice", title: "即時練習", items: [
        { q: "三角形中，到三個<b>頂點</b>距離相等的點是哪一個心？", o: ["外心", "內心", "重心", "三邊中點"], a: 0, ex: "外心是三邊中垂線的交點，中垂線上的點到線段兩端等距，所以外心到三頂點等距。" },
        { q: "鈍角三角形的外心在哪裡？", o: ["三角形外部", "三角形內部", "最長邊的中點", "鈍角的頂點"], a: 0, ex: "銳角三角形外心在內部、直角三角形在斜邊中點、鈍角三角形在外部。" },
        { q: "直角三角形兩股長為 6 和 8，它的外接圓半徑是多少？", answer: ["5"], hint: "外心在斜邊中點。", ex: "斜邊 $=\\sqrt{6^2+8^2}=10$，外心在斜邊中點，$R=10\\div 2=5$。" },
        { q: "直角三角形三邊長為 9、12、15，它的內切圓半徑是多少？", answer: ["3"], hint: "$r=\\dfrac{\\text{兩股和}-\\text{斜邊}}{2}$", ex: "$r=\\dfrac{9+12-15}{2}=\\dfrac{6}{2}=3$。驗算：面積 $54=\\dfrac{36\\times 3}{2}$ ✔" },
        { q: "$\\triangle ABC$ 中，$\\angle A=50^\\circ$，$I$ 為內心，則 $\\angle BIC$ 是幾度？", answer: ["115"], show: "$115^\\circ$", ex: "$\\angle BIC=90^\\circ+\\dfrac{1}{2}\\times 50^\\circ=115^\\circ$。" },
        { q: "$G$ 為 $\\triangle ABC$ 的重心，中線 $\\overline{AD}=18$，則 $\\overline{AG}=$？", answer: ["12"], ex: "$\\overline{AG}:\\overline{GD}=2:1$，$\\overline{AG}=18\\times\\dfrac{2}{3}=12$（$\\overline{GD}=6$）。" },
        { q: "$\\triangle ABC$ 的面積為 48，$G$ 為重心，則 $\\triangle GAB$ 的面積是多少？", answer: ["16"], hint: "$\\triangle GAB$ 由六等分中的幾塊組成？", ex: "三中線把面積六等分，每塊 $48\\div 6=8$；$\\triangle GAB$ 含 2 塊，面積 $=16$（即全部的 $\\dfrac{1}{3}$）。" },
        { q: "一個三角形的周長為 30，內切圓半徑為 3，它的面積是多少？", answer: ["45"], ex: "面積 ＝ 周長 × $r$ ÷ 2 $=30\\times 3\\div 2=45$。" }
      ] },

      { type: "summary", title: "重點整理", items: [
        "<b>外心</b>＝三邊中垂線交點，到三<b>頂點</b>等距（外接圓半徑 $R$）；銳角在內、直角在斜邊中點、鈍角在外。",
        "直角三角形：外接圓半徑 $R=\\dfrac{\\text{斜邊}}{2}$；銳角三角形 $\\angle BOC=2\\angle A$。",
        "<b>內心</b>＝三內角平分線交點，到三<b>邊</b>等距（內切圓半徑 $r$），一定在內部；$\\angle BIC=90^\\circ+\\dfrac{1}{2}\\angle A$。",
        "三角形面積 ＝ 周長 × $r$ ÷ 2；直角三角形 $r=\\dfrac{\\text{兩股和}-\\text{斜邊}}{2}$。",
        "<b>重心</b>＝三中線交點，$\\overline{AG}:\\overline{GD}=2:1$；三中線把面積六等分；重心是均勻三角板的平衡點。",
        "正三角形三心合一，且 $R=2r$。"
      ], formula: "外心：到頂點等距　｜　內心：到邊等距　｜　重心：中線 $2:1$" },

      { type: "extend", title: "高中延伸：用坐標與向量看重心", where: "龍騰 高二 ・ 平面向量", html: `
        <p>上了高中，三角形放到坐標平面上，重心有一個非常漂亮的公式：三個頂點坐標直接平均。</p>
        <h3>1. 重心坐標公式</h3>
        <p>若 $A(x_1,y_1)$、$B(x_2,y_2)$、$C(x_3,y_3)$，則</p>
        $$G=\\left(\\frac{x_1+x_2+x_3}{3},\\ \\frac{y_1+y_2+y_3}{3}\\right)$$
        <h3>2. 向量性質</h3>
        <p>從重心指向三頂點的三個向量相加等於零向量：</p>
        $$\\overrightarrow{GA}+\\overrightarrow{GB}+\\overrightarrow{GC}=\\vec{0}$$
        <p>這正好呼應「平衡點」：三個頂點對重心的「拉力」互相抵消。</p>
        <h3>3. 試試看</h3>
        <p>$A(1,2)$、$B(5,0)$、$C(3,7)$：$G=\\left(\\dfrac{1+5+3}{3},\\dfrac{2+0+7}{3}\\right)=(3,3)$。</p>
        <p>$\\overrightarrow{GA}=(-2,-1)$，$\\overrightarrow{GB}=(2,-3)$，$\\overrightarrow{GC}=(0,4)$，相加 $=(0,0)$ ✔</p>
        <p>再驗證 $2:1$：$\\overline{BC}$ 中點 $D=(4,\\,3.5)$，$\\overrightarrow{AG}=(2,1)$，$\\overrightarrow{GD}=(1,\\,0.5)$，正好 $\\overrightarrow{AG}=2\\overrightarrow{GD}$，國中學的 $\\overline{AG}:\\overline{GD}=2:1$ 在坐標上也成立！</p>
      ` }
    ],

    /* ================= 互動圖 ================= */
    widgets: {
      /* 1. 三心變身器 */
      centers(stage, H) {
        const U = 30;
        let mode = 0;
        H.toggle(stage, ["外心 O", "內心 I", "重心 G"], i => { mode = i; draw(); });
        const svg = H.svg(stage, 480, 330);
        for (let x = 0; x <= 480; x += U) H.el("line", { x1: x, y1: 0, x2: x, y2: 330, stroke: "rgba(255,255,255,.045)" }, svg);
        for (let y = 0; y <= 330; y += U) H.el("line", { x1: 0, y1: y, x2: 480, y2: y, stroke: "rgba(255,255,255,.045)" }, svg);
        const layer = H.el("g", {}, svg);
        const top = H.el("g", {}, svg);
        const out = H.readout(stage);
        const V = [[228, 34], [125, 252], [361, 242]];
        const f = (x, d = 1) => H.fmt(x, d);
        const mk = (tag, a) => H.el(tag, a, layer);
        const seg = (P, Q, a) => mk("line", Object.assign({ x1: P[0], y1: P[1], x2: Q[0], y2: Q[1] }, a));
        const dot = (P, c, r = 5) => mk("circle", { cx: P[0], cy: P[1], r, fill: c, stroke: "#fff", "stroke-width": 1.5 });
        const right = (F, u, n, s = 9) => mk("path", { d: `M${F[0] + u[0] * s},${F[1] + u[1] * s} L${F[0] + u[0] * s + n[0] * s},${F[1] + u[1] * s + n[1] * s} L${F[0] + n[0] * s},${F[1] + n[1] * s}`, fill: "none", stroke: "#fff", "stroke-width": 1.3 });
        const ticks = (P, Q, k, c) => { /* 在線段 PQ 中點畫 k 條小刻痕 */
          const M = Gm.mid(P, Q), L = Gm.len(P, Q), u = [(Q[0] - P[0]) / L, (Q[1] - P[1]) / L], n = [-u[1], u[0]];
          for (let i = 0; i < k; i++) { const o = (i - (k - 1) / 2) * 5, C = [M[0] + u[0] * o, M[1] + u[1] * o]; seg([C[0] - n[0] * 6, C[1] - n[1] * 6], [C[0] + n[0] * 6, C[1] + n[1] * 6], { stroke: c, "stroke-width": 2 }); }
        };
        const label = (P, t, c, dx = 8, dy = -8) => mk("text", { x: Math.max(4, Math.min(466, P[0] + dx)), y: Math.max(16, Math.min(324, P[1] + dy)), text: t, fill: c, "font-weight": 700, "font-size": 16 });
        const sideCol = ["#8fd0ff", "#ff8fa3", "#5fd3a8"];

        function draw() {
          while (layer.firstChild) layer.removeChild(layer.firstChild);
          const [A, B, C] = V;
          const angA = Gm.angle(A, B, C), angB = Gm.angle(B, C, A), angC = Gm.angle(C, A, B);
          const area = Gm.area(A, B, C);
          mk("polygon", { points: V.map(p => p.join(",")).join(" "), fill: "rgba(205,197,255,.10)", stroke: "#cdc5ff", "stroke-width": 2.5 });
          const angs = `$\\angle A\\approx${f(angA)}^\\circ$，$\\angle B\\approx${f(angB)}^\\circ$，$\\angle C\\approx${f(angC)}^\\circ$`;

          if (mode === 0) { /* 外心 */
            const O = Gm.circum(A, B, C), R = Gm.len(O, A);
            mk("circle", { cx: O[0], cy: O[1], r: R, fill: "none", stroke: "#f6dc9a", "stroke-width": 2, "stroke-dasharray": "7 5" });
            [[A, B], [B, C], [C, A]].forEach(([P, Q], i) => {
              const M = Gm.mid(P, Q), L = Gm.len(P, Q), u = [(Q[0] - P[0]) / L, (Q[1] - P[1]) / L], n = [-u[1], u[0]];
              seg([M[0] - n[0] * 900, M[1] - n[1] * 900], [M[0] + n[0] * 900, M[1] + n[1] * 900], { stroke: sideCol[i], "stroke-width": 1.8, "stroke-dasharray": "5 5", opacity: .85 });
              ticks(P, M, i + 1, sideCol[i]); ticks(M, Q, i + 1, sideCol[i]);
              const toward = ((O[0] - M[0]) * n[0] + (O[1] - M[1]) * n[1]) >= 0 ? n : [-n[0], -n[1]];
              right(M, u, toward);
            });
            V.forEach(P => seg(O, P, { stroke: "#f6dc9a", "stroke-width": 1.6, opacity: .9 }));
            dot(O, "#ff8fa3", 6); label(O, "O", "#ff8fa3");
            const big = Math.max(angA, angB, angC), name = ["A", "B", "C"][[angA, angB, angC].indexOf(big)];
            let kind, pos;
            if (Math.abs(big - 90) < 0.05) { kind = "直角三角形"; pos = "斜邊中點"; }
            else if (big < 90) { kind = "銳角三角形"; pos = "三角形內部"; }
            else { kind = "鈍角三角形"; pos = "三角形外部"; }
            const extra = big < 89.95 ? `<br>補充：$\\angle BOC\\approx${f(Gm.angle(O, B, C))}^\\circ=2\\angle A$（$\\angle A\\approx${f(angA)}^\\circ$）` : "";
            out.set(`<span class="tag">${kind}</span>最大角 $\\angle ${name}${pos === "斜邊中點" ? "=90" : "\\approx" + f(big)}^\\circ$ → 外心在<b>${pos}</b><br>
              $\\overline{OA}\\approx${f(Gm.len(O, A) / U, 2)}$，$\\overline{OB}\\approx${f(Gm.len(O, B) / U, 2)}$，$\\overline{OC}\\approx${f(Gm.len(O, C) / U, 2)}$ → 到三頂點等距，外接圓半徑 $R\\approx$ <span class="big">${f(R / U, 2)}</span>${extra}`);
          } else if (mode === 1) { /* 內心 */
            const I = Gm.incenter(A, B, C), r = 2 * area / (Gm.len(A, B) + Gm.len(B, C) + Gm.len(C, A));
            mk("circle", { cx: I[0], cy: I[1], r, fill: "rgba(95,211,168,.13)", stroke: "#5fd3a8", "stroke-width": 2.2 });
            V.forEach((P, i) => {
              const Q = V[(i + 1) % 3], R2 = V[(i + 2) % 3];
              const b = Gm.len(P, R2), c = Gm.len(P, Q);  /* 角平分線把對邊分成 c：b */
              const D = [(b * Q[0] + c * R2[0]) / (b + c), (b * Q[1] + c * R2[1]) / (b + c)];
              seg(P, D, { stroke: "#8fd0ff", "stroke-width": 1.8, "stroke-dasharray": "5 5" });
              const rr = 20 + i * 3;
              mk("path", { d: H.arcPath(P, Q, D, rr), fill: "none", stroke: sideCol[i], "stroke-width": 2 });
              mk("path", { d: H.arcPath(P, D, R2, rr), fill: "none", stroke: sideCol[i], "stroke-width": 2 });
              const F = Gm.foot(I, Q, R2), L = Gm.len(Q, R2), u = [(R2[0] - Q[0]) / L, (R2[1] - Q[1]) / L], d = Gm.len(I, F) || 1;
              seg(I, F, { stroke: "#ff8fa3", "stroke-width": 2 });
              right(F, u, [(I[0] - F[0]) / d, (I[1] - F[1]) / d]);
            });
            dot(I, "#5fd3a8", 6); label(I, "I", "#5fd3a8", 8, -10);
            const dAB = 2 * Gm.area(I, A, B) / Gm.len(A, B), dBC = 2 * Gm.area(I, B, C) / Gm.len(B, C), dCA = 2 * Gm.area(I, C, A) / Gm.len(C, A);
            const per = (Gm.len(A, B) + Gm.len(B, C) + Gm.len(C, A)) / U;
            out.set(`<span class="tag">內心在內部</span>$I$ 到三邊距離：$\\overline{AB}$ $${f(dAB / U, 2)}$，$\\overline{BC}$ $${f(dBC / U, 2)}$，$\\overline{CA}$ $${f(dCA / U, 2)}$ → 內切圓半徑 $r\\approx$ <span class="big">${f(r / U, 2)}</span><br>
              $\\angle BIC\\approx${f(Gm.angle(I, B, C))}^\\circ$，$90^\\circ+\\frac{1}{2}\\angle A\\approx${f(90 + angA / 2)}^\\circ$<br>
              周長×$r$÷2 $\\approx${f(per, 2)}\\times${f(r / U, 2)}\\div 2\\approx${f(per * (r / U) / 2, 1)}$ ＝ 面積 $${f(area / U / U, 1)}$`);
          } else { /* 重心 */
            const G = Gm.centroid(A, B, C);
            const rows = [];
            V.forEach((P, i) => {
              const Q = V[(i + 1) % 3], R2 = V[(i + 2) % 3], D = Gm.mid(Q, R2);
              seg(P, D, { stroke: sideCol[i], "stroke-width": 2.2 });
              ticks(Q, D, i + 1, sideCol[i]); ticks(D, R2, i + 1, sideCol[i]);
              dot(D, sideCol[i], 4);
              const nm = "ABC"[i], dn = "DEF"[i];
              label(D, dn, sideCol[i], (D[0] - G[0]) > 0 ? 8 : -20, (D[1] - G[1]) > 0 ? 18 : -8);
              const ag = Gm.len(P, G) / U, gd = Gm.len(G, D) / U;
              rows.push(`$\\overline{${nm}G}\\approx${f(ag, 2)}$，$\\overline{G${dn}}\\approx${f(gd, 2)}$，比 $=${f(ag / gd, 2)}:1$`);
            });
            dot(G, "#f6dc9a", 6); label(G, "G", "#f6dc9a", 9, -9);
            out.set(`<span class="tag">重心在內部</span>三中線交於 $G$，每條都被分成 <span class="big">2：1</span><br>${rows.join("<br>")}`);
          }
        }
        dragTriangle(H, svg, V, top, draw, true);
        draw();
      },

      /* 2. 中線六等分面積 */
      sixAreas(stage, H) {
        const U = 30;
        const svg = H.svg(stage, 480, 330);
        const layer = H.el("g", {}, svg), top = H.el("g", {}, svg);
        const out = H.readout(stage);
        const V = [[200, 40], [50, 290], [440, 270]];
        const fills = ["rgba(143,208,255,.30)", "rgba(255,143,163,.30)", "rgba(95,211,168,.30)", "rgba(246,220,154,.30)", "rgba(205,197,255,.34)", "rgba(255,255,255,.16)"];
        function draw() {
          while (layer.firstChild) layer.removeChild(layer.firstChild);
          const [A, B, C] = V, G = Gm.centroid(A, B, C);
          const D = Gm.mid(B, C), E = Gm.mid(C, A), F = Gm.mid(A, B);
          /* 依序繞一圈：A-F-B-D-C-E */
          const ring = [A, F, B, D, C, E];
          const areas = [];
          for (let i = 0; i < 6; i++) {
            const P = ring[i], Q = ring[(i + 1) % 6], ar = Gm.area(G, P, Q);
            areas.push(ar);
            H.el("polygon", { points: [G, P, Q].map(p => p.join(",")).join(" "), fill: fills[i], stroke: "rgba(255,255,255,.5)", "stroke-width": 1 }, layer);
            const c = Gm.centroid(G, P, Q);
            H.el("text", { x: c[0], y: c[1] + 5, text: H.fmt(ar / U / U, 1), "text-anchor": "middle", "font-size": 15, "font-weight": 700 }, layer);
          }
          [[A, D], [B, E], [C, F]].forEach(([P, Q]) => H.el("line", { x1: P[0], y1: P[1], x2: Q[0], y2: Q[1], stroke: "#cdc5ff", "stroke-width": 2 }, layer));
          H.el("polygon", { points: V.map(p => p.join(",")).join(" "), fill: "none", stroke: "#cdc5ff", "stroke-width": 2.5 }, layer);
          H.el("circle", { cx: G[0], cy: G[1], r: 5, fill: "#f6dc9a", stroke: "#fff", "stroke-width": 1.5 }, layer);
          const total = Gm.area(A, B, C) / U / U;
          out.set(`六塊面積（平方格）：${areas.map(a => H.fmt(a / U / U, 1)).join("、")}<br>總面積 $\\approx${H.fmt(total, 1)}$，每塊 $=\\dfrac{${H.fmt(total, 1)}}{6}\\approx$ <span class="big">${H.fmt(total / 6, 1)}</span> → 六塊相等！`);
        }
        dragTriangle(H, svg, V, top, draw, false);
        draw();
      },

      /* 3. 吊掛紙板 */
      balance(stage, H) {
        const svg = H.svg(stage, 480, 300);
        const T = [[60, 30], [25, 255], [205, 235]];
        const [A, B, C] = T;
        const G = Gm.centroid(A, B, C), I = Gm.incenter(A, B, C), O = Gm.circum(A, B, C);
        const S = 0.65, PV = [355, 130];
        H.el("line", { x1: 225, y1: 10, x2: 225, y2: 290, stroke: "rgba(255,255,255,.15)", "stroke-dasharray": "4 6" }, svg);
        H.el("text", { x: 120, y: 22, text: "釘在哪裡？", fill: "#cdc5ff", "font-size": 13 }, svg);
        H.el("text", { x: 384, y: 22, text: "掛起來的樣子", fill: "#cdc5ff", "font-size": 13 }, svg);
        /* 左：紙板 */
        H.el("polygon", { points: T.map(p => p.join(",")).join(" "), fill: "rgba(205,197,255,.18)", stroke: "#cdc5ff", "stroke-width": 2.5 }, svg);
        [[O, "O", "#8fd0ff"], [I, "I", "#5fd3a8"], [G, "G", "#f6dc9a"]].forEach(([p, t, c]) => {
          H.el("circle", { cx: p[0], cy: p[1], r: 3.5, fill: c }, svg);
          H.el("text", { x: p[0] + (t === "O" ? -16 : 6), y: p[1] + (t === "I" ? 16 : -6), text: t, fill: c, "font-size": 13, "font-weight": 700 }, svg);
        });
        T.forEach((p, i) => H.el("text", { x: p[0] + [8, -14, 6][i], y: p[1] + [4, 16, 14][i], text: "ABC"[i], "font-size": 15 }, svg));
        const pin = H.el("circle", { r: 9, fill: "#ff8fa3", stroke: "#fff", "stroke-width": 2 }, svg);
        /* 右：吊起來 */
        H.el("line", { x1: PV[0], y1: 10, x2: PV[0], y2: 290, stroke: "rgba(246,220,154,.35)", "stroke-width": 1.5, "stroke-dasharray": "6 5" }, svg);
        const plate = H.el("polygon", { fill: "rgba(205,197,255,.22)", stroke: "#cdc5ff", "stroke-width": 2.5 }, svg);
        const gDot = H.el("circle", { r: 5, fill: "#f6dc9a", stroke: "#fff", "stroke-width": 1.2 }, svg);
        const gLab = H.el("text", { text: "G", fill: "#f6dc9a", "font-size": 14, "font-weight": 700 }, svg);
        H.el("circle", { cx: PV[0], cy: PV[1], r: 6, fill: "#ff8fa3", stroke: "#fff", "stroke-width": 2 }, svg);
        const out = H.readout(stage);
        const row = H.row(stage);
        let P = [62, 52], cur = 0, target = 0, raf = 0;
        const rot = (X, th) => { const x = (X[0] - P[0]) * S, y = (X[1] - P[1]) * S, c = Math.cos(th), s = Math.sin(th); return [PV[0] + x * c - y * s, PV[1] + x * s + y * c]; };
        const render = () => {
          H.set(plate, { points: T.map(p => rot(p, cur).join(",")).join(" ") });
          const g = rot(G, cur); H.set(gDot, { cx: g[0], cy: g[1] }); H.set(gLab, { x: g[0] + 8, y: g[1] + 4 });
        };
        const animate = () => {
          let d = target - cur; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
          if (Math.abs(d) < 0.002) { cur = target; render(); raf = 0; return; }
          cur += d * 0.18; render(); raf = requestAnimationFrame(animate);
        };
        const update = () => {
          H.set(pin, { cx: P[0], cy: P[1] });
          const d = Gm.len(P, G);
          const atG = d < 1e-9;
          if (!atG) target = Math.PI / 2 - Math.atan2(G[1] - P[1], G[0] - P[0]);
          if (!raf) raf = requestAnimationFrame(animate);
          const nm = Gm.len(P, O) < 1e-9 ? "外心 O" : Gm.len(P, I) < 1e-9 ? "內心 I" : "";
          out.set(atG
            ? `<span class="tag">平衡！</span>釘子就在<b>重心 G</b>：重力作用點剛好在支點上，紙板停在任何角度都不會再轉動。`
            : `<span class="tag">會轉動</span>釘子${nm ? `在<b>${nm}</b>，` : ""}離重心 G 約 $${H.fmt(d / 30, 2)}$ 格 → 紙板會轉到 <b>G 落在釘子正下方</b>（金色虛線上）才停。`);
        };
        H.drag(svg, pin, (x, y) => {
          let p = [x, y];
          if (!Gm.inside(p, A, B, C)) return;
          if (Gm.len(p, G) < 7) p = G.slice();
          P = p; update();
        });
        H.button(row, "釘在重心 G", () => { P = G.slice(); update(); });
        H.button(row, "釘在內心 I", () => { P = I.slice(); update(); });
        H.button(row, "釘在外心 O", () => { P = O.slice(); update(); });
        H.button(row, "靠近頂點 A", () => { P = [A[0] + (G[0] - A[0]) * 0.15, A[1] + (G[1] - A[1]) * 0.15]; update(); });
        cur = target = Math.PI / 2 - Math.atan2(G[1] - P[1], G[0] - P[0]);
        render(); update();
      }
    }
  };
})();
