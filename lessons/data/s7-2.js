/* 3-2 柱體、錐體與展開圖（康軒九下 第 3 章 立體圖形）
   對應 108 課綱：S-9-13 表面積與體積（直角柱、直圓錐、正角錐的展開圖與表面積；直角柱的體積）
   注意：錐體體積不在國中課綱內，只放在「高中延伸」。 */
(function () {
  /* ---------- 靜態圖小工具（在載入時產生 SVG 字串） ---------- */
  const f2 = x => (Math.round(x * 100) / 100).toString();
  const cells = s => { const o = []; s.split("/").forEach((row, r) => [...row].forEach((ch, c) => { if (ch === "X") o.push([c, r]); })); return o; };
  /* 一張小展開圖：pattern 用 "X.../XXXX/..X." 表示，左上角在 (x, y)，每格邊長 u */
  const netG = (pat, x, y, u, fill, stroke) => cells(pat).map(([c, r]) =>
    `<rect x="${x + c * u}" y="${y + r * u}" width="${u}" height="${u}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`).join("");
  const netSize = pat => { const cs = cells(pat); return [Math.max(...cs.map(p => p[0])) + 1, Math.max(...cs.map(p => p[1])) + 1]; };

  /* 正方體的 11 種展開圖（已用程式逐一摺疊檢查，且兩兩不全等） */
  const NETS = [
    ["X.../XXXX/X...", 0], ["X.../XXXX/.X..", 0], ["X.../XXXX/..X.", 0], ["X.../XXXX/...X", 0],
    [".X../XXXX/.X..", 0], [".X../XXXX/..X.", 0],
    ["XX../.XXX/.X..", 1], ["XX../.XXX/..X.", 1], ["XX../.XXX/...X", 1],
    ["XX../.XX./..XX", 2], ["XXX../..XXX", 3]
  ];
  const typeCol = [["rgba(143,208,255,.30)", "#8fd0ff"], ["rgba(246,220,154,.30)", "#f6dc9a"], ["rgba(95,211,168,.30)", "#5fd3a8"], ["rgba(255,143,163,.30)", "#ff8fa3"]];
  const elevenFig = (() => {
    const u = 15, gapX = 22, rowH = 72;
    const rows = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10]];
    let s = "", maxW = 0;
    rows.forEach((row, ri) => {
      let x = 10;
      row.forEach(k => {
        const [pat, t] = NETS[k], [w, h] = netSize(pat);
        s += netG(pat, x, 12 + ri * rowH + (3 - h) * u / 2, u, typeCol[t][0], typeCol[t][1]);
        s += `<text x="${x + w * u / 2}" y="${12 + ri * rowH + 3 * u + 16}" fill="#fff" font-size="12" text-anchor="middle">${k + 1}</text>`;
        x += w * u + gapX;
      });
      maxW = Math.max(maxW, x);
    });
    const ly = 12 + 3 * rowH + 16;
    const leg = ["1-4-1 型（6 種）", "2-3-1 型（3 種）", "2-2-2 型（1 種）", "3-3 型（1 種）"];
    leg.forEach((t, i) => { const lx = 10 + (i % 2) * 175, yy = ly + Math.floor(i / 2) * 22; s += `<rect x="${lx}" y="${yy - 11}" width="13" height="13" fill="${typeCol[i][0]}" stroke="${typeCol[i][1]}"/><text x="${lx + 19}" y="${yy}" fill="#fff" font-size="13">${t}</text>`; });
    return `<svg viewBox="0 0 ${Math.max(maxW, 360)} ${ly + 32}">${s}</svg>`;
  })();

  /* 練習題用：四張候選展開圖 */
  const quizNets = (() => {
    const list = [["X.../XXXX/..X.", "甲"], ["XXX../..XXX", "乙"], ["X.X./XXXX", "丙"], ["XX../.XX./..XX", "丁"]];
    const u = 13; let x = 6, s = "";
    list.forEach(([pat, name]) => {
      const [w, h] = netSize(pat);
      s += netG(pat, x, 6 + (3 - h) * u / 2, u, "rgba(205,197,255,.25)", "#cdc5ff");
      s += `<text x="${x + w * u / 2}" y="${6 + 3 * u + 18}" fill="#f6dc9a" font-size="14" text-anchor="middle">${name}</text>`;
      x += w * u + 18;
    });
    return `<div class="fig"><svg viewBox="0 0 ${x - 6} ${3 * u + 32}">${s}</svg></div>`;
  })();

  /* 扇形＋底面圓（圓錐展開圖），r、l 為真實長度，k 為縮放 */
  const coneNetFig = (r, l, k, W) => {
    const th = 360 * r / l, a = th / 2 * Math.PI / 180;
    const A = [W / 2, 14 + (th > 180 ? -l * k * Math.cos(a) : 0)];
    const p1 = [A[0] - l * k * Math.sin(a), A[1] + l * k * Math.cos(a)], p2 = [A[0] + l * k * Math.sin(a), A[1] + l * k * Math.cos(a)];
    const C = [A[0], A[1] + l * k + r * k];
    const H = C[1] + r * k + 10;
    return `<svg viewBox="0 0 ${W} ${f2(H)}">
      <path d="M${f2(A[0])},${f2(A[1])} L${f2(p1[0])},${f2(p1[1])} A${f2(l * k)},${f2(l * k)} 0 ${th > 180 ? 1 : 0} 0 ${f2(p2[0])},${f2(p2[1])} Z" fill="rgba(143,208,255,.22)" stroke="#8fd0ff" stroke-width="2"/>
      <path d="M${f2(p1[0])},${f2(p1[1])} A${f2(l * k)},${f2(l * k)} 0 ${th > 180 ? 1 : 0} 0 ${f2(p2[0])},${f2(p2[1])}" fill="none" stroke="#f6dc9a" stroke-width="3.5"/>
      <circle cx="${f2(C[0])}" cy="${f2(C[1])}" r="${f2(r * k)}" fill="rgba(246,220,154,.22)" stroke="#f6dc9a" stroke-width="2"/>
      <line x1="${f2(C[0])}" y1="${f2(C[1])}" x2="${f2(C[0] + r * k)}" y2="${f2(C[1])}" stroke="#ff8fa3" stroke-width="2"/>
      <circle cx="${f2(A[0])}" cy="${f2(A[1])}" r="3" fill="#fff"/>
      <text x="${f2(A[0] + (p2[0] - A[0]) * 0.45)}" y="${f2(A[1] + (p2[1] - A[1]) * 0.45 + 20)}" fill="#8fd0ff" font-size="14">l = ${l}</text>
      <text x="${f2(C[0] + r * k / 2 - 6)}" y="${f2(C[1] - 6)}" fill="#ff8fa3" font-size="14">r = ${r}</text>
      <text x="${f2(A[0] - 18)}" y="${f2(A[1] + 30)}" fill="#fff" font-size="13">${f2(th)}°</text>
    </svg>`;
  };

  /* 正方體切成 3 個四角錐（高中延伸用的圖） */
  const cubeSplitFig = (() => {
    const P = ([x, y, z]) => [70 + x * 130 + y * 60, 200 - z * 130 - y * 45];
    const V = [0, 0, 1];   /* 共同頂點：前上左 */
    const pt = v => P(v).map(f2).join(",");
    const ln = (a, b, c, w = 2, d = "") => `<line x1="${P(a)[0]}" y1="${P(a)[1]}" x2="${P(b)[0]}" y2="${P(b)[1]}" stroke="${c}" stroke-width="${w}" ${d ? `stroke-dasharray="${d}"` : ""}/>`;
    const face = (vs, fill) => `<polygon points="${vs.map(pt).join(" ")}" fill="${fill}" stroke="none"/>`;
    let s = "";
    s += face([[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]], "rgba(143,208,255,.25)");   /* x=1 右面 */
    s += face([[0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1]], "rgba(95,211,168,.22)");    /* y=1 後面 */
    s += face([[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]], "rgba(255,143,163,.22)");    /* z=0 底面 */
    const E = [[[0,0,0],[1,0,0]],[[1,0,0],[1,1,0]],[[1,1,0],[0,1,0]],[[0,1,0],[0,0,0]],[[0,0,1],[1,0,1]],[[1,0,1],[1,1,1]],[[1,1,1],[0,1,1]],[[0,1,1],[0,0,1]],[[0,0,0],[0,0,1]],[[1,0,0],[1,0,1]],[[1,1,0],[1,1,1]],[[0,1,0],[0,1,1]]];
    E.forEach(e => { const back = e.some(w => w.join() === "0,1,0"); s += ln(e[0], e[1], "#cdc5ff", 2, back ? "5 4" : ""); });
    [[1, 1, 0], [1, 0, 0], [1, 1, 1], [0, 1, 0], [1, 0, 1], [0, 1, 1], [0, 0, 0]].forEach(w => { s += ln(V, w, "#f6dc9a", 1.4, "4 4"); });
    s += `<circle cx="${P(V)[0]}" cy="${P(V)[1]}" r="5" fill="#f6dc9a"/><text x="${P(V)[0] - 22}" y="${P(V)[1] - 6}" fill="#f6dc9a" font-size="15">V</text>`;
    return `<svg viewBox="0 0 280 230">${s}</svg>`;
  })();

  window.MATHORIA_LESSON = {
    title: "3-2 柱體、錐體與展開圖",
    unit: "康軒 九下 ・ 第 3 章 立體圖形",
    subtitle: "把立體剪開攤平成展開圖，表面積就是展開圖的總面積。",
    codes: ["S-9-13 表面積與體積"],
    time: "3 節課",
    goals: [
      "畫出直角柱、直圓柱的展開圖，知道側面展開是長方形（長＝底面周長、寬＝高）",
      "計算柱體的表面積（側面積＋2×底面積）與體積（底面積×高）",
      "認識正方體的 11 種展開圖，並會判斷一張圖能不能摺成正方體",
      "用「斜高」計算正角錐的側面積與表面積",
      "知道直圓錐的側面展開是扇形：半徑＝母線 $l$、弧長＝$2\\pi r$，側面積＝$\\pi rl$"
    ],
    sections: [
      { type: "story", lines: [
        { who: "narrator", text: "空間魔方城的廣場上飄著一張張摺紙，每一張都在等人把它摺回立體。" },
        { who: "player", text: "這些紙片……摺起來會變成什麼形狀？" },
        { who: "pet", text: "{name}，把立體沿著稜剪開、攤平，就得到展開圖！展開圖的總面積，就是立體的表面積" },
        { who: "boss", text: "我是{boss}！這六個正方形連在一起，當然能摺成正方體——不信你摺摺看呀？" },
        { who: "player", text: "我會真的在腦中摺一次，還要把表面積算出來給你看！" }
      ] },

      { type: "concept", title: "柱體與錐體的名詞", html: `
        <div class="fig"><svg viewBox="0 0 420 190">
          <polygon points="20,150 100,150 130,128 130,48 100,70 20,70" fill="rgba(143,208,255,.16)" stroke="none"/>
          <polygon points="20,70 100,70 130,48 50,48" fill="rgba(246,220,154,.3)" stroke="#f6dc9a" stroke-width="2"/>
          <polyline points="20,150 100,150 130,128" fill="none" stroke="#8fd0ff" stroke-width="2"/>
          <line x1="20" y1="150" x2="20" y2="70" stroke="#8fd0ff" stroke-width="2"/><line x1="100" y1="150" x2="100" y2="70" stroke="#8fd0ff" stroke-width="2"/><line x1="130" y1="128" x2="130" y2="48" stroke="#8fd0ff" stroke-width="2"/>
          <polyline points="20,150 50,128 130,128" fill="none" stroke="#8fd0ff" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="50" y1="128" x2="50" y2="48" stroke="#8fd0ff" stroke-width="1.5" stroke-dasharray="5 4"/>
          <text x="38" y="178" fill="#fff" font-size="13">直四角柱</text>
          <polygon points="170,150 250,150 280,128 225,30" fill="rgba(143,208,255,.16)" stroke="none"/>
          <polyline points="170,150 250,150 280,128" fill="none" stroke="#8fd0ff" stroke-width="2"/>
          <polyline points="170,150 200,128 280,128" fill="none" stroke="#8fd0ff" stroke-width="1.5" stroke-dasharray="5 4"/>
          <line x1="170" y1="150" x2="225" y2="30" stroke="#8fd0ff" stroke-width="2"/><line x1="250" y1="150" x2="225" y2="30" stroke="#8fd0ff" stroke-width="2"/><line x1="280" y1="128" x2="225" y2="30" stroke="#8fd0ff" stroke-width="2"/><line x1="200" y1="128" x2="225" y2="30" stroke="#8fd0ff" stroke-width="1.5" stroke-dasharray="5 4"/>
          <line x1="225" y1="30" x2="225" y2="139" stroke="#ff8fa3" stroke-width="1.6" stroke-dasharray="4 3"/>
          <line x1="225" y1="30" x2="210" y2="150" stroke="#5fd3a8" stroke-width="2"/>
          <text x="229" y="118" style="fill:#ff8fa3" fill="#ff8fa3" font-size="12">高</text>
          <text x="186" y="112" fill="#5fd3a8" font-size="12">斜高</text>
          <text x="192" y="178" fill="#fff" font-size="13">正四角錐</text>
          <path d="M310,140 A50,14 0 0 0 410,140" fill="none" stroke="#8fd0ff" stroke-width="2"/>
          <path d="M310,140 A50,14 0 0 1 410,140" fill="none" stroke="#8fd0ff" stroke-width="1.5" stroke-dasharray="5 4"/>
          <line x1="310" y1="140" x2="360" y2="30" stroke="#8fd0ff" stroke-width="2"/><line x1="410" y1="140" x2="360" y2="30" stroke="#5fd3a8" stroke-width="2.4"/>
          <line x1="360" y1="30" x2="360" y2="140" stroke="#ff8fa3" stroke-width="1.6" stroke-dasharray="4 3"/>
          <line x1="360" y1="140" x2="410" y2="140" stroke="#f6dc9a" stroke-width="2"/>
          <text x="389" y="84" fill="#5fd3a8" font-size="12">母線 l</text>
          <text x="378" y="136" fill="#f6dc9a" font-size="12">r</text>
          <text x="340" y="96" fill="#ff8fa3" font-size="12">h</text>
          <text x="336" y="178" fill="#fff" font-size="13">直圓錐</text>
        </svg></div>
        <ul>
          <li><b>直角柱</b>：上下兩個底面是全等的多邊形，側面都是<b>長方形</b>，而且側稜垂直於底面。正方體、長方體都是直四角柱。</li>
          <li><b>直圓柱</b>：上下底面是全等的圓，側面是一個曲面。</li>
          <li><b>正角錐</b>：底面是<b>正多邊形</b>，頂點在底面中心的正上方，側面是<b>全等的等腰三角形</b>。</li>
          <li><b>直圓錐</b>：底面是圓，頂點在圓心的正上方。頂點到底面圓周上任一點的線段叫<b>母線</b> $l$。</li>
        </ul>
        <div class="key"><b>兩種「高」別搞混</b><br>
          錐體的<b>高</b>：頂點到底面的垂直距離。<br>
          正角錐的<b>斜高</b>：側面等腰三角形「底邊上的高」，在側面上量。直圓錐的母線也是斜著量的。<br>
          算側面積時，要用的是<b>斜高</b>和<b>母線</b>。</div>
      ` },

      { type: "concept", title: "柱體的展開圖、表面積與體積", html: `
        <p>把直角柱沿著一條側稜剪開，所有側面攤平後會連成<b>一個大長方形</b>；直圓柱的側面剪開攤平也是長方形。</p>
        <div class="key"><b>柱體的側面展開圖是長方形</b><br>
          長方形的<b>長＝底面周長</b>，<b>寬＝柱體的高</b> $h$<br>
          $$\\text{側面積}=\\text{底面周長}\\times h,\\qquad \\text{表面積}=\\text{側面積}+2\\times\\text{底面積}$$
          $$\\text{體積}=\\text{底面積}\\times h$$</div>
        <div class="table-wrap"><table>
          <tr><th></th><th>側面積</th><th>表面積</th><th>體積</th></tr>
          <tr><th>長方體（長 $a$、寬 $b$、高 $c$）</th><td>$2(a+b)c$</td><td>$2(ab+bc+ca)$</td><td>$abc$</td></tr>
          <tr><th>直圓柱（半徑 $r$、高 $h$）</th><td>$2\\pi r h$</td><td>$2\\pi rh+2\\pi r^2$</td><td>$\\pi r^2h$</td></tr>
        </table></div>
        <p class="note">表面積是「包裝紙」要多大（平方單位）；體積是「裝得下多少」（立方單位）。兩者單位不同，不能混用。</p>
      ` },
      { type: "widget", title: "把柱體一層一層攤開", widget: "prismNet",
        intro: "選一種柱體、調整尺寸，再拖曳「展開程度」（或按 ▶ 自動展開），看側面怎麼攤成一個長方形。",
        caption: "展開到 100% 時，所有側面排成一列：長正好是底面周長，寬就是高。上下兩個底面掛在側面的上方與下方。" },

      { type: "example", title: "例題 1　三角柱的表面積與體積", problem: "一個直三角柱的底面是兩股為 3 公分、4 公分的直角三角形，柱高 10 公分。求它的表面積與體積。（展開圖為示意圖，未按比例）",
        figure: `<svg viewBox="0 0 312 292">
          <rect x="18" y="88" width="88" height="110" fill="rgba(143,208,255,.2)" stroke="#8fd0ff" stroke-width="2"/>
          <rect x="106" y="88" width="66" height="110" fill="rgba(143,208,255,.2)" stroke="#8fd0ff" stroke-width="2"/>
          <rect x="172" y="88" width="110" height="110" fill="rgba(143,208,255,.2)" stroke="#8fd0ff" stroke-width="2"/>
          <polygon points="106,88 172,88 106,0" fill="rgba(246,220,154,.25)" stroke="#f6dc9a" stroke-width="2"/>
          <polygon points="106,198 172,198 106,286" fill="rgba(246,220,154,.25)" stroke="#f6dc9a" stroke-width="2"/>
          <text x="56" y="148" fill="#fff" font-size="14">4</text><text x="133" y="148" fill="#fff" font-size="14">3</text><text x="222" y="148" fill="#fff" font-size="14">5</text>
          <text x="286" y="148" fill="#ff8fa3" font-size="14">10</text>
          <text x="90" y="52" fill="#f6dc9a" font-size="13">4</text>
        </svg>`,
        steps: [
          "斜邊 $=\\sqrt{3^2+4^2}=5$，底面周長 $=3+4+5=12$（公分）。",
          "側面展開是長 12、寬 10 的長方形，側面積 $=12\\times 10=120$（平方公分）。",
          "底面積 $=\\dfrac{1}{2}\\times 3\\times 4=6$，表面積 $=120+2\\times 6=132$（平方公分）。",
          "體積 $=\\text{底面積}\\times\\text{高}=6\\times 10=60$（立方公分）。"
        ],
        answer: "表面積 132 平方公分，體積 60 立方公分" },

      { type: "concept", title: "正方體的 11 種展開圖", html: `
        <p>正方體有 6 個全等的正方形面，但「6 個正方形連在一起」不一定摺得成正方體。真正可以的展開圖<b>只有 11 種</b>（翻轉、旋轉後相同的算同一種）：</p>
        <div class="fig">${elevenFig}</div>
        <div class="key"><b>判斷能不能摺的檢查法</b><br>
          ① <b>同一個頂點周圍不能有 4 個正方形</b>（不能出現「田」字形 $2\\times 2$ 方塊）：正方體每個頂點只有 3 個面。<br>
          ② 一直線上<b>不能連續 5 格以上</b>：繞一圈只有 4 個面，第 5 格會蓋回第 1 格。<br>
          ③ 一直線上<b>隔一格</b>的兩面是<b>相對面</b>；而相對的兩面在展開圖中<b>一定不相鄰</b>（不共用邊）。</div>
        <p class="note">①②只能「排除」一些錯誤的圖，通過了也不保證可以。最可靠的方法是：選一格當底面，在腦中把其他格一格一格摺起來，看看有沒有兩格摺到同一個面。</p>
      ` },
      { type: "widget", title: "展開圖檢查站：摺得起來嗎？", widget: "cubeNet",
        intro: "先點選幾張候選展開圖，再<b>點方格</b>自己增減正方形，排出你的展開圖。檢查站會真的把它「摺一次」並說明理由。",
        caption: "格子上的數字是摺好後的位置（像骰子一樣，相對面的數字和為 7）。出現紅色的兩個相同數字，就表示那兩格會疊在同一面。" },

      { type: "concept", title: "正角錐的展開圖與表面積", html: `
        <p>正 $n$ 角錐的展開圖由 <b>1 個正 $n$ 邊形底面</b>和 <b>$n$ 個全等的等腰三角形</b>側面組成。</p>
        <div class="fig"><svg viewBox="0 0 300 250">
          <rect x="110" y="85" width="80" height="80" fill="rgba(246,220,154,.25)" stroke="#f6dc9a" stroke-width="2"/>
          <polygon points="110,85 190,85 150,15" fill="rgba(143,208,255,.2)" stroke="#8fd0ff" stroke-width="2"/>
          <polygon points="110,165 190,165 150,235" fill="rgba(143,208,255,.2)" stroke="#8fd0ff" stroke-width="2"/>
          <polygon points="110,85 110,165 40,125" fill="rgba(143,208,255,.2)" stroke="#8fd0ff" stroke-width="2"/>
          <polygon points="190,85 190,165 260,125" fill="rgba(143,208,255,.2)" stroke="#8fd0ff" stroke-width="2"/>
          <line x1="150" y1="15" x2="150" y2="85" stroke="#5fd3a8" stroke-width="2.2" stroke-dasharray="5 4"/>
          <path d="M150,77 h8 v8" fill="none" stroke="#fff"/>
          <text x="156" y="52" fill="#5fd3a8" font-size="13">斜高</text>
          <text x="142" y="130" fill="#fff" font-size="13">底面</text>
        </svg></div>
        <div class="key"><b>正角錐</b>（底邊長 $a$、斜高 $s$、底面周長 $=na$）<br>
          $$\\text{側面積}=n\\times\\frac{1}{2}a s=\\frac{1}{2}\\times\\text{底面周長}\\times\\text{斜高}$$
          $$\\text{表面積}=\\text{側面積}+\\text{底面積}$$
          錐體只有<b>一個</b>底面，所以只加一次底面積。</div>
        <p>如果題目給的是錐體的<b>高</b>，要先用畢氏定理求斜高。以正四角錐為例：高、底面中心到底邊的距離（$\\tfrac{a}{2}$）、斜高，正好圍成一個直角三角形，斜高是斜邊。</p>
      ` },

      { type: "example", title: "例題 2　由錐高求正四角錐的表面積", problem: "正四角錐的底面是邊長 6 的正方形，錐高為 4。求它的表面積。",
        figure: `<svg viewBox="0 0 300 200">
          <polygon points="40,170 200,170 260,130 100,130" fill="rgba(246,220,154,.18)" stroke="#f6dc9a" stroke-width="2"/>
          <line x1="40" y1="170" x2="150" y2="30" stroke="#8fd0ff" stroke-width="2"/><line x1="200" y1="170" x2="150" y2="30" stroke="#8fd0ff" stroke-width="2"/><line x1="260" y1="130" x2="150" y2="30" stroke="#8fd0ff" stroke-width="2"/><line x1="100" y1="130" x2="150" y2="30" stroke="#8fd0ff" stroke-width="1.5" stroke-dasharray="5 4"/>
          <line x1="150" y1="30" x2="150" y2="150" stroke="#ff8fa3" stroke-width="2" stroke-dasharray="5 4"/>
          <line x1="150" y1="150" x2="120" y2="170" stroke="#fff" stroke-width="1.6"/>
          <line x1="150" y1="30" x2="120" y2="170" stroke="#5fd3a8" stroke-width="2.4"/>
          <circle cx="150" cy="150" r="3" fill="#fff"/>
          <text x="156" y="100" fill="#ff8fa3" font-size="13">高 4</text>
          <text x="140" y="186" fill="#fff" font-size="13">3</text>
          <text x="82" y="100" fill="#5fd3a8" font-size="13">斜高</text>
          <text x="70" y="190" fill="#f6dc9a" font-size="13">底邊 6</text>
        </svg>`,
        steps: [
          "底面中心到底邊的距離是邊長的一半：$6\\div 2=3$。",
          "高 4、距離 3、斜高圍成直角三角形，斜高 $=\\sqrt{4^2+3^2}=\\sqrt{25}=5$。",
          "側面積 $=4\\times\\dfrac{1}{2}\\times 6\\times 5=60$。",
          "底面積 $=6\\times 6=36$，表面積 $=60+36=96$。"
        ],
        answer: "表面積為 96（注意：側面三角形的高要用斜高 5，不是錐高 4）" },

      { type: "concept", title: "直圓錐的展開圖：扇形", html: `
        <p>把直圓錐沿著一條母線剪開攤平，側面會變成一個<b>扇形</b>；底面仍是一個圓。</p>
        <div class="key"><b>直圓錐</b>（底面半徑 $r$、母線長 $l$）<br>
          • 扇形的<b>半徑＝母線長 $l$</b><br>
          • 扇形的<b>弧長＝底面圓周長 $2\\pi r$</b>（摺回去時，弧剛好繞底面一圈）<br>
          • 扇形的<b>圓心角</b>：$2\\pi l\\times\\dfrac{\\theta}{360}=2\\pi r$，所以 $\\theta=360^\\circ\\times\\dfrac{r}{l}$</div>
        <p><b>側面積怎麼來？</b>扇形面積 $=\\pi l^2\\times\\dfrac{\\theta}{360}$，而 $\\dfrac{\\theta}{360}=\\dfrac{r}{l}$，所以</p>
        $$\\text{側面積}=\\pi l^2\\times\\frac{r}{l}=\\pi r l$$
        <p>也可以用「扇形面積 $=\\dfrac{1}{2}\\times\\text{弧長}\\times\\text{半徑}$」：$\\dfrac{1}{2}\\times 2\\pi r\\times l=\\pi rl$，答案一樣。</p>
        <div class="key">$$\\text{直圓錐表面積}=\\pi rl+\\pi r^2$$</div>
        <p class="note">因為母線 $l$ 一定比底面半徑 $r$ 長，所以 $\\dfrac{r}{l}<1$，扇形的圓心角一定小於 $360^\\circ$。</p>
      ` },
      { type: "widget", title: "調整 r 與 l，看扇形怎麼變", widget: "coneNet",
        intro: "拉動滑桿改變底面半徑 $r$ 和母線長 $l$（$l$ 必須大於 $r$）。左邊是展開圖，右上角是摺好的圓錐。",
        caption: "金色的弧長永遠等於底面圓周 $2\\pi r$。$r$ 越接近 $l$，扇形越接近一整個圓，圓錐也越扁。" },

      { type: "example", title: "例題 3　圓錐的展開圖與表面積", problem: "直圓錐的底面半徑 $r=3$ 公分、母線長 $l=5$ 公分。求展開圖中扇形的圓心角、側面積與表面積。（用 $\\pi$ 表示）",
        figure: coneNetFig(3, 5, 22, 300),
        steps: [
          "扇形半徑＝母線 5，弧長＝底面圓周 $2\\pi\\times 3=6\\pi$。",
          "圓心角 $=360^\\circ\\times\\dfrac{3}{5}=216^\\circ$。",
          "側面積 $=\\pi rl=\\pi\\times 3\\times 5=15\\pi$（平方公分）。（檢查：$\\pi\\times 5^2\\times\\dfrac{216}{360}=25\\pi\\times\\dfrac{3}{5}=15\\pi$）",
          "表面積 $=15\\pi+\\pi\\times 3^2=15\\pi+9\\pi=24\\pi$（平方公分）。"
        ],
        answer: "圓心角 $216^\\circ$，側面積 $15\\pi$ 平方公分，表面積 $24\\pi$ 平方公分" },

      { type: "myth", title: "破解{boss}的幻術", items: [
        { wrong: "只要 6 個正方形連在一起，就能摺成正方體。", right: "只有 11 種排法可以。「田」字形、一排 5 格、兩個蓋子摺到同一面，都摺不起來。", why: "要真的在腦中摺：選一格當底，其他格依序摺起，不能有兩格疊在同一面。" },
        { wrong: "正四角錐的側面積 $=4\\times\\dfrac{1}{2}\\times\\text{底邊}\\times\\text{錐高}$。", right: "要用<b>斜高</b>（側面三角形的高），不是錐高。", why: "錐高藏在錐體內部，不在側面上；斜高 $=\\sqrt{\\text{錐高}^2+(\\tfrac{\\text{底邊}}{2})^2}$，一定比錐高長。" },
        { wrong: "圓錐側面攤開的扇形，半徑就是底面半徑 $r$。", right: "扇形的半徑是<b>母線長 $l$</b>；底面半徑 $r$ 決定的是扇形的<b>弧長</b> $2\\pi r$。", why: "扇形的兩條半徑摺起來後就是圓錐的母線；弧則繞成底面的圓周。" },
        { wrong: "圓柱的表面積就是 $2\\pi rh$。", right: "$2\\pi rh$ 只是<b>側面積</b>；表面積還要加上兩個底面：$2\\pi rh+2\\pi r^2$。", why: "柱體有兩個底面，錐體只有一個。算表面積前，先數一數展開圖有幾塊。" }
      ] },

      { type: "practice", title: "即時練習", items: [
        { q: "長 3 公分、寬 4 公分、高 5 公分的長方體，表面積是多少平方公分？", answer: ["94"], show: "94", hint: "三組相對的面：$3\\times4$、$4\\times5$、$3\\times5$，每組各兩片。", ex: "$2(3\\times 4+4\\times 5+3\\times 5)=2(12+20+15)=94$。" },
        { q: "底面半徑 3、高 7 的直圓柱，側面積是多少 $\\pi$？（只填 $\\pi$ 前面的數）", answer: ["42"], show: "$42\\pi$", ex: "側面展開是長方形：長＝底面周長 $6\\pi$，寬＝7，側面積 $=6\\pi\\times 7=42\\pi$。" },
        { q: "直三角柱的底面三角形底邊 6、高 4，柱高 9，體積是多少？", answer: ["108"], show: "108", ex: "底面積 $=\\dfrac{1}{2}\\times 6\\times 4=12$，體積 $=12\\times 9=108$。" },
        { q: `下面四張圖中，哪一張<b>不能</b>摺成正方體？${quizNets}`, o: ["丙", "甲", "乙", "丁"], a: 0, ex: "丙：下排一直線 4 格繞成一圈，上面兩格分別接在第 1、3 格上；第 1、3 格是相對面，接在它們同一側的兩格摺起來會變成同一個面，於是重疊，而對面那一面就缺了。甲是 1-4-1 型、乙是 3-3 型、丁是 2-2-2 型，都可以。" },
        { q: "正四角錐的底面邊長 8，斜高 5，表面積是多少？", answer: ["144"], show: "144", ex: "側面積 $=4\\times\\dfrac{1}{2}\\times 8\\times 5=80$，底面積 $=64$，表面積 $=80+64=144$。" },
        { q: "正四角錐的底面邊長 6，<b>錐高</b> 4，側面積是多少？", answer: ["60"], show: "60", hint: "先用畢氏定理求斜高。", ex: "斜高 $=\\sqrt{4^2+3^2}=5$，側面積 $=4\\times\\dfrac{1}{2}\\times 6\\times 5=60$。" },
        { q: "直圓錐的底面半徑 4、母線長 10，展開圖中扇形的圓心角是幾度？", answer: ["144"], show: "$144^\\circ$", ex: "$\\theta=360^\\circ\\times\\dfrac{r}{l}=360^\\circ\\times\\dfrac{4}{10}=144^\\circ$。" },
        { q: "直圓錐的底面半徑 2、母線長 6，表面積是多少？", o: ["$16\\pi$", "$12\\pi$", "$40\\pi$", "$24\\pi$"], a: 0, ex: "側面積 $=\\pi\\times 2\\times 6=12\\pi$，底面積 $=4\\pi$，表面積 $=12\\pi+4\\pi=16\\pi$。只算 $12\\pi$ 就忘了底面。" }
      ] },

      { type: "summary", title: "重點整理", items: [
        "柱體的側面展開是長方形：長＝底面周長、寬＝高；側面積＝底面周長×高。",
        "柱體表面積＝側面積＋$2\\times$底面積；直角柱（及直圓柱）體積＝底面積×高。",
        "正方體展開圖只有 11 種；同一頂點周圍不能有 4 個正方形，一直線上隔一格的兩面是相對面。",
        "正角錐的側面是全等的等腰三角形：側面積＝$\\dfrac{1}{2}$×底面周長×<b>斜高</b>；表面積＝側面積＋底面積。",
        "直圓錐側面展開是扇形：半徑＝母線 $l$，弧長＝$2\\pi r$，圓心角＝$360^\\circ\\times\\dfrac{r}{l}$。",
        "直圓錐側面積＝$\\pi rl$，表面積＝$\\pi rl+\\pi r^2$。"
      ], formula: "$$\\text{柱：}S=\\text{周長}\\times h+2B,\\ V=Bh\\qquad \\text{圓錐：}S=\\pi rl+\\pi r^2$$" },

      { type: "extend", title: "高中延伸：錐體的體積", where: "高三 選修數學甲 ・ 積分（國中課綱不含錐體體積）", html: `
        <p>國中只學<b>柱體</b>的體積。錐體的體積公式不在國中課綱裡，但你可以先看看它長什麼樣子：</p>
        <div class="key">$$\\text{錐體體積}=\\frac{1}{3}\\times\\text{底面積}\\times\\text{高}$$
          也就是：同底、同高的柱體體積的 $\\dfrac{1}{3}$。</div>
        <h3>1. 為什麼是 $\\frac{1}{3}$？一個直觀的例子</h3>
        <div class="fig">${cubeSplitFig}</div>
        <p>取邊長為 $a$ 的正方體，選一個頂點 $V$。不含 $V$ 的面有 3 個（圖中著色的右面、後面、底面）。以 $V$ 為頂點、分別以這 3 個面為底，可以做出 3 個四角錐。它們<b>形狀完全相同</b>（全等），而且剛好把正方體<b>填滿、不重疊</b>。</p>
        <p>所以每個四角錐的體積 $=\\dfrac{a^3}{3}=\\dfrac{1}{3}\\times a^2\\times a=\\dfrac{1}{3}\\times\\text{底面積}\\times\\text{高}$。（這 3 個四角錐的頂點在底面一角的正上方，不是正四角錐，但公式一樣成立。）</p>
        <p>這只是一個特例。對任意的錐體（包含圓錐），要嚴謹證明「$\\frac{1}{3}$」，一種常見的作法是用高三<b>選修數學甲</b>的<b>積分</b>：把錐體切成許多薄片，再把薄片的體積累加起來。</p>
        <h3>2. 試試看</h3>
        <p>直圓錐的底面半徑 $r=3$、高 $h=4$：</p>
        $$V=\\frac{1}{3}\\times\\pi\\times 3^2\\times 4=12\\pi$$
        <p>回到本課：高 4、半徑 3、母線圍成直角三角形，所以母線 $l=\\sqrt{3^2+4^2}=5$，側面積 $=\\pi\\times 3\\times 5=15\\pi$，表面積 $=15\\pi+9\\pi=24\\pi$——正好就是例題 3 的那個圓錐！</p>
      ` }
    ],

    /* ================= 互動圖 ================= */
    widgets: {
      /* 1. 柱體展開：三角柱／四角柱／圓柱 */
      prismNet(stage, H) {
        const top = H.row(stage);
        const svg = H.svg(stage, 480, 330);
        const gFaces = H.el("g", {}, svg), gLab = H.el("g", {}, svg);
        const dims = H.row(stage), ctl = H.row(stage);
        const out = H.readout(stage);
        let shape = 0, D = {}, t = 0, fit = null, tInp = null, anim = 0;

        const poly = () => {
          if (shape === 0) return [[0, 0], [D.a, 0], [0, D.b]];
          if (shape === 1) return [[0, 0], [D.a, 0], [D.a, D.b], [0, D.b]];
          const N = 48, pts = [];
          for (let i = 0; i < N; i++) { const q = -Math.PI / 2 - Math.PI / N + 2 * Math.PI * i / N; pts.push([D.r * Math.cos(q), D.r * Math.sin(q)]); }
          const o = pts[0]; return pts.map(p => [p[0] - o[0], p[1] - o[1]]);
        };
        /* 側面依序攤平：第 0 面固定，其餘面的方向角按 (1−t) 縮小 */
        const build = (P, h, t) => {
          const n = P.length, len = [], U = [];
          for (let i = 0; i < n; i++) { const A = P[i], B = P[(i + 1) % n]; len.push(Math.hypot(B[0] - A[0], B[1] - A[1])); const g = Math.atan2(B[1] - A[1], B[0] - A[0]); if (i === 0) U.push(g); else { let d = g - (U[i - 1] % (2 * Math.PI)); d = ((d % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI); U.push(U[i - 1] + d); } }
          const half = Math.floor(n / 2), faces = [];
          faces[0] = [P[0], P[1]];
          let X = P[1];
          for (let m = 1; m <= half; m++) { const f = (1 - t) * U[m]; const Y = [X[0] + len[m] * Math.cos(f), X[1] + len[m] * Math.sin(f)]; faces[m] = [X, Y]; X = Y; }
          X = P[0];
          for (let m = n - 1; m > half; m--) { const f = (1 - t) * (U[m] - 2 * Math.PI); const Y = [X[0] - len[m] * Math.cos(f), X[1] - len[m] * Math.sin(f)]; faces[m] = [Y, X]; X = Y; }
          const ph = t * Math.PI / 2;
          const bot = P.map(([x, y]) => [x, y * Math.cos(ph), -y * Math.sin(ph)]);
          const tp = P.map(([x, y]) => [x, y * Math.cos(ph), h + y * Math.sin(ph)]);
          const lat = faces.map(([A, B], i) => ({ i, pts: [[A[0], A[1], 0], [B[0], B[1], 0], [B[0], B[1], h], [A[0], A[1], h]], depth: (A[1] + B[1]) / 2, nx: B[1] - A[1], ny: -(B[0] - A[0]) }));
          return { lat, bot, tp, half, n };
        };
        const proj = p => [p[0] + p[1] * 0.55, -p[2] - p[1] * 0.38];
        const height = () => D.h;
        const refit = () => {
          const P = poly(); let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
          for (const tt of [0, 0.25, 0.5, 0.75, 1]) { const g = build(P, height(), tt); [...g.lat.flatMap(f => f.pts), ...g.bot, ...g.tp].forEach(p => { const [X, Y] = proj(p); x0 = Math.min(x0, X); x1 = Math.max(x1, X); y0 = Math.min(y0, Y); y1 = Math.max(y1, Y); }); }
          const s = Math.min(440 / (x1 - x0), 280 / (y1 - y0));
          fit = { s, ox: 240 - s * (x0 + x1) / 2, oy: 158 - s * (y0 + y1) / 2 };
        };
        const S = p => { const [X, Y] = proj(p); return [fit.ox + fit.s * X, fit.oy + fit.s * Y]; };
        const pstr = pts => pts.map(p => S(p).map(v => v.toFixed(1)).join(",")).join(" ");

        const draw = () => {
          if (!fit) return;
          gFaces.innerHTML = ""; gLab.innerHTML = "";
          const P = poly(), h = height(), g = build(P, h, t);
          const cyl = shape === 2;
          const baseStyle = { fill: cyl ? "rgba(246,220,154,.85)" : "rgba(246,220,154,.5)", stroke: "#f6dc9a", "stroke-width": 2 };
          H.el("polygon", Object.assign({ points: pstr(g.bot) }, baseStyle), gFaces);
          g.lat.slice().sort((A, B) => B.depth - A.depth).forEach(f => {
            if (cyl) {
              const L = Math.hypot(f.nx, f.ny) || 1, light = 0.55 + 0.4 * Math.max(0, (-f.ny * 0.5 + f.nx * 0.6) / L * -1 + 0.3);
              const c = `rgb(${Math.round(70 + 73 * light)},${Math.round(110 + 98 * light)},${Math.round(150 + 105 * light)})`;
              H.el("polygon", { points: pstr(f.pts), fill: c, stroke: c, "stroke-width": 0.8 }, gFaces);
            } else {
              H.el("polygon", { points: pstr(f.pts), fill: "rgba(143,208,255,.30)", stroke: "#8fd0ff", "stroke-width": 2, "stroke-linejoin": "round" }, gFaces);
            }
          });
          if (cyl) {
            const order = [];
            for (let m = g.n - 1; m > g.half; m--) order.unshift(m);
            const seq = [...order, ...Array.from({ length: g.half + 1 }, (_, i) => i)];
            const bottomPts = [g.lat[seq[0]].pts[0], ...seq.map(m => g.lat[m].pts[1])];
            const topPts = bottomPts.map(p => [p[0], p[1], h]);
            H.el("polyline", { points: pstr(bottomPts), fill: "none", stroke: "#8fd0ff", "stroke-width": 2 }, gFaces);
            H.el("polyline", { points: pstr(topPts), fill: "none", stroke: "#8fd0ff", "stroke-width": 2 }, gFaces);
            if (t > 0.02) [bottomPts[0], bottomPts[bottomPts.length - 1]].forEach(p => H.el("polyline", { points: pstr([p, [p[0], p[1], h]]), fill: "none", stroke: "#8fd0ff", "stroke-width": 2 }, gFaces));
          }
          H.el("polygon", Object.assign({ points: pstr(g.tp) }, baseStyle), gFaces);
          /* 完全攤平時標出長與寬 */
          if (t > 0.97) {
            let xmax = -1e9; g.lat.forEach(f => f.pts.forEach(p => { xmax = Math.max(xmax, p[0]); }));
            let xmin = 1e9; g.lat.forEach(f => f.pts.forEach(p => { xmin = Math.min(xmin, p[0]); }));
            const per = cyl ? null : g.lat.reduce((t, f) => t + Math.abs(f.pts[1][0] - f.pts[0][0]), 0);
            const [lx, ly] = S([(xmin + xmax) / 2, 0, h * 0.22]);
            H.el("text", { x: lx, y: ly + 5, "text-anchor": "middle", style: "fill:#fff;font-size:15px;font-weight:700", text: (fit.s * (xmax - xmin) > 230 ? "←  長 = 底面周長 = " : "長 = ") + (cyl ? H.fmt(2 * D.r, 2) + "π" : H.fmt(per, 2)) + (fit.s * (xmax - xmin) > 230 ? "  →" : "") }, gLab);
            if (!cyl) g.lat.forEach(f => { const w = Math.abs(f.pts[1][0] - f.pts[0][0]); const [fx, fy] = S([(f.pts[0][0] + f.pts[1][0]) / 2, 0, h * 0.78]); H.el("text", { x: fx, y: fy + 5, "text-anchor": "middle", style: "fill:#8fd0ff;font-size:14px", text: H.fmt(w, 2) }, gLab); });
            const [rx, ry] = S([xmax, 0, h / 2]);
            H.el("text", { x: Math.min(rx + 8, 470), y: ry + 5, "text-anchor": rx + 8 > 420 ? "end" : "start", style: "fill:#ff8fa3;font-size:15px;font-weight:700", text: "寬 = 高 " + D.h }, gLab);
          }
          readout();
        };

        const n2 = x => H.fmt(x, 2);
        const readout = () => {
          const pct = Math.round(t * 100), tag = `<span class="tag">展開 ${pct}%</span> `;
          if (shape === 0) {
            const { a, b, h } = D, c = Math.hypot(a, b), ci = Math.abs(c - Math.round(c)) < 1e-9;
            const per = a + b + c, base = a * b / 2, lat = per * h, tot = lat + 2 * base;
            const eq = ci ? "=" : "\\approx";
            out.set(`${tag}斜邊 $=\\sqrt{${a}^2+${b}^2}${eq}${n2(c)}$，底面周長 $${eq}${n2(per)}$<br>側面積 $=\\text{周長}\\times h${eq}${n2(per)}\\times ${h}${eq}${n2(lat)}$，底面積 $=\\tfrac{1}{2}\\times${a}\\times${b}=${n2(base)}$<br>表面積 $=\\text{側面積}+2\\times\\text{底面積}${eq}$ <span class="big">${n2(tot)}</span>　體積 $=\\text{底面積}\\times h=${n2(base * h)}$`);
          } else if (shape === 1) {
            const { a, b, h } = D, per = 2 * (a + b), base = a * b, lat = per * h;
            out.set(`${tag}底面周長 $=2(${a}+${b})=${per}$<br>側面積 $=${per}\\times ${h}=${lat}$，底面積 $=${a}\\times${b}=${base}$<br>表面積 $=${lat}+2\\times${base}=$ <span class="big">${lat + 2 * base}</span>　體積 $=${base}\\times${h}=${base * h}$`);
          } else {
            const { r, h } = D, lat = 2 * r * h, base = r * r;
            out.set(`${tag}底面周長 $=2\\pi\\times${r}=${n2(2 * r)}\\pi$<br>側面積 $=${n2(2 * r)}\\pi\\times${h}=${n2(lat)}\\pi$，底面積 $=\\pi\\times${r}^2=${n2(base)}\\pi$<br>表面積 $=${n2(lat)}\\pi+2\\times${n2(base)}\\pi=$ <span class="big">${n2(lat + 2 * base)}π</span> $\\approx ${n2((lat + 2 * base) * Math.PI)}$　體積 $=${n2(base)}\\pi\\times${h}=${n2(base * h)}\\pi$`);
          }
        };

        const specs = [
          [["a", "直角邊 a", 1, 6, 3], ["b", "直角邊 b", 1, 6, 4], ["h", "柱高 h", 1, 8, 5]],
          [["a", "長 a", 1, 6, 4], ["b", "寬 b", 1, 6, 3], ["h", "高 h", 1, 8, 5]],
          [["r", "半徑 r", 1, 4, 2], ["h", "高 h", 1, 8, 5]]
        ];
        H.toggle(top, ["三角柱（直角三角形底）", "四角柱（長方體）", "圓柱"], k => {
          shape = k; dims.innerHTML = ""; D = {};
          specs[k].forEach(([key, label, mn, mx, v]) => { D[key] = v; H.slider(dims, { label, min: mn, max: mx, step: k === 2 && key === "r" ? 0.5 : 1, value: v }, x => { D[key] = x; refit(); draw(); }); });
          refit(); draw();
        });
        tInp = H.slider(ctl, { label: "展開程度", min: 0, max: 100, step: 1, value: 0, fmt: v => v + "%" }, v => { if (!anim) t = v / 100; draw(); });
        H.button(ctl, "▶ 自動展開", () => {
          cancelAnimationFrame(anim); const t0 = performance.now(), from = t >= 0.999 ? 0 : t;
          const step = now => { const k = Math.min(1, (now - t0) / 1800); t = from + (1 - from) * (k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2); tInp.value = Math.round(t * 100); tInp.nextElementSibling.textContent = Math.round(t * 100) + "%"; draw(); if (k < 1) anim = requestAnimationFrame(step); else anim = 0; };
          anim = requestAnimationFrame(step); H.sfx("page");
        });
      },

      /* 2. 圓錐展開圖：扇形 */
      coneNet(stage, H) {
        const svg = H.svg(stage, 480, 330);
        const sector = H.el("path", { fill: "rgba(143,208,255,.22)", stroke: "#8fd0ff", "stroke-width": 2 }, svg);
        const arc = H.el("path", { fill: "none", stroke: "#f6dc9a", "stroke-width": 4, "stroke-linecap": "round" }, svg);
        const base = H.el("circle", { fill: "rgba(246,220,154,.2)", stroke: "#f6dc9a", "stroke-width": 2 }, svg);
        const rad = H.el("line", { stroke: "#ff8fa3", "stroke-width": 2.2 }, svg);
        const ang = H.el("path", { fill: "none", stroke: "#fff", "stroke-width": 1.5 }, svg);
        const apex = H.el("circle", { r: 4, fill: "#fff" }, svg);
        const tL = H.el("text", { style: "fill:#8fd0ff" }, svg), tR = H.el("text", { style: "fill:#ff8fa3" }, svg), tT = H.el("text", {}, svg), tA = H.el("text", { style: "fill:#f6dc9a;font-size:13px" }, svg);
        /* 右上角：摺好的圓錐 */
        const cg = H.el("g", {}, svg);
        H.el("rect", { x: 352, y: 8, width: 120, height: 150, rx: 12, fill: "rgba(255,255,255,.05)", stroke: "rgba(255,255,255,.15)" }, svg);
        svg.appendChild(cg);
        const out = H.readout(stage);
        let r = 3, l = 5, lInp = null;
        const draw = () => {
          if (r >= l) { l = r + 0.5; if (lInp) { lInp.value = l; lInp.nextElementSibling.textContent = H.fmt(l); } }
          const th = 360 * r / l, a = th / 2 * Math.PI / 180;
          /* 以 l=1 的單位算外框，再縮放進左側 0~340 區域 */
          const pts = [[0, 0]];
          for (let i = 0; i <= 60; i++) { const b = -a + 2 * a * i / 60; pts.push([Math.sin(b) * l, Math.cos(b) * l]); }
          pts.push([-r, l + r], [r, l + 2 * r], [r, l]);
          const x0 = Math.min(...pts.map(p => p[0])), x1 = Math.max(...pts.map(p => p[0])), y0 = Math.min(...pts.map(p => p[1])), y1 = Math.max(...pts.map(p => p[1]));
          const k = Math.min(320 / (x1 - x0), 300 / (y1 - y0));
          const ox = 172 - k * (x0 + x1) / 2, oy = 165 - k * (y0 + y1) / 2;
          const T = ([x, y]) => [ox + k * x, oy + k * y];
          const A = T([0, 0]), P1 = T([-Math.sin(a) * l, Math.cos(a) * l]), P2 = T([Math.sin(a) * l, Math.cos(a) * l]), C = T([0, l + r]);
          const big = th > 180 ? 1 : 0, R = k * l;
          H.set(sector, { d: `M${A[0]},${A[1]} L${P1[0]},${P1[1]} A${R},${R} 0 ${big} 0 ${P2[0]},${P2[1]} Z` });
          H.set(arc, { d: `M${P1[0]},${P1[1]} A${R},${R} 0 ${big} 0 ${P2[0]},${P2[1]}` });
          H.set(base, { cx: C[0], cy: C[1], r: k * r });
          H.set(rad, { x1: C[0], y1: C[1], x2: C[0] + k * r, y2: C[1] });
          H.set(apex, { cx: A[0], cy: A[1] });
          const ar = Math.min(26, R * 0.3);
          const Q1 = [A[0] - ar * Math.sin(a), A[1] + ar * Math.cos(a)], Q2 = [A[0] + ar * Math.sin(a), A[1] + ar * Math.cos(a)];
          H.set(ang, { d: `M${Q1[0]},${Q1[1]} A${ar},${ar} 0 ${big} 0 ${Q2[0]},${Q2[1]}` });
          const mid = [A[0] + (P2[0] - A[0]) * 0.55, A[1] + (P2[1] - A[1]) * 0.55];
          H.set(tL, { x: mid[0] + (th > 180 ? -10 : 8), y: mid[1] + (th > 180 ? 22 : -4), text: "l = " + H.fmt(l) });
          H.set(tR, { x: C[0] + 6, y: C[1] - 8, text: "r = " + H.fmt(r) });
          H.set(tT, { x: A[0], y: A[1] + ar + 18, "text-anchor": "middle", text: H.fmt(th) + "°" });
          const bottomArc = T([0, l]);
          H.set(tA, { x: bottomArc[0], y: bottomArc[1] - 10, "text-anchor": "middle", text: "弧長 = 2πr" });
          /* 立體圓錐示意 */
          const hgt = Math.sqrt(l * l - r * r), s2 = 100 / Math.max(l, 2 * r * 0.95);
          const cx = 412, by = 18 + Math.min(hgt * s2, 110) + 8, rr = r * s2, ry = rr * 0.3, ay = by - hgt * s2;
          cg.innerHTML = "";
          H.el("path", { d: `M${cx - rr},${by} L${cx},${ay} L${cx + rr},${by} A${rr},${ry} 0 0 1 ${cx - rr},${by} Z`, fill: "rgba(143,208,255,.22)", stroke: "#8fd0ff", "stroke-width": 1.8 }, cg);
          H.el("path", { d: `M${cx - rr},${by} A${rr},${ry} 0 0 1 ${cx + rr},${by}`, fill: "none", stroke: "#8fd0ff", "stroke-width": 1.2, "stroke-dasharray": "4 3" }, cg);
          H.el("line", { x1: cx, y1: ay, x2: cx, y2: by, stroke: "#fff", "stroke-width": 1, "stroke-dasharray": "3 3" }, cg);
          H.el("line", { x1: cx, y1: by, x2: cx + rr, y2: by, stroke: "#ff8fa3", "stroke-width": 2 }, cg);
          H.el("text", { x: cx + rr / 2 + 6, y: (ay + by) / 2, style: "fill:#8fd0ff;font-size:12px", text: "l" }, cg);
          H.el("text", { x: cx + rr / 2 - 4, y: by + ry + 14, style: "fill:#ff8fa3;font-size:12px", text: "r" }, cg);
          H.el("text", { x: 412, y: 152, "text-anchor": "middle", style: "font-size:11px;fill:#cdc5ff", text: "摺好的圓錐" }, cg);
          const rl = r * l, tot = rl + r * r, thEx = Math.abs(th * 10 - Math.round(th * 10)) < 1e-9;
          out.set(`<span class="tag">圓心角 ${H.fmt(th)}°</span> $\\theta=360^\\circ\\times\\dfrac{r}{l}=360^\\circ\\times\\dfrac{${H.fmt(r)}}{${H.fmt(l)}}${thEx ? "=" : "\\approx"}${H.fmt(th)}^\\circ$<br>扇形半徑 $=l=${H.fmt(l)}$，弧長 $=2\\pi r=${H.fmt(2 * r)}\\pi$<br>側面積 $=\\pi rl=${H.fmt(rl, 2)}\\pi$，表面積 $=\\pi rl+\\pi r^2=$ <span class="big">${H.fmt(tot, 2)}π</span> $\\approx ${H.fmt(tot * Math.PI, 2)}$`);
        };
        const row = H.row(stage);
        H.slider(row, { label: "底面半徑 r", min: 1, max: 6, step: 0.5, value: r, fmt: v => H.fmt(v) }, v => { r = v; draw(); });
        lInp = H.slider(row, { label: "母線長 l", min: 1.5, max: 12, step: 0.5, value: l, fmt: v => H.fmt(v) }, v => { l = v; draw(); });
      },

      /* 3. 正方體展開圖檢查站 */
      cubeNet(stage, H) {
        const COLS = 6, ROWS = 4, U = 46, X0 = (320 - COLS * U) / 2, Y0 = 16;
        const tg = H.row(stage);
        const svg = H.svg(stage, 320, 216);
        const out = H.readout(stage);
        const grid = [];
        const presets = [
          ["1-4-1 型", "X.../XXXX/..X."], ["3-3 型", "XXX../..XXX"], ["2-2-2 型", "XX../.XX./..XX"],
          ["田字形", "XXXX/XX.."], ["一排五格", "XXXXX/X...."], ["兩個蓋子同一側", "X.X./XXXX"]
        ];
        const on = new Set();
        const cellsG = H.el("g", {}, svg), numG = H.el("g", {}, svg);
        for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
          const rect = H.el("rect", { x: X0 + c * U + 2, y: Y0 + r * U + 2, width: U - 4, height: U - 4, rx: 6, fill: "rgba(255,255,255,.04)", stroke: "rgba(255,255,255,.18)", "stroke-dasharray": "4 4", style: "cursor:pointer" }, cellsG);
          rect.addEventListener("click", () => { const k = c + "," + r; on.has(k) ? on.delete(k) : on.add(k); H.sfx("tab"); judge(); });
          grid.push({ c, r, rect });
        }
        const load = pat => {
          on.clear(); const cs = []; pat.split("/").forEach((row, r) => [...row].forEach((ch, c) => { if (ch === "X") cs.push([c, r]); }));
          const w = Math.max(...cs.map(p => p[0])) + 1, h = Math.max(...cs.map(p => p[1])) + 1;
          const dc = Math.floor((COLS - w) / 2), dr = Math.floor((ROWS - h) / 2);
          cs.forEach(([c, r]) => on.add((c + dc) + "," + (r + dr)));
          judge();
        };
        const neg = v => v.map(x => -x);
        const DICE = { "0,0,-1": 1, "0,0,1": 6, "1,0,0": 3, "-1,0,0": 4, "0,1,0": 2, "0,-1,0": 5 };
        const PAIR = { 1: 0, 6: 0, 2: 1, 5: 1, 3: 2, 4: 2 };
        const PCOL = [["rgba(246,220,154,.45)", "#f6dc9a"], ["rgba(143,208,255,.45)", "#8fd0ff"], ["rgba(95,211,168,.45)", "#5fd3a8"]];
        const judge = () => {
          numG.innerHTML = "";
          const list = [...on].map(k => k.split(",").map(Number)).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
          const idx = new Map(list.map((p, i) => [p.join(","), i]));
          /* 摺疊模擬：以第一格為底面，往四個方向摺 */
          const fr = new Array(list.length);
          if (list.length) {
            fr[0] = { n: [0, 0, -1], e: [1, 0, 0], u: [0, 1, 0] }; const q = [0];
            while (q.length) {
              const i = q.shift(), [c, r] = list[i], f = fr[i];
              [[1, 0, f => ({ n: f.e, e: neg(f.n), u: f.u })], [-1, 0, f => ({ n: neg(f.e), e: f.n, u: f.u })], [0, -1, f => ({ n: f.u, u: neg(f.n), e: f.e })], [0, 1, f => ({ n: neg(f.u), u: f.n, e: f.e })]].forEach(([dc, dr, g]) => {
                const j = idx.get((c + dc) + "," + (r + dr)); if (j !== undefined && !fr[j]) { fr[j] = g(f); q.push(j); }
              });
            }
          }
          const connected = list.length > 0 && fr.every(Boolean);
          const face = fr.map(f => f ? DICE[f.n.join(",")] : 0);
          const count = {}; face.forEach(d => count[d] = (count[d] || 0) + 1);
          const ok = list.length === 6 && connected && Object.keys(count).length === 6;
          /* 規則檢查 */
          const has = (c, r) => on.has(c + "," + r);
          const block = list.some(([c, r]) => has(c + 1, r) && has(c, r + 1) && has(c + 1, r + 1));
          let run = false; list.forEach(([c, r]) => { let k = 0; while (has(c + k, r)) k++; if (k >= 5) run = true; k = 0; while (has(c, r + k)) k++; if (k >= 5) run = true; });
          grid.forEach(g => {
            const k = g.c + "," + g.r, i = idx.get(k);
            if (i === undefined) { H.set(g.rect, { fill: "rgba(255,255,255,.04)", stroke: "rgba(255,255,255,.18)", "stroke-dasharray": "4 4", "stroke-width": 1 }); return; }
            const d = face[i], bad = connected && count[d] > 1;
            const col = !connected ? ["rgba(205,197,255,.35)", "#cdc5ff"] : bad ? ["rgba(255,143,163,.55)", "#ff8fa3"] : PCOL[PAIR[d]];
            H.set(g.rect, { fill: col[0], stroke: col[1], "stroke-dasharray": "", "stroke-width": 2 });
            if (connected) H.el("text", { x: X0 + g.c * U + U / 2, y: Y0 + g.r * U + U / 2 + 6, "text-anchor": "middle", style: `font-size:18px;font-weight:700;fill:${bad ? "#fff" : "#fff"};pointer-events:none`, text: d }, numG);
          });
          let msg;
          if (list.length !== 6) msg = `<span class="tag">${list.length} 格</span> 正方體有 6 個面，展開圖要<b>恰好 6 個</b>正方形（點方格可以增減）。`;
          else if (!connected) msg = `<span class="tag">沒連好</span> 有正方形沒有用<b>一整條邊</b>和其他格相連，無法摺。`;
          else if (ok) msg = `<span class="tag">✔ 摺得起來</span> 6 格摺完剛好是 6 個不同的面！同色的兩格是<b>相對面</b>：1 對 6、2 對 5、3 對 4（相對面在圖上都不相鄰）。`;
          else {
            const dup = Object.keys(count).filter(d => count[d] > 1);
            const why = [];
            if (block) why.push("有 4 個正方形圍著同一個頂點（「田」字形）；正方體每個頂點只有 3 個面");
            if (run) why.push("一直線上連續 5 格；繞一圈只有 4 個面，第 5 格會蓋回第 1 格");
            if (!why.length) why.push(`紅色格子摺起來都會變成 ${dup.join("、")} 號面`);
            msg = `<span class="tag">✘ 摺不起來</span> ${why.join("；")}。於是有面<b>疊在一起</b>（紅色的 ${dup.join("、")} 號重複），也就少了別的面。`;
          }
          out.set(msg);
        };
        H.toggle(tg, presets.map(p => p[0]), k => load(presets[k][1]));
        const r2 = H.row(stage);
        H.button(r2, "清空方格", () => { on.clear(); judge(); });
      }
    }
  };
})();
