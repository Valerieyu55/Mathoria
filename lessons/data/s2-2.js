/* 2-2 圓心角、圓周角與弦切角（康軒九上 第 2 章 圓）
   對應 108 課綱：S-9-6 圓的幾何性質 */
window.MATHORIA_LESSON = {
  title: "2-2 圓心角、圓周角與弦切角",
  unit: "康軒 九上 ・ 第 2 章 圓",
  subtitle: "角的大小，全看它「對著哪一條弧」。",
  codes: ["S-9-6 圓的幾何性質"],
  time: "3 節課",
  goals: [
    "知道圓心角的度數等於所對弧的度數",
    "理解圓周角等於所對弧度數的一半，並能說明理由",
    "會用「同弧圓周角相等」「直徑所對圓周角為直角」「圓內接四邊形對角互補」解題",
    "知道弦切角等於所夾弧度數的一半，以及圓外一點的兩切線段等長"
  ],
  sections: [
    { type: "story", lines: [
      { who: "narrator", text: "圓環聖殿深處，一條巨龍盤在弧形的穹頂上，牠的影子把整座圓切成好幾段弧。" },
      { who: "boss", text: "我是{boss}！圓心看到的角、圓周上看到的角，不都是同一條弧撐開的嗎？當然一樣大！" },
      { who: "player", text: "真的一樣大嗎？站在圓心和站在圓周上，視角應該不同吧……" },
      { who: "pet", text: "{name}，關鍵是先認清楚「對著哪一條弧」。同一條弧，圓周角只有圓心角的一半喔！" },
      { who: "player", text: "好！我先找弧，再算角，看穿牠的影子！" }
    ] },

    { type: "concept", title: "圓心角與弧的度數", html: `
      <p>頂點在<b>圓心</b>、兩邊是半徑的角，叫做<b>圓心角</b>。圓心角 $\\angle AOB$ 夾住的那段弧 $\\overset{\\frown}{AB}$，就是它<b>所對的弧</b>。</p>
      <div class="fig"><svg viewBox="0 0 320 210">
        <path d="M160,105 L226.4,143.3 A76.6,76.6 0 0 1 93.6,143.3 Z" fill="rgba(246,220,154,.22)"/>
        <circle cx="160" cy="105" r="76.6" fill="none" stroke="#cdc5ff" stroke-width="2.5"/>
        <path d="M226.4,143.3 A76.6,76.6 0 0 1 93.6,143.3" fill="none" stroke="#f6dc9a" stroke-width="4"/>
        <line x1="160" y1="105" x2="226.4" y2="143.3" stroke="#8fd0ff" stroke-width="2"/>
        <line x1="160" y1="105" x2="93.6" y2="143.3" stroke="#8fd0ff" stroke-width="2"/>
        <circle cx="160" cy="105" r="3.5" fill="#fff"/>
        <text x="154" y="96" fill="#fff" font-size="14">O</text>
        <text x="232" y="152" fill="#fff" font-size="14">B</text>
        <text x="76" y="152" fill="#fff" font-size="14">A</text>
        <text x="146" y="138" fill="#8fd0ff" font-size="13">120°</text>
        <text x="138" y="200" fill="#f6dc9a" font-size="13">弧 120°</text>
      </svg></div>
      <p>把整個圓周分成 360 等分，每一等分的弧就叫 $1^\\circ$ 的弧。所以：</p>
      <div class="key"><b>圓心角的度數＝所對弧的度數</b><br>
        $$\\angle AOB=\\overset{\\frown}{AB}\\text{ 的度數}$$
        整個圓周是 $360^\\circ$，半圓是 $180^\\circ$。在同圓（或等圓）中，圓心角相等 ⇔ 所對的弧相等 ⇔ 所對的弦相等。</div>
      <p class="note">注意：「弧的度數」和「弧長」不同！弧的度數只看角度；弧長還要乘上 $2\\pi r$ 的比例（上一節學過）。</p>
    ` },

    { type: "concept", title: "圓周角：只有圓心角的一半", html: `
      <p>頂點在<b>圓周上</b>、兩邊都是弦的角，叫做<b>圓周角</b>。圓周角 $\\angle ACB$ 兩邊夾住的弧 $\\overset{\\frown}{AB}$（不含 $C$ 的那一段）就是它所對的弧。</p>
      <div class="key"><b>圓周角定理</b>：圓周角的度數＝所對弧度數的一半＝同弧所對圓心角的一半。
        $$\\angle ACB=\\frac{1}{2}\\,\\overset{\\frown}{AB}=\\frac{1}{2}\\angle AOB$$</div>
      <p><b>為什麼？</b>先看最簡單的情形：圓周角的一邊 $\\overline{CA}$ 通過圓心 $O$。</p>
      <div class="fig"><svg viewBox="0 0 300 200">
        <circle cx="150" cy="100" r="80" fill="none" stroke="#cdc5ff" stroke-width="2.5"/>
        <line x1="70" y1="100" x2="230" y2="100" stroke="#8fd0ff" stroke-width="2"/>
        <line x1="70" y1="100" x2="210" y2="47" stroke="#f6dc9a" stroke-width="2"/>
        <line x1="150" y1="100" x2="210" y2="47" stroke="#ff8fa3" stroke-width="2"/>
        <circle cx="150" cy="100" r="3.5" fill="#fff"/>
        <text x="144" y="120" fill="#fff" font-size="14">O</text>
        <text x="54" y="105" fill="#fff" font-size="14">C</text>
        <text x="236" y="105" fill="#fff" font-size="14">A</text>
        <text x="212" y="40" fill="#fff" font-size="14">B</text>
        <text x="92" y="96" fill="#f6dc9a" font-size="13">x</text>
        <text x="179" y="69" fill="#f6dc9a" font-size="12">x</text>
        <text x="164" y="94" fill="#ff8fa3" font-size="13">2x</text>
      </svg></div>
      <ol>
        <li>$\\overline{OB}=\\overline{OC}$（都是半徑），所以 $\\triangle OBC$ 是等腰三角形，$\\angle OCB=\\angle OBC=x$。</li>
        <li>$\\angle AOB$ 是 $\\triangle OBC$ 的<b>外角</b>，等於兩個內對角的和：$\\angle AOB=x+x=2x$。</li>
        <li>所以 $\\angle ACB=x=\\dfrac{1}{2}\\angle AOB=\\dfrac{1}{2}\\overset{\\frown}{AB}$。</li>
      </ol>
      <p class="note">如果圓心在圓周角的內部或外部，就從 $C$ 畫一條直徑，把角拆成兩個「一邊過圓心」的角相加或相減，結論一樣成立。</p>
    ` },
    { type: "widget", title: "拖曳點 C，圓周角會變嗎？", widget: "inscribed",
      intro: "金色的點 $C$ 在圓周上，可以拖曳；粉紅色的 $A$、$B$ 也能沿著圓移動。觀察圓周角 $\\angle ACB$ 和圓心角 $\\angle AOB$ 的關係。",
      caption: "只要 $C$ 不跨過 $A$、$B$ 跑到另一段弧，$\\angle ACB$ 就不變。把 $\\overline{AB}$ 拉成直徑試試看！" },

    { type: "concept", title: "圓周角定理的三個推論", html: `
      <div class="key"><b>推論 1　同弧（或等弧）所對的圓周角相等</b><br>
        若 $C$、$D$ 在 $\\overline{AB}$ 的同一側圓周上，則 $\\angle ACB=\\angle ADB$（都等於 $\\tfrac{1}{2}\\overset{\\frown}{AB}$）。</div>
      <div class="key"><b>推論 2　半圓（直徑）所對的圓周角是直角</b><br>
        若 $\\overline{AB}$ 是直徑，$C$ 是圓上另一點，則 $\\angle ACB=\\tfrac{1}{2}\\times 180^\\circ=90^\\circ$。</div>
      <div class="key"><b>推論 3（反過來用）　$90^\\circ$ 的圓周角所對的弦是直徑</b><br>
        若圓周角 $\\angle ACB=90^\\circ$，則所對的弧是 $180^\\circ$，也就是半圓，所以 $\\overline{AB}$ 是直徑，圓心就是 $\\overline{AB}$ 的中點。</div>
      <p class="note">推論 3 很好用：看到圓上有直角，就可以馬上找出直徑和圓心；直角三角形的外接圓，圓心就在斜邊中點。</p>
    ` },

    { type: "example", title: "例題 1　同一條弦，兩側的圓周角", problem: "圓 $O$ 中，$\\angle AOB=130^\\circ$（劣弧所對的圓心角）。點 $C$ 在優弧上、點 $D$ 在劣弧上，求 $\\angle ACB$ 與 $\\angle ADB$。",
      figure: `<svg viewBox="0 0 300 200"><circle cx="150" cy="100" r="75" fill="none" stroke="#cdc5ff" stroke-width="2"/><path d="M218,131.7 A75,75 0 0 1 82,131.7" fill="none" stroke="#f6dc9a" stroke-width="4"/><line x1="150" y1="100" x2="82" y2="131.7" stroke="#8fd0ff" stroke-width="2"/><line x1="150" y1="100" x2="218" y2="131.7" stroke="#8fd0ff" stroke-width="2"/><line x1="150" y1="25" x2="82" y2="131.7" stroke="#ff8fa3" stroke-width="2"/><line x1="150" y1="25" x2="218" y2="131.7" stroke="#ff8fa3" stroke-width="2"/><line x1="150" y1="175" x2="82" y2="131.7" stroke="#5fd3a8" stroke-width="2"/><line x1="150" y1="175" x2="218" y2="131.7" stroke="#5fd3a8" stroke-width="2"/><circle cx="150" cy="100" r="3.5" fill="#fff"/><text x="144" y="92" font-size="14" fill="#fff">O</text><text x="64" y="138" font-size="14" fill="#fff">A</text><text x="224" y="138" font-size="14" fill="#fff">B</text><text x="145" y="18" font-size="14" fill="#fff">C</text><text x="145" y="194" font-size="14" fill="#fff">D</text><text x="136" y="124" font-size="12" fill="#8fd0ff">130°</text></svg>`,
      steps: [
        "劣弧 $\\overset{\\frown}{AB}$ 的度數＝圓心角 $=130^\\circ$。",
        "$C$ 在優弧上，$\\angle ACB$ 對的是劣弧 $\\overset{\\frown}{AB}$：$\\angle ACB=\\dfrac{1}{2}\\times 130^\\circ=65^\\circ$。",
        "$D$ 在劣弧上，$\\angle ADB$ 對的是<b>優弧</b> $\\overset{\\frown}{ACB}$，度數 $=360^\\circ-130^\\circ=230^\\circ$。",
        "$\\angle ADB=\\dfrac{1}{2}\\times 230^\\circ=115^\\circ$。（檢查：$65^\\circ+115^\\circ=180^\\circ$）"
      ],
      answer: "$\\angle ACB=65^\\circ$，$\\angle ADB=115^\\circ$" },

    { type: "example", title: "例題 2　直徑所對的直角", problem: "$\\overline{AB}$ 是圓 $O$ 的直徑，$C$ 在圓上。（1）若 $\\angle BAC=35^\\circ$，求 $\\angle ABC$。（2）另一題（與（1）無關）：若 $\\overline{AC}=8$、$\\overline{BC}=6$，求圓的半徑。",
      figure: `<svg viewBox="0 0 300 200"><circle cx="150" cy="105" r="80" fill="none" stroke="#cdc5ff" stroke-width="2"/><line x1="70" y1="105" x2="230" y2="105" stroke="#8fd0ff" stroke-width="2.5"/><line x1="70" y1="105" x2="177.4" y2="29.8" stroke="#f6dc9a" stroke-width="2"/><line x1="230" y1="105" x2="177.4" y2="29.8" stroke="#f6dc9a" stroke-width="2"/><path d="M168.2,36.2 L174.6,45.4 L183.8,39" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="150" cy="105" r="3.5" fill="#fff"/><text x="144" y="124" font-size="14" fill="#fff">O</text><text x="54" y="110" font-size="14" fill="#fff">A</text><text x="236" y="110" font-size="14" fill="#fff">B</text><text x="176" y="22" font-size="14" fill="#fff">C</text><text x="92" y="100" font-size="12" fill="#ff8fa3">35°</text></svg>`,
      steps: [
        "$\\overline{AB}$ 是直徑，所以 $\\angle ACB=90^\\circ$（半圓所對的圓周角是直角）。",
        "$\\angle ABC=180^\\circ-90^\\circ-35^\\circ=55^\\circ$。",
        "直角 $\\triangle ACB$ 中，斜邊 $\\overline{AB}=\\sqrt{8^2+6^2}=\\sqrt{100}=10$。",
        "斜邊就是直徑，所以半徑 $=10\\div 2=5$。"
      ],
      answer: "（1）$\\angle ABC=55^\\circ$　（2）半徑為 5" },

    { type: "concept", title: "圓內接四邊形：對角互補", html: `
      <p>四個頂點都在圓上的四邊形，叫做<b>圓內接四邊形</b>。</p>
      <div class="key"><b>性質</b>：圓內接四邊形的對角互補。<br>
        $$\\angle A+\\angle C=180^\\circ$$$$\\angle B+\\angle D=180^\\circ$$</div>
      <p><b>為什麼？</b>在圓內接四邊形 $ABCD$ 中：</p>
      <ul>
        <li>$\\angle A$ 是圓周角，對的是弧 $\\overset{\\frown}{BCD}$，所以 $\\angle A=\\tfrac{1}{2}\\overset{\\frown}{BCD}$。</li>
        <li>$\\angle C$ 是圓周角，對的是弧 $\\overset{\\frown}{DAB}$，所以 $\\angle C=\\tfrac{1}{2}\\overset{\\frown}{DAB}$。</li>
        <li>這兩段弧剛好拼成整個圓：$\\overset{\\frown}{BCD}+\\overset{\\frown}{DAB}=360^\\circ$。</li>
        <li>所以 $\\angle A+\\angle C=\\tfrac{1}{2}\\times 360^\\circ=180^\\circ$。</li>
      </ul>
      <p class="note">延伸：把一邊延長，得到的外角和它的鄰角互補，所以<b>外角＝內對角</b>。例如延長 $\\overline{BC}$，$\\angle DCE=180^\\circ-\\angle BCD=\\angle A$。</p>
    ` },
    { type: "widget", title: "拖曳四個頂點，對角永遠互補", widget: "cyclicQuad",
      intro: "四個頂點都在圓上，任意拖曳它們（順序不能交換），觀察對角的和。",
      caption: "把四邊形拉成很扁、很歪的樣子，$\\angle A+\\angle C$ 還是 $180^\\circ$。" },

    { type: "example", title: "例題 3　圓內接四邊形求角", problem: "四邊形 $ABCD$ 內接於圓，$\\angle A=(2x+10)^\\circ$，$\\angle C=(3x-5)^\\circ$，$\\angle B=95^\\circ$。求 $x$、$\\angle A$ 與 $\\angle D$。",
      figure: `<svg viewBox="0 0 300 200"><circle cx="150" cy="100" r="75" fill="none" stroke="#cdc5ff" stroke-width="2"/><polygon points="79.5,74.3 175.7,29.5 223.9,113 150,175" fill="rgba(143,208,255,.12)" stroke="#8fd0ff" stroke-width="2.5"/><text x="60" y="72" font-size="14" fill="#fff">A</text><text x="172" y="20" font-size="14" fill="#fff">B</text><text x="230" y="118" font-size="14" fill="#fff">C</text><text x="145" y="194" font-size="14" fill="#fff">D</text></svg>`,
      steps: [
        "$\\angle A$ 與 $\\angle C$ 是對角，互補：$(2x+10)+(3x-5)=180$。",
        "$5x+5=180$，$x=35$。",
        "$\\angle A=2\\times 35+10=80^\\circ$（檢查：$\\angle C=3\\times 35-5=100^\\circ$，$80+100=180$）。",
        "$\\angle B$ 與 $\\angle D$ 也是對角：$\\angle D=180^\\circ-95^\\circ=85^\\circ$。"
      ],
      answer: "$x=35$，$\\angle A=80^\\circ$，$\\angle D=85^\\circ$" },

    { type: "concept", title: "弦切角", html: `
      <p>頂點在圓上，一邊是<b>切線</b>、另一邊是<b>弦</b>的角，叫做<b>弦切角</b>。它夾住的那段弧，就是它所對的弧。</p>
      <div class="fig"><svg viewBox="0 0 320 210">
        <circle cx="160" cy="95" r="80" fill="none" stroke="#cdc5ff" stroke-width="2.5"/>
        <path d="M160,175 A80,80 0 0 0 216.6,38.4" fill="none" stroke="#f6dc9a" stroke-width="4"/>
        <line x1="30" y1="175" x2="300" y2="175" stroke="#8fd0ff" stroke-width="2.5"/>
        <line x1="160" y1="175" x2="216.6" y2="38.4" stroke="#ff8fa3" stroke-width="2.5"/>
        <circle cx="160" cy="95" r="3.5" fill="#fff"/>
        <text x="146" y="92" fill="#fff" font-size="14">O</text>
        <text x="154" y="196" fill="#fff" font-size="14">A</text>
        <text x="220" y="32" fill="#fff" font-size="14">B</text>
        <text x="288" y="196" fill="#fff" font-size="14">T</text>
        <path d="M182,175 A22,22 0 0 0 168.4,154.7" fill="none" stroke="#ff8fa3" stroke-width="1.5"/><text x="186" y="164" fill="#ff8fa3" font-size="13">θ</text>
        <text x="248" y="112" fill="#f6dc9a" font-size="13">所夾的弧</text>
      </svg></div>
      <div class="key"><b>弦切角＝所夾弧度數的一半</b>（也等於同弧所對的圓周角）
        $$\\angle BAT=\\frac{1}{2}\\overset{\\frown}{AB}$$</div>
      <p><b>為什麼？</b>連 $\\overline{OA}$、$\\overline{OB}$。切線垂直半徑，$\\angle OAT=90^\\circ$，所以 $\\angle BAT=90^\\circ-\\angle OAB$。又 $\\triangle OAB$ 等腰，$\\angle OAB=\\dfrac{180^\\circ-\\angle AOB}{2}=90^\\circ-\\dfrac{1}{2}\\angle AOB$，代回得 $\\angle BAT=\\dfrac{1}{2}\\angle AOB=\\dfrac{1}{2}\\overset{\\frown}{AB}$。（若所夾的弧大於半圓，弦切角是鈍角，此時 $\\angle BAT=90^\\circ+\\angle OAB$，同樣可得 $\\angle BAT=\\tfrac12\\overset{\\frown}{AB}$。）</p>
      <p class="note">弦切角可以想成「圓周角的頂點滑到 $A$，一邊變成切線」的極限情形，所以大小和同弧的圓周角一樣。</p>
    ` },
    { type: "widget", title: "弦切角與同弧圓周角", widget: "tangentChord",
      intro: "藍色直線切圓於 $A$。拖曳粉紅點 $B$ 改變弦 $\\overline{AB}$，再拖曳金色點 $C$，比較弦切角 $\\angle BAT$ 與圓周角 $\\angle ACB$。",
      caption: "$C$ 必須在弦切角<b>外面</b>那段弧上，$\\angle ACB$ 才和 $\\angle BAT$ 對著同一條弧。" },

    { type: "concept", title: "切線段等長", html: `
      <p>從圓外一點 $P$ 可以畫兩條切線，切點為 $A$、$B$。線段 $\\overline{PA}$、$\\overline{PB}$ 叫做<b>切線段</b>。</p>
      <div class="key"><b>切線段等長</b>：$\\overline{PA}=\\overline{PB}$，而且 $\\overline{OP}$ 平分 $\\angle APB$ 與 $\\angle AOB$。</div>
      <p><b>為什麼？</b>連 $\\overline{OA}$、$\\overline{OB}$、$\\overline{OP}$。切線垂直半徑，$\\angle OAP=\\angle OBP=90^\\circ$；斜邊 $\\overline{OP}$ 共用；$\\overline{OA}=\\overline{OB}$（半徑）。所以 $\\triangle OAP\\cong\\triangle OBP$（<b>RHS 全等</b>），得 $\\overline{PA}=\\overline{PB}$，$\\angle APO=\\angle BPO$。</p>
      <div class="key"><b>角度關係</b>：四邊形 $OAPB$ 有兩個直角，內角和 $360^\\circ$，所以
        $$\\angle APB+\\angle AOB=180^\\circ$$</div>
      <p class="note">又因為 $\\overline{PA}=\\overline{PB}$，$\\triangle PAB$ 是等腰三角形；它的底角 $\\angle PAB$ 正好是弦切角，等於 $\\tfrac{1}{2}\\overset{\\frown}{AB}$。</p>
    ` },

    { type: "example", title: "例題 4　兩條切線", problem: "$\\overline{PA}$、$\\overline{PB}$ 分別切圓 $O$ 於 $A$、$B$，$\\angle APB=70^\\circ$，$C$ 在優弧 $\\overset{\\frown}{AB}$ 上。求 $\\angle AOB$、$\\angle ACB$ 與 $\\angle PAB$。",
      figure: `<svg viewBox="0 0 300 200"><circle cx="110" cy="100" r="60" fill="none" stroke="#cdc5ff" stroke-width="2"/><line x1="144.4" y1="50.9" x2="214.6" y2="100" stroke="#f6dc9a" stroke-width="2.5"/><line x1="144.4" y1="149.1" x2="214.6" y2="100" stroke="#f6dc9a" stroke-width="2.5"/><line x1="110" y1="100" x2="144.4" y2="50.9" stroke="#8fd0ff" stroke-width="2"/><line x1="110" y1="100" x2="144.4" y2="149.1" stroke="#8fd0ff" stroke-width="2"/><line x1="50" y1="100" x2="144.4" y2="50.9" stroke="#ff8fa3" stroke-width="2"/><line x1="50" y1="100" x2="144.4" y2="149.1" stroke="#ff8fa3" stroke-width="2"/><line x1="144.4" y1="50.9" x2="144.4" y2="149.1" stroke="#5fd3a8" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="110" cy="100" r="3.5" fill="#fff"/><text x="98" y="96" font-size="14" fill="#fff">O</text><text x="140" y="42" font-size="14" fill="#fff">A</text><text x="140" y="168" font-size="14" fill="#fff">B</text><text x="220" y="105" font-size="14" fill="#fff">P</text><text x="34" y="105" font-size="14" fill="#fff">C</text><text x="186" y="104" font-size="12" fill="#f6dc9a">70°</text></svg>`,
      steps: [
        "$\\angle OAP=\\angle OBP=90^\\circ$，所以 $\\angle AOB=180^\\circ-\\angle APB=180^\\circ-70^\\circ=110^\\circ$。",
        "$\\angle ACB$ 是劣弧 $\\overset{\\frown}{AB}$ 所對的圓周角：$\\angle ACB=\\dfrac{1}{2}\\times 110^\\circ=55^\\circ$。",
        "$\\overline{PA}=\\overline{PB}$，$\\triangle PAB$ 等腰：$\\angle PAB=\\dfrac{180^\\circ-70^\\circ}{2}=55^\\circ$。",
        "檢查：$\\angle PAB$ 是弦切角，等於 $\\dfrac{1}{2}\\overset{\\frown}{AB}=55^\\circ$，和圓周角 $\\angle ACB$ 一樣，兩種算法吻合！"
      ],
      answer: "$\\angle AOB=110^\\circ$，$\\angle ACB=55^\\circ$，$\\angle PAB=55^\\circ$" },

    { type: "myth", title: "破解{boss}的幻術", items: [
      { wrong: "對同一條弧的圓周角和圓心角一樣大。", right: "圓周角＝同弧圓心角的<b>一半</b>。", why: "由等腰三角形加外角可證：圓心角是 $2x$，圓周角是 $x$。" },
      { wrong: "同一條弦 $\\overline{AB}$ 所對的圓周角都相等。", right: "要對著<b>同一條弧</b>才相等；在弦的兩側，兩個圓周角互補。", why: "弦 $\\overline{AB}$ 把圓分成兩段弧，兩側的圓周角對的是不同的弧，度數和為 $\\tfrac{1}{2}\\times 360^\\circ=180^\\circ$。" },
      { wrong: "圓內接四邊形相鄰的兩個角互補。", right: "是<b>對角</b>互補：$\\angle A+\\angle C=\\angle B+\\angle D=180^\\circ$。", why: "對角所對的兩段弧拼成整個圓；相鄰兩角對的弧會重疊，和不一定是 $180^\\circ$。" },
      { wrong: "弦切角等於所夾弧的度數。", right: "弦切角＝所夾弧度數的<b>一半</b>，和同弧的圓周角相等。", why: "等於弧的度數的是圓心角；弦切角的頂點在圓上，和圓周角一樣要除以 2。" }
    ] },

    { type: "practice", title: "即時練習", items: [
      { q: "圓 $O$ 中，劣弧 $\\overset{\\frown}{AB}$ 所對的圓心角 $\\angle AOB=110^\\circ$，$C$ 在優弧上，則 $\\angle ACB$ 是幾度？", answer: ["55"], show: "$55^\\circ$", ex: "$\\angle ACB=\\dfrac{1}{2}\\angle AOB=\\dfrac{1}{2}\\times 110^\\circ=55^\\circ$。" },
      { q: "$C$ 在優弧 $\\overset{\\frown}{ACB}$ 上，$\\angle ACB=35^\\circ$，則劣弧 $\\overset{\\frown}{AB}$ 是幾度？", answer: ["70"], show: "$70^\\circ$", ex: "圓周角是所對弧的一半，所以弧 $=2\\times 35^\\circ=70^\\circ$。" },
      { q: "$C$、$D$ 在弦 $\\overline{AB}$ 的同一側圓周上，$\\angle ADB=40^\\circ$，則 $\\angle ACB=$？", o: ["$40^\\circ$", "$80^\\circ$", "$20^\\circ$", "$140^\\circ$"], a: 0, ex: "$C$、$D$ 在同側，兩角對著同一條弧，同弧所對的圓周角相等，$\\angle ACB=40^\\circ$。" },
      { q: "$\\overline{AB}$ 是圓的直徑，$C$ 在圓上，$\\angle CAB=28^\\circ$，則 $\\angle ABC$ 是幾度？", answer: ["62"], show: "$62^\\circ$", hint: "直徑所對的圓周角是多少度？", ex: "$\\angle ACB=90^\\circ$，所以 $\\angle ABC=180^\\circ-90^\\circ-28^\\circ=62^\\circ$。" },
      { q: "四邊形 $ABCD$ 內接於圓，$\\angle A=75^\\circ$，則 $\\angle C=$？", o: ["$105^\\circ$", "$75^\\circ$", "$150^\\circ$", "$15^\\circ$"], a: 0, ex: "圓內接四邊形對角互補，$\\angle C=180^\\circ-75^\\circ=105^\\circ$。" },
      { q: "直線 $L$ 切圓於 $A$，弦 $\\overline{AB}$ 與 $L$ 所夾的弧 $\\overset{\\frown}{AB}$ 為 $100^\\circ$，則這個弦切角是幾度？", answer: ["50"], show: "$50^\\circ$", ex: "弦切角＝所夾弧度數的一半 $=\\dfrac{1}{2}\\times 100^\\circ=50^\\circ$。" },
      { q: "$\\overline{PA}$、$\\overline{PB}$ 切圓 $O$ 於 $A$、$B$，$\\angle APB=50^\\circ$，則 $\\angle AOB$ 是幾度？", answer: ["130"], show: "$130^\\circ$", ex: "$\\angle OAP=\\angle OBP=90^\\circ$，四邊形 $OAPB$ 內角和 $360^\\circ$，$\\angle AOB=180^\\circ-50^\\circ=130^\\circ$。" },
      { q: "$\\overline{PA}$、$\\overline{PB}$ 切圓於 $A$、$B$，$\\angle APB=60^\\circ$，$\\overline{PA}=6$，則 $\\overline{AB}=$？", o: ["6", "3", "12", "$6\\sqrt{3}$"], a: 0, ex: "切線段等長 $\\overline{PA}=\\overline{PB}=6$，又頂角 $60^\\circ$，$\\triangle PAB$ 是正三角形，$\\overline{AB}=6$。" }
    ] },

    { type: "summary", title: "重點整理", items: [
      "圓心角的度數＝所對弧的度數；整圓 $360^\\circ$，半圓 $180^\\circ$。",
      "圓周角＝所對弧度數的一半＝同弧圓心角的一半。",
      "同弧（或等弧）所對的圓周角相等；弦兩側的圓周角互補。",
      "直徑所對的圓周角是 $90^\\circ$；反之 $90^\\circ$ 的圓周角所對的弦是直徑。",
      "圓內接四邊形對角互補，外角＝內對角。",
      "弦切角＝所夾弧度數的一半，等於同弧的圓周角。",
      "圓外一點的兩切線段等長（RHS 全等），且 $\\angle APB+\\angle AOB=180^\\circ$。"
    ] },

    { type: "extend", title: "高中延伸：正弦定理", where: "龍騰 高一下 數學第二冊 ・ 三角比", html: `
      <p>高中會學到<b>正弦</b>：在直角三角形中，$\\sin\\theta=\\dfrac{\\text{對邊}}{\\text{斜邊}}$。把它和本節的圓周角定理結合，就得到三角形的<b>正弦定理</b>。</p>
      <div class="key">$\\triangle ABC$ 的外接圓半徑為 $R$，三邊 $a=\\overline{BC}$、$b=\\overline{CA}$、$c=\\overline{AB}$，則
        $$\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R$$</div>
      <h3>用圓周角證明 $\\dfrac{a}{\\sin A}=2R$（$A$ 為銳角時）</h3>
      <ol>
        <li>從 $B$ 經過外接圓圓心 $O$ 畫直徑 $\\overline{BD}$，$\\overline{BD}=2R$，連 $\\overline{DC}$。</li>
        <li>$\\overline{BD}$ 是直徑，所以 $\\angle BCD=90^\\circ$（直徑所對的圓周角）。</li>
        <li>$D$ 和 $A$ 在 $\\overline{BC}$ 的同側，$\\angle BDC$ 與 $\\angle BAC$ 對同弧 $\\overset{\\frown}{BC}$，所以 $\\angle BDC=\\angle A$。</li>
        <li>在直角 $\\triangle BCD$ 中，$\\sin A=\\sin\\angle BDC=\\dfrac{\\overline{BC}}{\\overline{BD}}=\\dfrac{a}{2R}$，即 $\\dfrac{a}{\\sin A}=2R$。</li>
      </ol>
      <p class="note">$A$ 為鈍角時，$D$ 會落在另一側，$\\angle BDC=180^\\circ-A$（圓內接四邊形對角互補），而 $\\sin(180^\\circ-A)=\\sin A$，結論相同。</p>
      <h3>試試看</h3>
      <p>$\\triangle ABC$ 中 $\\angle A=30^\\circ$，$a=6$，求外接圓半徑。因為 $\\sin 30^\\circ=\\dfrac{1}{2}$：</p>
      $$2R=\\frac{6}{\\sin 30^\\circ}=\\frac{6}{\\tfrac{1}{2}}=12,\\qquad R=6$$
      <p>國中的「圓周角＝同弧圓心角的一半」，到了高中就變成連結邊長、角度與外接圓的關鍵工具。</p>
    ` }
  ],

  /* ================= 互動圖 ================= */
  widgets: {
    /* 圓周角與圓心角：拖曳 A、B、C */
    inscribed(stage, H) {
      const O = [240, 160], R = 125, RAD = Math.PI / 180;
      const pt = t => [O[0] + R * Math.cos(t * RAD), O[1] + R * Math.sin(t * RAD)];
      const mod = x => ((x % 360) + 360) % 360;
      const svg = H.svg(stage, 480, 330);
      H.el("circle", { cx: O[0], cy: O[1], r: R, fill: "rgba(167,155,240,.08)", stroke: "#cdc5ff", "stroke-width": 2.5 }, svg);
      const arc = H.el("path", { fill: "none", stroke: "#f6dc9a", "stroke-width": 6, "stroke-linecap": "round" }, svg);
      const wedge = H.el("path", { fill: "rgba(143,208,255,.22)", stroke: "#8fd0ff", "stroke-width": 1.5 }, svg);
      const oa = H.el("line", { x1: O[0], y1: O[1], stroke: "#8fd0ff", "stroke-width": 2.5 }, svg);
      const ob = H.el("line", { x1: O[0], y1: O[1], stroke: "#8fd0ff", "stroke-width": 2.5 }, svg);
      const ca = H.el("line", { stroke: "#f6dc9a", "stroke-width": 2.5 }, svg);
      const cb = H.el("line", { stroke: "#f6dc9a", "stroke-width": 2.5 }, svg);
      const cArc = H.el("path", { fill: "rgba(246,220,154,.25)", stroke: "#f6dc9a", "stroke-width": 1.5 }, svg);
      const ab = H.el("line", { stroke: "#ff8fa3", "stroke-width": 1.5, "stroke-dasharray": "5 4" }, svg);
      H.el("circle", { cx: O[0], cy: O[1], r: 4, fill: "#fff" }, svg);
      H.el("text", { x: O[0] - 6, y: O[1] - 10, text: "O" }, svg);
      const tO = H.el("text", { fill: "#8fd0ff", "font-size": 13 }, svg), tC = H.el("text", { fill: "#f6dc9a", "font-size": 13 }, svg);
      const hA = H.el("circle", { r: 11, fill: "#ff8fa3", stroke: "#fff", "stroke-width": 2 }, svg);
      const hB = H.el("circle", { r: 11, fill: "#ff8fa3", stroke: "#fff", "stroke-width": 2 }, svg);
      const hC = H.el("circle", { r: 12, fill: "#f6dc9a", stroke: "#fff", "stroke-width": 2 }, svg);
      const lA = H.el("text", { text: "A" }, svg), lB = H.el("text", { text: "B" }, svg), lC = H.el("text", { text: "C" }, svg);
      const out = H.readout(stage);
      const t = { A: 150, B: 30, C: 260 };
      const lab = (node, th) => { const p = [O[0] + (R + 22) * Math.cos(th * RAD), O[1] + (R + 22) * Math.sin(th * RAD)]; H.set(node, { x: p[0] - 5, y: p[1] + 5 }); };
      const draw = () => {
        const A = pt(t.A), B = pt(t.B), C = pt(t.C);
        /* 不含 C 的弧 AB：從 s 正向走 m 度到 e */
        const dAB = mod(t.B - t.A), dAC = mod(t.C - t.A);
        let s, m;
        if (dAC < dAB) { s = t.B; m = 360 - dAB; } else { s = t.A; m = dAB; }
        const S = pt(s), E = pt(s + m), big = m > 180 ? 1 : 0;
        H.set(arc, { d: `M${S[0]},${S[1]} A${R},${R} 0 ${big} 1 ${E[0]},${E[1]}` });
        const r0 = 30, s0 = [O[0] + r0 * Math.cos(s * RAD), O[1] + r0 * Math.sin(s * RAD)], e0 = [O[0] + r0 * Math.cos((s + m) * RAD), O[1] + r0 * Math.sin((s + m) * RAD)];
        H.set(wedge, { d: m === 180 ? `M${s0[0]},${s0[1]} A${r0},${r0} 0 0 1 ${e0[0]},${e0[1]} Z` : `M${O[0]},${O[1]} L${s0[0]},${s0[1]} A${r0},${r0} 0 ${big} 1 ${e0[0]},${e0[1]} Z` });
        const mid = (s + m / 2) * RAD;
        H.set(tO, { x: O[0] + 48 * Math.cos(mid) - 14, y: O[1] + 48 * Math.sin(mid) + 5, text: m + "°" });
        H.set(oa, { x2: A[0], y2: A[1] }); H.set(ob, { x2: B[0], y2: B[1] });
        H.set(ca, { x1: C[0], y1: C[1], x2: A[0], y2: A[1] }); H.set(cb, { x1: C[0], y1: C[1], x2: B[0], y2: B[1] });
        H.set(ab, { x1: A[0], y1: A[1], x2: B[0], y2: B[1] });
        H.set(cArc, { d: H.arcPath(C, A, B, 26) + ` L${C[0]},${C[1]} Z` });
        const toO = Math.atan2(O[1] - C[1], O[0] - C[0]);
        H.set(tC, { x: C[0] + 46 * Math.cos(toO) - 14, y: C[1] + 46 * Math.sin(toO) + 5, text: H.fmt(m / 2) + "°" });
        [[hA, A], [hB, B], [hC, C]].forEach(([h, p]) => H.set(h, { cx: p[0], cy: p[1] }));
        lab(lA, t.A); lab(lB, t.B); lab(lC, t.C);
        const meas = H.angleAt(C, A, B);
        const centralTxt = m > 180 ? `大於平角的圓心角 $\\angle AOB=${m}^\\circ$` : `圓心角 $\\angle AOB=${m}^\\circ$`;
        out.set(`弧 $\\overset{\\frown}{AB}$（不含 $C$）$=${m}^\\circ$，${centralTxt}<br>圓周角 $\\angle ACB=\\dfrac{${m}^\\circ}{2}=$ <span class="big">${H.fmt(m / 2)}°</span>（量得 ${H.fmt(meas)}°）` + (m === 180 ? ` <span class="tag">直徑 → 直角</span>` : ""));
      };
      const mover = k => (x, y) => {
        let th = mod(Math.round(Math.atan2(y - O[1], x - O[0]) / RAD));
        for (const j in t) if (j !== k && Math.min(mod(th - t[j]), mod(t[j] - th)) < 12) return;
        t[k] = th; draw();
      };
      H.drag(svg, hA, mover("A")); H.drag(svg, hB, mover("B")); H.drag(svg, hC, mover("C"));
      H.button(H.row(stage), "把 $\\overline{AB}$ 變成直徑", () => { t.A = 180; t.B = 0; if (Math.min(mod(t.C - 0), mod(0 - t.C)) < 12 || Math.min(mod(t.C - 180), mod(180 - t.C)) < 12) t.C = 270; draw(); });
      draw();
    },

    /* 圓內接四邊形：四個頂點都可拖曳 */
    cyclicQuad(stage, H) {
      const O = [240, 160], R = 125, RAD = Math.PI / 180, GAP = 10;
      const pt = t => [O[0] + R * Math.cos(t * RAD), O[1] + R * Math.sin(t * RAD)];
      const mod = x => ((x % 360) + 360) % 360;
      const svg = H.svg(stage, 480, 330);
      H.el("circle", { cx: O[0], cy: O[1], r: R, fill: "rgba(167,155,240,.08)", stroke: "#cdc5ff", "stroke-width": 2.5 }, svg);
      const poly = H.el("polygon", { fill: "rgba(143,208,255,.12)", stroke: "#8fd0ff", "stroke-width": 2.5 }, svg);
      const names = ["A", "B", "C", "D"], col = ["#f6dc9a", "#5fd3a8", "#f6dc9a", "#5fd3a8"];
      const t = [200, 285, 20, 120];
      const arcs = names.map((_, i) => H.el("path", { fill: col[i] === "#f6dc9a" ? "rgba(246,220,154,.28)" : "rgba(95,211,168,.28)", stroke: col[i], "stroke-width": 1.5 }, svg));
      const vals = names.map((_, i) => H.el("text", { fill: col[i], "font-size": 13 }, svg));
      const hs = names.map((_, i) => H.el("circle", { r: 11, fill: col[i], stroke: "#fff", "stroke-width": 2 }, svg));
      const ls = names.map(n => H.el("text", { text: n }, svg));
      const out = H.readout(stage);
      const draw = () => {
        const P = t.map(pt);
        H.set(poly, { points: P.map(p => p.join(",")).join(" ") });
        const ang = [];
        for (let i = 0; i < 4; i++) {
          const prev = (i + 3) % 4, next = (i + 1) % 4;
          /* 頂點 i 的角對著「從 next 走到 prev、不含 i」的弧 */
          const arcDeg = mod(t[prev] - t[next]);
          ang.push(arcDeg / 2);
          H.set(arcs[i], { d: H.arcPath(P[i], P[prev], P[next], 24) + ` L${P[i][0]},${P[i][1]} Z` });
          const toO = Math.atan2(O[1] - P[i][1], O[0] - P[i][0]);
          H.set(vals[i], { x: P[i][0] + 50 * Math.cos(toO) - 16, y: P[i][1] + 50 * Math.sin(toO) + 5, text: H.fmt(arcDeg / 2) + "°" });
          H.set(hs[i], { cx: P[i][0], cy: P[i][1] });
          H.set(ls[i], { x: O[0] + (R + 22) * Math.cos(t[i] * RAD) - 5, y: O[1] + (R + 22) * Math.sin(t[i] * RAD) + 5 });
        }
        const f = H.fmt;
        out.set(`$\\angle A+\\angle C=${f(ang[0])}^\\circ+${f(ang[2])}^\\circ=$ <span class="big">${f(ang[0] + ang[2])}°</span><br>` +
                `$\\angle B+\\angle D=${f(ang[1])}^\\circ+${f(ang[3])}^\\circ=$ <span class="big">${f(ang[1] + ang[3])}°</span><br>` +
                `理由：$\\angle A=\\tfrac12\\overset{\\frown}{BCD}=\\tfrac12(${mod(t[3] - t[1])}^\\circ)$，$\\angle C=\\tfrac12\\overset{\\frown}{DAB}=\\tfrac12(${mod(t[1] - t[3])}^\\circ)$，兩弧合起來是 $360^\\circ$。`);
      };
      hs.forEach((h, i) => H.drag(svg, h, (x, y) => {
        const th = Math.round(Math.atan2(y - O[1], x - O[0]) / RAD);
        const prev = t[(i + 3) % 4], next = t[(i + 1) % 4];
        const gap = mod(next - prev);
        let o = mod(th - prev);
        if (o > gap + (360 - gap) / 2) o = GAP; /* 拖到另一頭時貼回較近的一側 */
        o = Math.max(GAP, Math.min(gap - GAP, o));
        t[i] = mod(prev + o); draw();
      }));
      draw();
    },

    /* 弦切角：切點 A 固定在下方，拖曳 B 與 C */
    tangentChord(stage, H) {
      const O = [240, 145], R = 115, RAD = Math.PI / 180, TA = 90;
      const pt = t => [O[0] + R * Math.cos(t * RAD), O[1] + R * Math.sin(t * RAD)];
      const mod = x => ((x % 360) + 360) % 360;
      const svg = H.svg(stage, 480, 330);
      const A = pt(TA), T = [A[0] + 200, A[1]];
      H.el("circle", { cx: O[0], cy: O[1], r: R, fill: "rgba(167,155,240,.08)", stroke: "#cdc5ff", "stroke-width": 2.5 }, svg);
      const arc = H.el("path", { fill: "none", stroke: "#f6dc9a", "stroke-width": 6, "stroke-linecap": "round" }, svg);
      H.el("line", { x1: 10, y1: A[1], x2: 470, y2: A[1], stroke: "#8fd0ff", "stroke-width": 3 }, svg);
      const oa = H.el("line", { x1: O[0], y1: O[1], x2: A[0], y2: A[1], stroke: "rgba(255,255,255,.35)", "stroke-width": 1.5, "stroke-dasharray": "5 4" }, svg);
      H.el("path", { d: `M${A[0]},${A[1] - 10} h10 v10`, fill: "none", stroke: "rgba(255,255,255,.6)", "stroke-width": 1.5 }, svg);
      const chord = H.el("line", { x1: A[0], y1: A[1], stroke: "#ff8fa3", "stroke-width": 3 }, svg);
      const tcArc = H.el("path", { fill: "rgba(255,143,163,.3)", stroke: "#ff8fa3", "stroke-width": 1.5 }, svg);
      const ca = H.el("line", { stroke: "#f6dc9a", "stroke-width": 2.2 }, svg), cb = H.el("line", { stroke: "#f6dc9a", "stroke-width": 2.2 }, svg);
      const cArc = H.el("path", { fill: "rgba(246,220,154,.28)", stroke: "#f6dc9a", "stroke-width": 1.5 }, svg);
      H.el("circle", { cx: O[0], cy: O[1], r: 4, fill: "#fff" }, svg);
      H.el("text", { x: O[0] - 20, y: O[1] - 6, text: "O" }, svg);
      H.el("circle", { cx: A[0], cy: A[1], r: 6, fill: "#fff" }, svg);
      H.el("text", { x: A[0] - 5, y: A[1] + 24, text: "A" }, svg);
      H.el("text", { x: T[0] + 6, y: T[1] - 8, text: "T", fill: "#8fd0ff" }, svg);
      const tT = H.el("text", { fill: "#ff8fa3", "font-size": 13 }, svg), tC = H.el("text", { fill: "#f6dc9a", "font-size": 13 }, svg);
      const hB = H.el("circle", { r: 11, fill: "#ff8fa3", stroke: "#fff", "stroke-width": 2 }, svg);
      const hC = H.el("circle", { r: 12, fill: "#f6dc9a", stroke: "#fff", "stroke-width": 2 }, svg);
      const lB = H.el("text", { text: "B" }, svg), lC = H.el("text", { text: "C" }, svg);
      const out = H.readout(stage);
      let tB = -30, tC0 = 160;
      /* m = 弦切角 ∠BAT 所夾的弧（從 B 正向走到 A），C 須在另一段弧：從 A 正向走到 B */
      const fixC = () => { const m = mod(TA - tB), other = 360 - m, oc = mod(tC0 - TA); if (oc < 8 || oc > other - 8) tC0 = mod(TA + other / 2); };
      const draw = () => {
        const B = pt(tB), C = pt(tC0), m = mod(TA - tB);
        H.set(arc, { d: `M${B[0]},${B[1]} A${R},${R} 0 ${m > 180 ? 1 : 0} 1 ${A[0]},${A[1]}` });
        H.set(chord, { x2: B[0], y2: B[1] });
        H.set(tcArc, { d: H.arcPath(A, T, B, 28) + ` L${A[0]},${A[1]} Z` });
        const bis = (-m / 4) * RAD; /* 弦切角平分線方向 */
        H.set(tT, { x: A[0] + 48 * Math.cos(bis) - 6, y: A[1] + 48 * Math.sin(bis) + 4, text: H.fmt(m / 2) + "°" });
        H.set(ca, { x1: C[0], y1: C[1], x2: A[0], y2: A[1] }); H.set(cb, { x1: C[0], y1: C[1], x2: B[0], y2: B[1] });
        H.set(cArc, { d: H.arcPath(C, A, B, 24) + ` L${C[0]},${C[1]} Z` });
        const ua = Math.atan2(A[1] - C[1], A[0] - C[0]), ub = Math.atan2(B[1] - C[1], B[0] - C[0]);
        const bx = Math.cos(ua) + Math.cos(ub), by = Math.sin(ua) + Math.sin(ub), bl = Math.hypot(bx, by) || 1;
        H.set(tC, { x: C[0] + 46 * bx / bl - 14, y: C[1] + 46 * by / bl + 5, text: H.fmt(m / 2) + "°" });
        H.set(hB, { cx: B[0], cy: B[1] }); H.set(hC, { cx: C[0], cy: C[1] });
        H.set(lB, { x: O[0] + (R + 22) * Math.cos(tB * RAD) - 5, y: O[1] + (R + 22) * Math.sin(tB * RAD) + 5 });
        H.set(lC, { x: O[0] + (R + 22) * Math.cos(tC0 * RAD) - 5, y: O[1] + (R + 22) * Math.sin(tC0 * RAD) + 5 });
        out.set(`所夾的弧 $\\overset{\\frown}{AB}=${m}^\\circ$<br>弦切角 $\\angle BAT=\\dfrac{${m}^\\circ}{2}=$ <span class="big">${H.fmt(m / 2)}°</span>（量得 ${H.fmt(H.angleAt(A, T, B))}°）<br>圓周角 $\\angle ACB=$ <span class="big">${H.fmt(m / 2)}°</span>（量得 ${H.fmt(H.angleAt(C, A, B))}°）→ 兩者相等！`);
      };
      H.drag(svg, hB, (x, y) => {
        const th = mod(Math.round(Math.atan2(y - O[1], x - O[0]) / RAD)), m = mod(TA - th);
        if (m < 16 || m > 344) return;
        tB = th; fixC(); draw();
      });
      H.drag(svg, hC, (x, y) => {
        const th = mod(Math.round(Math.atan2(y - O[1], x - O[0]) / RAD)), other = 360 - mod(TA - tB), oc = mod(th - TA);
        if (oc < 8 || oc > other - 8) return;
        tC0 = th; draw();
      });
      draw();
    }
  }
};
