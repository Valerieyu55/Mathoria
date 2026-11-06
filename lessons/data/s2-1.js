/* 2-1 點、直線與圓的關係（康軒九上 第 2 章 圓）
   對應 108 課綱：S-9-5 圓弧長與扇形面積、S-9-7 點、直線與圓的關係 */
window.MATHORIA_LESSON = {
  title: "2-1 點、直線與圓的關係",
  unit: "康軒 九上 ・ 第 2 章 圓",
  subtitle: "用「距離」和「半徑」比大小，就能判斷點、直線與圓的位置。",
  codes: ["S-9-5 圓弧長與扇形面積", "S-9-7 點、直線與圓的關係"],
  time: "2 節課",
  goals: [
    "認識圓的名詞：弦、直徑、弧、弓形、扇形，並會算弧長與扇形面積",
    "用「圓心到點的距離 $d$」與半徑 $r$ 判斷點在圓內、圓上或圓外",
    "用「圓心到直線的距離 $d$」判斷直線與圓不相交、相切或交於兩點",
    "知道切線垂直於過切點的半徑，以及弦心距垂直平分弦"
  ],
  sections: [
    { type: "story", lines: [
      { who: "narrator", text: "圓環聖殿的大門前，一道光圈緩緩轉動。門上刻著：「只有懂得量距離的人，才能通過。」" },
      { who: "player", text: "量距離？跟圓有什麼關係？" },
      { who: "pet", text: "{name}，圓上每一點到圓心的距離都一樣，就是半徑！只要拿「距離」跟「半徑」比大小，什麼位置關係都看得出來" },
      { who: "boss", text: "哼哼，我是{boss}。看起來碰到圓的線，就一定只碰一點嗎？你們的眼睛會騙人的！" },
      { who: "player", text: "那我就不靠眼睛，改用距離來判斷！" }
    ] },

    { type: "concept", title: "圓的基本名詞", html: `
      <p>平面上與一個定點距離相等的所有點，形成一個<b>圓</b>。這個定點叫<b>圓心</b>，這個固定距離叫<b>半徑</b> $r$。</p>
      <div class="fig"><svg viewBox="0 0 360 230">
        <path d="M180,115 L268.4,64 A102,102 0 0 0 180,13 Z" fill="rgba(246,220,154,.25)" stroke="none"/>
        <path d="M88,160 A102,102 0 0 0 272,160 Z" fill="rgba(167,155,240,.28)"/>
        <circle cx="180" cy="115" r="102" fill="none" stroke="#cdc5ff" stroke-width="2.5"/>
        <line x1="78" y1="115" x2="282" y2="115" stroke="#8fd0ff" stroke-width="2"/>
        <line x1="88" y1="160" x2="272" y2="160" stroke="#ff8fa3" stroke-width="2"/>
        <line x1="180" y1="115" x2="268.4" y2="64" stroke="#f6dc9a" stroke-width="2"/>
        <line x1="180" y1="115" x2="180" y2="13" stroke="#f6dc9a" stroke-width="2"/>
        <circle cx="180" cy="115" r="4" fill="#fff"/>
        <text x="168" y="133" fill="#fff" font-size="14">O</text>
        <text x="96" y="108" fill="#8fd0ff" font-size="13">直徑</text>
        <text x="160" y="182" fill="#ff8fa3" font-size="13">弦</text>
        <text x="160" y="206" fill="#cdc5ff" font-size="13">弓形</text>
        <text x="206" y="62" fill="#f6dc9a" font-size="13">扇形</text>
      </svg></div>
      <ul>
        <li><b>弦</b>：連接圓上任意兩點的線段。通過圓心的弦就是<b>直徑</b>，直徑 $=2r$，是最長的弦。</li>
        <li><b>弧</b>：圓上兩點之間的一段圓周。比半圓小的叫<b>劣弧</b>，比半圓大的叫<b>優弧</b>。</li>
        <li><b>弓形</b>：一條弦和它所對的弧圍成的區域。</li>
        <li><b>扇形</b>：兩條半徑和它們所夾的弧圍成的區域，兩半徑的夾角叫<b>圓心角</b>。</li>
      </ul>
      <div class="key"><b>弧長與扇形面積</b>（圓心角為 $\\theta^\\circ$）<br>
        $$\\text{弧長}=2\\pi r\\times\\frac{\\theta}{360},\\qquad \\text{扇形面積}=\\pi r^2\\times\\frac{\\theta}{360}$$
        扇形是整個圓的 $\\dfrac{\\theta}{360}$，所以弧長、面積都按這個比例取。</div>
    ` },

    { type: "example", title: "例題 1　弧長與扇形面積", problem: "半徑 6 公分、圓心角 $120^\\circ$ 的扇形，弧長與面積各是多少？（答案用 $\\pi$ 表示）",
      steps: [
        "扇形占整個圓的 $\\dfrac{120}{360}=\\dfrac{1}{3}$。",
        "弧長 $=2\\pi\\times 6\\times\\dfrac{1}{3}=4\\pi$（公分）。",
        "面積 $=\\pi\\times 6^2\\times\\dfrac{1}{3}=12\\pi$（平方公分）。"
      ],
      answer: "弧長 $4\\pi$ 公分，面積 $12\\pi$ 平方公分" },

    { type: "concept", title: "點與圓的位置關係", html: `
      <p>設圓 $O$ 的半徑為 $r$，點 $P$ 到圓心的距離 $\\overline{OP}=d$：</p>
      <div class="table-wrap"><table>
        <tr><th>距離比較</th><th>$d<r$</th><th>$d=r$</th><th>$d>r$</th></tr>
        <tr><th>點 $P$ 的位置</th><td>圓內</td><td>圓上</td><td>圓外</td></tr>
      </table></div>
      <div class="key"><b>口訣</b>：比較「點到圓心的距離」和「半徑」，小於在內、等於在上、大於在外。</div>
    ` },
    { type: "widget", title: "拖曳點 P，看看它在哪裡", widget: "pointCircle",
      intro: "圓 $O$ 的半徑 $r=5$。拖曳金色的點 $P$，觀察 $d=\\overline{OP}$ 怎麼決定位置。",
      caption: "每一格代表 1 單位。試著把 $P$ 放到剛好 $d=5$ 的地方。" },

    { type: "concept", title: "直線與圓的位置關係", html: `
      <p>判斷直線 $L$ 與圓的關係時，要用<b>圓心到直線的距離</b> $d$（從圓心作直線的垂線段長），再跟半徑 $r$ 比較：</p>
      <div class="table-wrap"><table>
        <tr><th>距離比較</th><th>$d>r$</th><th>$d=r$</th><th>$d<r$</th></tr>
        <tr><th>交點個數</th><td>0 個</td><td>1 個</td><td>2 個</td></tr>
        <tr><th>關係</th><td>不相交</td><td>相切（$L$ 是<b>切線</b>，交點叫<b>切點</b>）</td><td>交於兩點（$L$ 是<b>割線</b>）</td></tr>
      </table></div>
      <div class="key"><b>切線性質</b>：圓心與切點的連線垂直於切線。<br>也就是說，若 $L$ 切圓 $O$ 於 $A$，則 $\\overline{OA}\\perp L$。</div>
      <p class="note">反過來想：相切時 $d=r$，所以從圓心作直線的垂足到圓心的距離等於半徑，垂足就在圓上；而切線和圓只有一個交點，所以垂足就是切點，因此 $\\overline{OA}\\perp L$。</p>
    ` },
    { type: "widget", title: "移動直線，數一數交點", widget: "lineCircle",
      intro: "拉動滑桿改變圓心到直線的距離 $d$（半徑 $r=5$），觀察交點個數的變化。",
      caption: "當 $d=r$ 時，直線只碰到圓一點，而且半徑和切線形成直角。" },

    { type: "concept", title: "弦心距垂直平分弦", html: `
      <p>圓心到弦的垂直線段叫做<b>弦心距</b>。</p>
      <div class="key"><b>性質</b>：弦心距垂直平分這條弦。<br>若 $\\overline{OM}\\perp\\overline{AB}$ 於 $M$，則 $\\overline{AM}=\\overline{MB}$。</div>
      <p>為什麼？連接 $\\overline{OA}$、$\\overline{OB}$，因為 $\\overline{OA}=\\overline{OB}=r$，$\\overline{OM}$ 共用，$\\angle OMA=\\angle OMB=90^\\circ$，所以 $\\triangle OMA\\cong\\triangle OMB$（RHS 全等），得到 $\\overline{AM}=\\overline{MB}$。</p>
      <p>這時 $\\triangle OMA$ 是直角三角形，由畢氏定理：</p>
      $$r^2=d^2+\\left(\\tfrac{\\text{弦長}}{2}\\right)^2$$
      <p>半徑、弦心距、半弦三個量，知道兩個就能求第三個。</p>
    ` },
    { type: "widget", title: "弦心距與半弦", widget: "chordDistance",
      intro: "拉動滑桿改變弦心距 $d$，觀察弦長怎麼變化（半徑 $r=5$）。",
      caption: "弦心距越短，弦越長；弦心距為 0 時，弦就是直徑。" },

    { type: "example", title: "例題 2　求弦心距", problem: "圓 $O$ 的半徑為 13，弦 $\\overline{AB}=24$，求圓心 $O$ 到 $\\overline{AB}$ 的距離。",
      figure: `<svg viewBox="0 0 300 200"><circle cx="150" cy="100" r="85" fill="none" stroke="#cdc5ff" stroke-width="2"/><line x1="71.5" y1="132.7" x2="228.5" y2="132.7" stroke="#ff8fa3" stroke-width="2.5"/><line x1="150" y1="100" x2="150" y2="132.7" stroke="#f6dc9a" stroke-width="2" stroke-dasharray="5 4"/><line x1="150" y1="100" x2="71.5" y2="132.7" stroke="#8fd0ff" stroke-width="2"/><path d="M150,124.7 h8 v8" fill="none" stroke="#fff"/><circle cx="150" cy="100" r="3.5" fill="#fff"/><text x="143" y="92" font-size="14" fill="#fff">O</text><text x="56" y="140" font-size="14" fill="#fff">A</text><text x="232" y="140" font-size="14" fill="#fff">B</text><text x="146" y="152" font-size="14" fill="#fff">M</text><text x="96" y="108" font-size="13" fill="#8fd0ff">13</text></svg>`,
      steps: [
        "作 $\\overline{OM}\\perp\\overline{AB}$ 於 $M$。弦心距垂直平分弦，所以 $\\overline{AM}=24\\div 2=12$。",
        "$\\triangle OMA$ 是直角三角形，斜邊 $\\overline{OA}=13$。",
        "$\\overline{OM}=\\sqrt{13^2-12^2}=\\sqrt{169-144}=\\sqrt{25}=5$。"
      ],
      answer: "圓心到 $\\overline{AB}$ 的距離為 5" },

    { type: "example", title: "例題 3　切線段長", problem: "圓 $O$ 的半徑為 6，圓外一點 $P$ 到圓心的距離 $\\overline{OP}=10$。$\\overline{PA}$ 切圓 $O$ 於 $A$，求 $\\overline{PA}$。",
      figure: `<svg viewBox="0 0 280 200"><circle cx="100" cy="100" r="60" fill="none" stroke="#cdc5ff" stroke-width="2"/><line x1="100" y1="100" x2="200" y2="100" stroke="#8fd0ff" stroke-width="2" stroke-dasharray="5 4"/><line x1="136" y1="52" x2="200" y2="100" stroke="#f6dc9a" stroke-width="2.5"/><line x1="100" y1="100" x2="136" y2="52" stroke="#ff8fa3" stroke-width="2"/><path d="M129.6,56.8 l4.8,6.4 l6.4,-4.8" fill="none" stroke="#fff" stroke-width="1.3"/><circle cx="100" cy="100" r="3.5" fill="#fff"/><circle cx="200" cy="100" r="3.5" fill="#fff"/><text x="86" y="118" font-size="14" fill="#fff">O</text><text x="206" y="105" font-size="14" fill="#fff">P</text><text x="130" y="44" font-size="14" fill="#fff">A</text><text x="104" y="72" font-size="13" fill="#ff8fa3">6</text><text x="146" y="118" font-size="13" fill="#8fd0ff">10</text></svg>`,
      steps: [
        "切線垂直於過切點的半徑，所以 $\\overline{OA}\\perp\\overline{PA}$，$\\angle OAP=90^\\circ$。",
        "在直角 $\\triangle OAP$ 中，$\\overline{PA}^2=\\overline{OP}^2-\\overline{OA}^2=100-36=64$。",
        "$\\overline{PA}=8$。"
      ],
      answer: "$\\overline{PA}=8$" },

    { type: "myth", title: "破解{boss}的幻術", items: [
      { wrong: "直線看起來只擦過圓的邊，就是相切。", right: "要算圓心到直線的距離 $d$，$d=r$ 才是相切。", why: "畫圖會有誤差。$d$ 比 $r$ 小一點點時，其實有兩個交點。" },
      { wrong: "直徑不是弦。", right: "直徑是通過圓心的弦，而且是最長的弦。", why: "弦的定義是「圓上任兩點連成的線段」，直徑也符合。" },
      { wrong: "從圓心到弦隨便連一條線，都會平分這條弦。", right: "只有<b>垂直</b>於弦的線段（弦心距）才會平分弦。", why: "連到弦上其他點的線段，不會把弦分成相等的兩段。" },
      { wrong: "判斷點與圓的關係時，比的是點到圓周的距離。", right: "比的是點到<b>圓心</b>的距離 $d$ 和半徑 $r$。", why: "圓心是基準；$d<r$ 在圓內，$d=r$ 在圓上，$d>r$ 在圓外。" }
    ] },

    { type: "practice", title: "即時練習", items: [
      { q: "圓 $O$ 的半徑為 7，點 $P$ 到圓心的距離為 $\\sqrt{50}$，點 $P$ 在哪裡？", o: ["圓外", "圓上", "圓內", "無法判斷"], a: 0, ex: "$7=\\sqrt{49}$，而 $\\sqrt{50}>\\sqrt{49}$，所以 $d>r$，$P$ 在圓外。" },
      { q: "圓的半徑為 4，圓心到直線 $L$ 的距離為 3，$L$ 與圓有幾個交點？", o: ["2 個", "1 個", "0 個", "無法判斷"], a: 0, ex: "$d=3<r=4$，直線與圓交於兩點。" },
      { q: "$\\overline{PA}$ 切圓 $O$ 於 $A$，則 $\\angle OAP$ 是幾度？", answer: ["90"], show: "$90^\\circ$", ex: "切線垂直於過切點的半徑，所以 $\\angle OAP=90^\\circ$。" },
      { q: "圓 $O$ 的半徑為 10，弦心距為 6，弦長是多少？", answer: ["16"], show: "16", hint: "先用畢氏定理求半弦。", ex: "半弦 $=\\sqrt{10^2-6^2}=8$，弦長 $=2\\times 8=16$。" },
      { q: "半徑 9 公分、圓心角 $40^\\circ$ 的扇形，弧長是多少？", o: ["$2\\pi$ 公分", "$9\\pi$ 公分", "$4\\pi$ 公分", "$18\\pi$ 公分"], a: 0, ex: "$2\\pi\\times 9\\times\\dfrac{40}{360}=18\\pi\\times\\dfrac{1}{9}=2\\pi$。" },
      { q: "圓 $O$ 的半徑為 5，圓外一點 $P$ 的切線段長 $\\overline{PA}=12$，則 $\\overline{OP}=$？", answer: ["13"], show: "13", ex: "$\\angle OAP=90^\\circ$，$\\overline{OP}=\\sqrt{5^2+12^2}=13$。" }
    ] },

    { type: "summary", title: "重點整理", items: [
      "弦：圓上兩點的連線段；直徑是通過圓心的弦，也是最長的弦。",
      "弧長 $=2\\pi r\\times\\dfrac{\\theta}{360}$；扇形面積 $=\\pi r^2\\times\\dfrac{\\theta}{360}$。",
      "點與圓：比較 $d=\\overline{OP}$ 與 $r$。$d<r$ 圓內、$d=r$ 圓上、$d>r$ 圓外。",
      "直線與圓：比較圓心到直線的距離 $d$ 與 $r$。$d>r$ 不相交、$d=r$ 相切、$d<r$ 交於兩點。",
      "切線垂直於過切點的半徑。",
      "弦心距垂直平分弦，且 $r^2=d^2+\\left(\\tfrac{\\text{弦長}}{2}\\right)^2$。"
    ] },

    { type: "extend", title: "高中延伸：用坐標判斷直線與圓", where: "龍騰 高一 數學第一冊 ・ 直線與圓", html: `
      <p>上高中後，圓和直線都會寫成<b>方程式</b>，判斷的道理和國中完全一樣：還是比較「圓心到直線的距離」與半徑。</p>
      <h3>1. 圓的方程式</h3>
      <p>圓心 $(h,k)$、半徑 $r$ 的圓，就是到 $(h,k)$ 距離等於 $r$ 的所有點 $(x,y)$。用兩點距離公式寫出來：</p>
      $$(x-h)^2+(y-k)^2=r^2$$
      <h3>2. 點到直線的距離公式</h3>
      <p>點 $(x_0,y_0)$ 到直線 $ax+by+c=0$ 的距離：</p>
      $$d=\\frac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}}$$
      <h3>3. 試試看</h3>
      <p>圓 $x^2+y^2=25$ 的圓心是 $(0,0)$、半徑 5。直線 $3x+4y-25=0$ 到圓心的距離：</p>
      $$d=\\frac{|3\\cdot 0+4\\cdot 0-25|}{\\sqrt{3^2+4^2}}=\\frac{25}{5}=5=r$$
      <p>所以這條直線與圓<b>相切</b>，切點是 $(3,4)$（代入兩個方程式都成立）。國中用的「$d$ 和 $r$ 比大小」，到了高中依然是核心想法。</p>
    ` }
  ],

  /* ================= 互動圖 ================= */
  widgets: {
    /* 點與圓：拖曳 P */
    pointCircle(stage, H) {
      const U = 24, O = [240, 165], R = 5 * U;
      const svg = H.svg(stage, 480, 330);
      for (let x = O[0] % U; x < 480; x += U) H.el("line", { x1: x, y1: 0, x2: x, y2: 330, stroke: "rgba(255,255,255,.05)" }, svg);
      for (let y = O[1] % U; y < 330; y += U) H.el("line", { x1: 0, y1: y, x2: 480, y2: y, stroke: "rgba(255,255,255,.05)" }, svg);
      const disk = H.el("circle", { cx: O[0], cy: O[1], r: R, fill: "rgba(167,155,240,.12)", stroke: "#cdc5ff", "stroke-width": 3 }, svg);
      H.el("circle", { cx: O[0], cy: O[1], r: 4, fill: "#fff" }, svg);
      H.el("text", { x: O[0] - 18, y: O[1] + 20, text: "O" }, svg);
      const seg = H.el("line", { x1: O[0], y1: O[1], "stroke-dasharray": "6 5", stroke: "#f6dc9a", "stroke-width": 2 }, svg);
      const lab = H.el("text", { fill: "#f6dc9a" }, svg);
      const P = H.el("circle", { r: 11, fill: "#f6dc9a", stroke: "#fff", "stroke-width": 2 }, svg);
      const PL = H.el("text", { text: "P" }, svg);
      const out = H.readout(stage);
      let p = [O[0] + 3 * U, O[1] - 2 * U];
      const draw = () => {
        let d = H.dist(p, O) / U;
        if (Math.abs(d - 5) < 0.12) { const k = 5 * U / H.dist(p, O); p = [O[0] + (p[0] - O[0]) * k, O[1] + (p[1] - O[1]) * k]; d = 5; }
        H.set(P, { cx: p[0], cy: p[1] }); H.set(PL, { x: p[0] + 14, y: p[1] - 12 });
        H.set(seg, { x2: p[0], y2: p[1] }); H.set(lab, { x: (p[0] + O[0]) / 2 + 8, y: (p[1] + O[1]) / 2 - 8, text: "d = " + H.fmt(d) });
        const pos = d === 5 ? "圓上" : d < 5 ? "圓內" : "圓外", sym = d === 5 ? "=" : d < 5 ? "<" : ">";
        H.set(disk, { fill: d < 5 ? "rgba(95,211,168,.16)" : d === 5 ? "rgba(246,220,154,.18)" : "rgba(167,155,240,.10)" });
        out.set(`<span class="tag">${pos}</span> $d=${H.fmt(d)}\\;${sym}\\;r=5$，所以點 $P$ 在<b>${pos}</b>。`);
      };
      H.drag(svg, P, (x, y) => { p = [Math.max(12, Math.min(468, x)), Math.max(12, Math.min(318, y))]; draw(); });
      draw();
    },

    /* 直線與圓：滑桿控制距離 */
    lineCircle(stage, H) {
      const U = 24, O = [240, 140], r = 5;
      const svg = H.svg(stage, 480, 330);
      H.el("circle", { cx: O[0], cy: O[1], r: r * U, fill: "rgba(167,155,240,.12)", stroke: "#cdc5ff", "stroke-width": 3 }, svg);
      H.el("circle", { cx: O[0], cy: O[1], r: 4, fill: "#fff" }, svg);
      H.el("text", { x: O[0] - 20, y: O[1] - 6, text: "O" }, svg);
      const line = H.el("line", { x1: 0, x2: 480, stroke: "#8fd0ff", "stroke-width": 3 }, svg);
      const perp = H.el("line", { x1: O[0], y1: O[1], x2: O[0], stroke: "#f6dc9a", "stroke-width": 2, "stroke-dasharray": "6 5" }, svg);
      const dl = H.el("text", { x: O[0] + 8, fill: "#f6dc9a" }, svg);
      const right = H.el("path", { fill: "none", stroke: "#fff", "stroke-width": 1.5 }, svg);
      const p1 = H.el("circle", { r: 7, fill: "#ff8fa3" }, svg), p2 = H.el("circle", { r: 7, fill: "#ff8fa3" }, svg);
      const out = H.readout(stage);
      H.slider(stage, { label: "圓心到直線距離 d", min: 0, max: 7, step: 0.1, value: 3, fmt: v => H.fmt(v) }, d => {
        if (Math.abs(d - r) < 0.05) d = r;
        const y = O[1] + d * U;
        H.set(line, { y1: y, y2: y }); H.set(perp, { y2: y }); H.set(dl, { y: (O[1] + y) / 2 + 5, text: d > 0.4 ? "d = " + H.fmt(d) : "" });
        H.set(right, { d: d > 0.4 ? `M${O[0]},${y - 9} h9 v9` : "" });
        let n, rel;
        if (d < r) { const h = Math.sqrt(r * r - d * d) * U; H.set(p1, { cx: O[0] - h, cy: y, r: 7 }); H.set(p2, { cx: O[0] + h, cy: y, r: 7 }); n = 2; rel = "交於兩點（割線）"; }
        else if (d === r) { H.set(p1, { cx: O[0], cy: y, r: 8 }); H.set(p2, { r: 0 }); n = 1; rel = "相切（切線）"; }
        else { H.set(p1, { r: 0 }); H.set(p2, { r: 0 }); n = 0; rel = "不相交"; }
        const sym = d === r ? "=" : d < r ? "<" : ">";
        out.set(`<span class="tag">${n} 個交點</span> $d=${H.fmt(d)}\\;${sym}\\;r=5$ → <b>${rel}</b>${d === r ? "，而且半徑垂直於切線" : ""}`);
      });
    },

    /* 弦心距與半弦 */
    chordDistance(stage, H) {
      const U = 26, O = [240, 140], r = 5;
      const svg = H.svg(stage, 480, 310);
      H.el("circle", { cx: O[0], cy: O[1], r: r * U, fill: "rgba(167,155,240,.1)", stroke: "#cdc5ff", "stroke-width": 3 }, svg);
      const chord = H.el("line", { stroke: "#ff8fa3", "stroke-width": 3.5 }, svg);
      const tri = H.el("path", { fill: "rgba(246,220,154,.18)", stroke: "none" }, svg);
      const OM = H.el("line", { x1: O[0], y1: O[1], x2: O[0], stroke: "#f6dc9a", "stroke-width": 2.5, "stroke-dasharray": "6 5" }, svg);
      const OA = H.el("line", { x1: O[0], y1: O[1], stroke: "#8fd0ff", "stroke-width": 2.5 }, svg);
      const mk = H.el("path", { fill: "none", stroke: "#fff", "stroke-width": 1.5 }, svg);
      H.el("circle", { cx: O[0], cy: O[1], r: 4, fill: "#fff" }, svg);
      const tO = H.el("text", { text: "O" }, svg), tA = H.el("text", { text: "A" }, svg), tB = H.el("text", { text: "B" }, svg), tM = H.el("text", { text: "M" }, svg);
      const out = H.readout(stage);
      H.slider(stage, { label: "弦心距 d", min: 0, max: 4.8, step: 0.1, value: 3, fmt: v => H.fmt(v) }, d => {
        const y = O[1] + d * U, h = Math.sqrt(r * r - d * d);
        const A = [O[0] - h * U, y], B = [O[0] + h * U, y];
        H.set(chord, { x1: A[0], y1: y, x2: B[0], y2: y }); H.set(OM, { y2: y }); H.set(OA, { x2: A[0], y2: y });
        H.set(tri, { d: `M${O[0]},${O[1]} L${A[0]},${y} L${O[0]},${y} Z` });
        H.set(mk, { d: d > 0.3 ? `M${O[0] - 9},${y} v-9 h9` : "" });
        H.set(tO, { x: O[0] + 6, y: O[1] - 6 }); H.set(tA, { x: A[0] - 18, y: y + 5 }); H.set(tB, { x: B[0] + 6, y: y + 5 }); H.set(tM, { x: O[0] + 4, y: y + 18 });
        out.set(`半弦 $\\overline{AM}=\\sqrt{r^2-d^2}=\\sqrt{25-${H.fmt(d * d, 2)}}\\approx ${H.fmt(h, 2)}$，弦長 $\\overline{AB}\\approx$ <span class="big">${H.fmt(2 * h, 2)}</span>` + (d === 0 ? "（這時弦就是直徑 10）" : ""));
      });
    }
  }
};
