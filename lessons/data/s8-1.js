/* 8-1 會考模擬戰 I：九上幾何總複習（終焉試煉之地）
   對應 108 課綱：S-9-1～S-9-11 九上幾何（相似形、圓、推理證明、三角形的三心） */
window.MATHORIA_LESSON = {
  title: "會考模擬戰 I：九上幾何總複習",
  unit: "終焉試煉 ・ 會考總複習",
  subtitle: "相似、圓、證明、三心全部混在一起？先認出章節，再把法則一個一個叫出來。",
  codes: ["S-9-1～S-9-11 九上幾何"],
  time: "2 節課",
  goals: [
    "建立會考幾何題的解題流程：看圖、標條件、認章節、列性質、驗合理",
    "整理九上必備公式：相似比與面積比、平行線截比例線段、圓的角與弧、切線、三心",
    "能解跨章節的綜合題，例如圓裡的相似三角形、重心配上面積比、切線段配上畢氏定理",
    "能用「因為…所以…（理由）」的格式寫出非選擇題的推理過程"
  ],
  sections: [
    { type: "story", lines: [
      { who: "narrator", text: "金色之門前，七枚徽章同時發光。門縫裡傳出一陣冷笑。" },
      { who: "boss", text: "我是{boss}。我把相似、圓、三心全部攪在一起，看你連題目屬於哪一章都認不出來！" },
      { who: "player", text: "一題裡面同時有圓、有平行線、還有重心……真的有點眼花。" },
      { who: "pet", text: "{name}，別慌。再難的題目也是由學過的法則拼起來的。先認出每個零件屬於哪一章，再把法則一個一個叫出來" },
      { who: "player", text: "好！看圖、標條件、找章節、列性質，一步一步拆掉它的陷阱！" }
    ] },

    { type: "concept", title: "會考解題策略：五步拆題法", html: `
      <p>會考的幾何題很少只考一個性質，常常是「圓 ＋ 相似」「重心 ＋ 面積比」「切線 ＋ 畢氏定理」這種組合。遇到綜合題，照下面五步走：</p>
      <ol>
        <li><b>讀圖</b>：先看清楚圖上有哪些圖形（三角形、圓、平行線、切線）和哪些點是特殊點（圓心、切點、中點、重心）。</li>
        <li><b>標條件</b>：把題目給的長度、角度、平行、垂直、相切通通標在圖上。沒有標出來的條件最容易被忘記。</li>
        <li><b>認章節</b>：看到平行線截三角形 → 相似形；看到圓上的角 → 圓周角、圓心角；看到切線 → 直角；看到「心」→ 三心。</li>
        <li><b>列性質</b>：把該章可能用到的性質列出來，挑出能把「已知」接到「所求」的那一條。常見的橋梁是<b>直角</b>（畢氏定理）和<b>相等的角</b>（AA 相似）。</li>
        <li><b>驗合理</b>：檢查單位（長度、面積、角度）、大小是否合理（例如三角形內角和、弦不會比直徑長、部分面積不會比全部大）。</li>
      </ol>
      <div class="key"><b>會考題型提醒</b><br>會考數學有<b>選擇題</b>和<b>非選擇題</b>（近年非選題通常 2 題）。選擇題只看答案；非選擇題要寫出<b>計算或推理過程</b>，幾何推理每一步都要說明依據的性質，只寫答案拿不到滿分。</div>
      <p class="note">選擇題也可以先用「驗合理」刪選項：例如所求是部分面積，比全部面積還大的選項可以直接刪掉。</p>
    ` },

    { type: "widget", title: "題型辨識器", widget: "recognizer",
      intro: "點選一種題目線索，看看應該叫出哪一章、哪些性質。",
      caption: "會考題常常同時出現兩、三種線索，每一種線索都要叫出對應的性質。" },

    { type: "concept", title: "九上必備公式卡", html: `
      <h3>1. 相似形</h3>
      <div class="table-wrap"><table>
        <tr><th>主題</th><th>重點</th></tr>
        <tr><td>相似判定</td><td>AA（兩角相等）、SAS（兩邊成比例且夾角相等）、SSS（三邊成比例）</td></tr>
        <tr><td>相似比 $k$</td><td>對應邊長比 ＝ 周長比 ＝ 對應高、中線、角平分線的比 ＝ $k$；<b>面積比 ＝ $k^2$</b></td></tr>
        <tr><td>平行線截比例線段</td><td>$\\overline{DE}\\parallel\\overline{BC}$ 時，$\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$，且 $\\overline{DE}:\\overline{BC}=\\overline{AD}:\\overline{AB}$</td></tr>
        <tr><td>中點連線定理</td><td>三角形兩邊中點的連線平行第三邊，且長度是第三邊的一半</td></tr>
      </table></div>
      <h3>2. 圓</h3>
      <div class="table-wrap"><table>
        <tr><th>主題</th><th>重點</th></tr>
        <tr><td>弧長、扇形</td><td>弧長 $=2\\pi r\\times\\dfrac{\\theta}{360}$；扇形面積 $=\\pi r^2\\times\\dfrac{\\theta}{360}$</td></tr>
        <tr><td>點、線與圓</td><td>比較距離 $d$ 與半徑 $r$；切線垂直於過切點的半徑；弦心距垂直平分弦，$r^2=d^2+\\left(\\tfrac{\\text{弦}}{2}\\right)^2$</td></tr>
        <tr><td>三種角</td><td>圓心角 ＝ 所對弧的度數；圓周角 ＝ 所對弧度數的一半；弦切角 ＝ 所夾弧度數的一半</td></tr>
        <tr><td>常用推論</td><td>同弧所對的圓周角相等；直徑（半圓）所對的圓周角 $=90^\\circ$；圓內接四邊形對角互補</td></tr>
        <tr><td>切線段</td><td>從圓外一點作兩條切線，兩切線段等長</td></tr>
      </table></div>
      <h3>3. 推理證明與三心</h3>
      <div class="table-wrap"><table>
        <tr><th>主題</th><th>重點</th></tr>
        <tr><td>推理證明</td><td>每一步寫「因為…所以…」並註明依據（定義、性質、判定）</td></tr>
        <tr><td>外心 $O$</td><td>三邊中垂線的交點；$\\overline{OA}=\\overline{OB}=\\overline{OC}$（外接圓半徑）；直角三角形的外心是斜邊中點</td></tr>
        <tr><td>內心 $I$</td><td>三內角平分線的交點；到三邊等距（內切圓半徑 $r$）；面積 $=\\dfrac{\\text{周長}\\times r}{2}$；直角三角形 $r=\\dfrac{\\text{兩股和}-\\text{斜邊}}{2}$</td></tr>
        <tr><td>重心 $G$</td><td>三中線的交點；$\\overline{AG}:\\overline{GM}=2:1$；三中線把面積六等分</td></tr>
      </table></div>
    ` },

    { type: "widget", title: "平行線滑過三角形：比例與面積比", widget: "parallelSlide",
      intro: "拉動滑桿，讓 $\\overline{DE}\\parallel\\overline{BC}$ 往下滑。$\\overline{BC}=12$，觀察長度比與面積比。",
      caption: "長度比是 $k$，面積比卻是 $k^2$。當 $k=\\dfrac{2}{3}$ 時，$\\overline{DE}$ 剛好通過重心 $G$。" },

    { type: "example", title: "例題 1　圓裡的相似三角形", problem: "$\\triangle ABC$ 內接於圓 $O$，$\\overline{AB}=13$，$\\overline{AC}=15$。$\\overline{AD}\\perp\\overline{BC}$ 於 $D$，$\\overline{AD}=12$。$\\overline{AE}$ 是圓 $O$ 的直徑，求圓 $O$ 的半徑。",
      figure: `<svg viewBox="0 0 300 235"><circle cx="152" cy="134.6" r="89.4" fill="none" stroke="#cdc5ff" stroke-width="2"/><path d="M130,48 L75,180 L229,180 Z" fill="rgba(246,220,154,.08)" stroke="#f6dc9a" stroke-width="2"/><line x1="130" y1="48" x2="130" y2="180" stroke="#8fd0ff" stroke-width="2" stroke-dasharray="5 4"/><line x1="130" y1="48" x2="174" y2="221.2" stroke="#ff8fa3" stroke-width="2"/><line x1="229" y1="180" x2="174" y2="221.2" stroke="#ff8fa3" stroke-width="2"/><path d="M130,171 h8 v9" fill="none" stroke="#fff"/><circle cx="152" cy="134.6" r="3" fill="#fff"/><text x="122" y="40" font-size="14" fill="#fff">A</text><text x="58" y="186" font-size="14" fill="#fff">B</text><text x="234" y="186" font-size="14" fill="#fff">C</text><text x="120" y="198" font-size="14" fill="#fff">D</text><text x="176" y="234" font-size="14" fill="#fff">E</text><text x="158" y="132" font-size="14" fill="#fff">O</text><text x="86" y="110" font-size="13" fill="#f6dc9a">13</text><text x="186" y="104" font-size="13" fill="#f6dc9a">15</text><text x="112" y="122" font-size="13" fill="#8fd0ff">12</text></svg>`,
      steps: [
        "認章節：圓上有直徑 → 半圓所對的圓周角是直角；圓上有同弧的角 → 圓周角相等；最後要求長度 → 想用相似。",
        "連 $\\overline{CE}$。$\\overline{AE}$ 是直徑，所以 $\\angle ACE=90^\\circ$（半圓所對的圓周角）。又 $\\overline{AD}\\perp\\overline{BC}$，所以 $\\angle ADB=90^\\circ$。",
        "$\\angle ABD$ 與 $\\angle AEC$ 都是弧 $AC$ 所對的圓周角，所以 $\\angle ABD=\\angle AEC$。",
        "由 AA 相似，$\\triangle ABD\\sim\\triangle AEC$，對應邊成比例：$\\dfrac{\\overline{AB}}{\\overline{AE}}=\\dfrac{\\overline{AD}}{\\overline{AC}}$。",
        "代入：$\\dfrac{13}{\\overline{AE}}=\\dfrac{12}{15}$，得 $\\overline{AE}=\\dfrac{13\\times 15}{12}=\\dfrac{65}{4}$。",
        "半徑 $=\\dfrac{1}{2}\\overline{AE}=\\dfrac{65}{8}$。驗合理：$\\dfrac{65}{8}=8.125$，直徑 $16.25$ 比最長邊 $15$ 還長，合理。"
      ],
      answer: "圓 $O$ 的半徑為 $\\dfrac{65}{8}$" },

    { type: "example", title: "例題 2　重心 ＋ 面積比", problem: "$\\triangle ABC$ 的面積為 54，$G$ 為重心。過 $G$ 作直線平行 $\\overline{BC}$，交 $\\overline{AB}$ 於 $D$、交 $\\overline{AC}$ 於 $E$。求 $\\triangle ADE$ 與四邊形 $DBCE$ 的面積。",
      figure: `<svg viewBox="0 0 320 220"><path d="M110,20 L63.3,140 L223.3,140 Z" fill="rgba(246,220,154,.22)"/><path d="M110,20 L40,200 L280,200 Z" fill="none" stroke="#cdc5ff" stroke-width="2"/><line x1="63.3" y1="140" x2="223.3" y2="140" stroke="#f6dc9a" stroke-width="2.5"/><line x1="110" y1="20" x2="160" y2="200" stroke="#8fd0ff" stroke-width="2" stroke-dasharray="5 4"/><circle cx="143.3" cy="140" r="4" fill="#ff8fa3"/><text x="104" y="14" font-size="14" fill="#fff">A</text><text x="24" y="210" font-size="14" fill="#fff">B</text><text x="284" y="210" font-size="14" fill="#fff">C</text><text x="44" y="140" font-size="14" fill="#fff">D</text><text x="228" y="140" font-size="14" fill="#fff">E</text><text x="148" y="132" font-size="14" fill="#ff8fa3">G</text><text x="156" y="216" font-size="14" fill="#fff">M</text></svg>`,
      steps: [
        "認章節：重心 → 中線 $2:1$；平行線截三角形 → 相似；問面積 → 面積比是相似比的平方。",
        "連中線 $\\overline{AM}$（$M$ 為 $\\overline{BC}$ 中點），重心在中線上且 $\\overline{AG}:\\overline{GM}=2:1$，所以 $\\overline{AG}:\\overline{AM}=2:3$。",
        "$\\overline{DE}\\parallel\\overline{BC}$，所以 $\\triangle ADE\\sim\\triangle ABC$（AA），而且由平行線截比例線段，$\\overline{AD}:\\overline{AB}=\\overline{AG}:\\overline{AM}=2:3$，相似比為 $2:3$。",
        "面積比 $=2^2:3^2=4:9$，所以 $\\triangle ADE=54\\times\\dfrac{4}{9}=24$。",
        "四邊形 $DBCE=54-24=30$。驗合理：$24+30=54$，而且 $\\triangle ADE$ 比全部的一半小一點，符合圖形。"
      ],
      answer: "$\\triangle ADE$ 面積 24，四邊形 $DBCE$ 面積 30" },

    { type: "example", title: "例題 3　切線段等長 ＋ 畢氏定理", problem: "直角 $\\triangle ABC$ 中，$\\angle C=90^\\circ$，內切圓 $I$ 與斜邊 $\\overline{AB}$ 切於 $F$，$\\overline{AF}=3$，$\\overline{BF}=10$。求內切圓半徑 $r$ 與 $\\triangle ABC$ 的面積。",
      figure: `<svg viewBox="0 0 300 190"><path d="M60,70 L60,160 L276,160 Z" fill="none" stroke="#cdc5ff" stroke-width="2"/><circle cx="96" cy="124" r="36" fill="rgba(143,208,255,.12)" stroke="#8fd0ff" stroke-width="2"/><path d="M60,150 h10 v10" fill="none" stroke="#fff"/><line x1="96" y1="124" x2="60" y2="124" stroke="#f6dc9a" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="96" y1="124" x2="96" y2="160" stroke="#f6dc9a" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="96" y1="124" x2="109.8" y2="90.8" stroke="#f6dc9a" stroke-width="1.5" stroke-dasharray="4 3"/><circle cx="109.8" cy="90.8" r="3.5" fill="#ff8fa3"/><circle cx="96" cy="124" r="3" fill="#fff"/><text x="44" y="68" font-size="14" fill="#fff">A</text><text x="280" y="176" font-size="14" fill="#fff">B</text><text x="44" y="176" font-size="14" fill="#fff">C</text><text x="112" y="84" font-size="14" fill="#ff8fa3">F</text><text x="100" y="128" font-size="13" fill="#fff">I</text><text x="78" y="72" font-size="13" fill="#f6dc9a">3</text><text x="190" y="116" font-size="13" fill="#f6dc9a">10</text></svg>`,
      steps: [
        "認章節：內切圓 → 三邊都是切線 → 切線段等長；直角三角形 → 畢氏定理。",
        "從 $A$ 出發的兩條切線段等長，所以 $A$ 到 $\\overline{AC}$ 上切點的距離也是 3；同理 $B$ 到 $\\overline{BC}$ 上切點的距離是 10。",
        "$C$ 處：兩切點與 $I$、$C$ 圍成正方形（兩個切點處都是直角，且 $\\angle C=90^\\circ$，鄰邊都等於 $r$），所以 $C$ 到兩切點的距離都是 $r$。因此 $\\overline{AC}=3+r$，$\\overline{BC}=10+r$，$\\overline{AB}=13$。",
        "畢氏定理：$(3+r)^2+(10+r)^2=13^2$，整理得 $2r^2+26r+109=169$，即 $r^2+13r-30=0$。",
        "因式分解：$(r+15)(r-2)=0$，$r>0$，所以 $r=2$。",
        "$\\overline{AC}=5$，$\\overline{BC}=12$，面積 $=\\dfrac{5\\times 12}{2}=30$。驗算：$\\dfrac{5+12-13}{2}=2$ ✔，$\\dfrac{(5+12+13)\\times 2}{2}=30$ ✔。"
      ],
      answer: "$r=2$，面積為 30" },

    { type: "example", title: "例題 4　非選題：寫出推理過程", problem: "$\\overline{AB}$ 是圓 $O$ 的直徑，$C$ 是圓上一點，$\\overline{CD}\\perp\\overline{AB}$ 於 $D$。<br>（1）證明 $\\triangle ACD\\sim\\triangle CBD$。<br>（2）若 $\\overline{AD}=4$，$\\overline{DB}=9$，求 $\\overline{CD}$。",
      figure: `<svg viewBox="0 0 300 210"><circle cx="150" cy="110" r="91" fill="none" stroke="#cdc5ff" stroke-width="2"/><line x1="59" y1="110" x2="241" y2="110" stroke="#8fd0ff" stroke-width="2"/><path d="M59,110 L115,26 L241,110" fill="none" stroke="#f6dc9a" stroke-width="2"/><line x1="115" y1="26" x2="115" y2="110" stroke="#ff8fa3" stroke-width="2"/><path d="M115,100 h10 v10" fill="none" stroke="#fff"/><circle cx="150" cy="110" r="3" fill="#fff"/><text x="42" y="116" font-size="14" fill="#fff">A</text><text x="246" y="116" font-size="14" fill="#fff">B</text><text x="108" y="18" font-size="14" fill="#fff">C</text><text x="108" y="128" font-size="14" fill="#fff">D</text><text x="147" y="128" font-size="14" fill="#fff">O</text><text x="82" y="128" font-size="13" fill="#8fd0ff">4</text><text x="190" y="128" font-size="13" fill="#8fd0ff">9</text></svg>`,
      steps: [
        "（1）因為 $\\overline{AB}$ 是直徑，所以 $\\angle ACB=90^\\circ$。（理由：半圓所對的圓周角是直角）",
        "因為 $\\overline{CD}\\perp\\overline{AB}$，所以 $\\angle ADC=\\angle CDB=90^\\circ$。（理由：垂直的定義）",
        "在 $\\triangle ACD$ 中，$\\angle ACD=180^\\circ-90^\\circ-\\angle A=90^\\circ-\\angle A$；在 $\\triangle ABC$ 中，$\\angle B=180^\\circ-90^\\circ-\\angle A=90^\\circ-\\angle A$。所以 $\\angle ACD=\\angle B$，即 $\\angle ACD=\\angle CBD$。（理由：三角形內角和 $180^\\circ$）",
        "在 $\\triangle ACD$ 與 $\\triangle CBD$ 中，$\\angle ADC=\\angle CDB$，$\\angle ACD=\\angle CBD$，所以 $\\triangle ACD\\sim\\triangle CBD$。（理由：AA 相似）",
        "（2）相似三角形對應邊成比例：$\\dfrac{\\overline{AD}}{\\overline{CD}}=\\dfrac{\\overline{CD}}{\\overline{DB}}$，所以 $\\overline{CD}^2=\\overline{AD}\\times\\overline{DB}=4\\times 9=36$。",
        "$\\overline{CD}>0$，所以 $\\overline{CD}=6$。驗合理：半徑 $=\\dfrac{13}{2}=6.5$，$\\overline{CD}=6$ 比半徑小，合理。"
      ],
      answer: "（1）由 AA 相似得證；（2）$\\overline{CD}=6$" },

    { type: "myth", title: "破解{boss}的幻術", items: [
      { wrong: "兩個相似三角形的相似比是 $2:3$，所以面積比也是 $2:3$。", right: "面積比是相似比的平方，$2^2:3^2=4:9$。", why: "面積是「長 × 寬」兩個方向都放大 $k$ 倍，所以變成 $k^2$ 倍。周長才是 $k$ 倍。" },
      { wrong: "$\\overline{DE}\\parallel\\overline{BC}$，所以 $\\overline{DE}:\\overline{BC}=\\overline{AD}:\\overline{DB}$。", right: "$\\overline{DE}:\\overline{BC}=\\overline{AD}:\\overline{AB}$，要用<b>整段</b> $\\overline{AB}$。", why: "$\\triangle ADE\\sim\\triangle ABC$，對應邊是 $\\overline{AD}$ 對 $\\overline{AB}$。$\\overline{AD}:\\overline{DB}$ 只能用在兩邊被截出的線段比。" },
      { wrong: "外心到三角形三邊的距離相等。", right: "外心到三<b>頂點</b>等距；內心才是到三<b>邊</b>等距。", why: "外心是中垂線交點（中垂線上的點到線段兩端等距）；內心是角平分線交點（角平分線上的點到角兩邊等距）。" },
      { wrong: "圓周角等於它所對的圓心角；圓內接四邊形的對角相等。", right: "圓周角是同弧圓心角的一半；圓內接四邊形的對角<b>互補</b>（和為 $180^\\circ$）。", why: "對角 $\\angle A$、$\\angle C$ 所對的兩段弧合起來是整個圓 $360^\\circ$，各取一半相加得 $180^\\circ$。" }
    ] },

    { type: "practice", title: "會考模擬練習", items: [
      { q: "$\\triangle ABC$ 中，$D$、$E$ 分別在 $\\overline{AB}$、$\\overline{AC}$ 上，$\\overline{DE}\\parallel\\overline{BC}$。若 $\\overline{AD}=4$，$\\overline{DB}=6$，$\\overline{BC}=15$，則 $\\overline{DE}=$？", answer: ["6"], show: "6", hint: "$\\overline{DE}:\\overline{BC}$ 要對應整段 $\\overline{AB}$。", ex: "$\\triangle ADE\\sim\\triangle ABC$，$\\overline{DE}:\\overline{BC}=\\overline{AD}:\\overline{AB}=4:10$，所以 $\\overline{DE}=15\\times\\dfrac{4}{10}=6$。" },
      { q: "$\\triangle ABC$ 與 $\\triangle DEF$ 中，$\\angle A=\\angle D$，$\\overline{AB}=6$，$\\overline{AC}=8$，$\\overline{DE}=9$，$\\overline{DF}=12$。下列敘述何者正確？", o: ["兩三角形依 SAS 相似，面積比為 $4:9$", "兩三角形依 SAS 相似，面積比為 $2:3$", "兩三角形依 AA 相似，面積比為 $4:9$", "兩三角形依 SSS 相似，面積比為 $4:9$"], a: 0, ex: "$\\dfrac{6}{9}=\\dfrac{8}{12}=\\dfrac{2}{3}$，且夾角 $\\angle A=\\angle D$，所以是 SAS 相似，相似比 $2:3$，面積比 $4:9$。題目只給一組角，不能用 AA；第三邊未知，不能用 SSS。" },
      { q: "兩個相似三角形的周長分別為 6 和 9，較小的三角形面積為 20，則較大的三角形面積為多少？", answer: ["45"], show: "45", ex: "周長比 ＝ 相似比 $=6:9=2:3$，面積比 $=4:9$，較大面積 $=20\\times\\dfrac{9}{4}=45$。" },
      { q: "半徑 12 公分、圓心角 $150^\\circ$ 的扇形，面積是多少平方公分？", o: ["$60\\pi$", "$10\\pi$", "$30\\pi$", "$120\\pi$"], a: 0, ex: "$\\pi\\times 12^2\\times\\dfrac{150}{360}=144\\pi\\times\\dfrac{5}{12}=60\\pi$。$10\\pi$ 是弧長 $2\\pi\\times 12\\times\\dfrac{150}{360}$，別把弧長和面積弄混。" },
      { q: "圓 $O$ 中，圓心角 $\\angle AOB=110^\\circ$，$C$ 在<b>優弧</b> $AB$ 上（與 $O$ 在弦 $\\overline{AB}$ 的同側），則 $\\angle ACB=$？", o: ["$55^\\circ$", "$110^\\circ$", "$125^\\circ$", "$70^\\circ$"], a: 0, ex: "$\\angle ACB$ 所對的是劣弧 $AB$，其度數 $=\\angle AOB=110^\\circ$，圓周角取一半得 $55^\\circ$。若 $C$ 在劣弧上，所對的是優弧 $250^\\circ$，才會是 $125^\\circ$。" },
      { q: "四邊形 $ABCD$ 內接於圓，且 $\\angle A=3\\angle C$，則 $\\angle A$ 是幾度？", answer: ["135"], show: "$135^\\circ$", hint: "圓內接四邊形對角互補。", ex: "$\\angle A+\\angle C=180^\\circ$，$3\\angle C+\\angle C=180^\\circ$，$\\angle C=45^\\circ$，$\\angle A=135^\\circ$。" },
      { q: "直線 $L$ 切圓 $O$ 於 $A$，弦 $\\overline{AB}$ 所對的劣弧 $AB$ 為 $100^\\circ$。$L$ 與 $\\overline{AB}$ 所夾、且夾住劣弧 $AB$ 的弦切角是幾度？", answer: ["50"], show: "$50^\\circ$", ex: "弦切角 ＝ 所夾弧度數的一半 $=100^\\circ\\div 2=50^\\circ$。" },
      { q: "四邊形 $ABCD$ 的四邊都與同一個圓相切。若 $\\overline{AB}=7$，$\\overline{BC}=9$，$\\overline{CD}=8$，則 $\\overline{DA}=$？", answer: ["6"], show: "6", hint: "從每個頂點出發的兩條切線段等長。", ex: "設四個頂點的切線段長為 $a,b,c,d$，則 $\\overline{AB}+\\overline{CD}=(a+b)+(c+d)=(b+c)+(d+a)=\\overline{BC}+\\overline{DA}$。所以 $7+8=9+\\overline{DA}$，$\\overline{DA}=6$。" },
      { q: "直角三角形的兩股長為 6 和 8，它的外接圓面積是多少？", o: ["$25\\pi$", "$100\\pi$", "$16\\pi$", "$4\\pi$"], a: 0, ex: "斜邊 $=\\sqrt{6^2+8^2}=10$。直角三角形的外心是斜邊中點，外接圓半徑 $=5$，面積 $=25\\pi$。$4\\pi$ 是內切圓（$r=\\frac{6+8-10}{2}=2$）的面積，別搞混外心與內心。" },
      { q: "$\\triangle ABC$ 的面積為 48，$G$ 為重心，$D$ 為 $\\overline{BC}$ 的中點。則 $\\triangle GBD$ 的面積為多少？", o: ["8", "16", "12", "24"], a: 0, ex: "三中線把三角形面積分成 6 個相等的小三角形，$\\triangle GBD$ 是其中一塊，面積 $=48\\div 6=8$。16 是 $\\triangle GBC$（兩塊）的面積。" }
    ] },

    { type: "summary", title: "重點整理", items: [
      "五步拆題法：讀圖 → 標條件 → 認章節 → 列性質 → 驗合理。",
      "相似比 $k$：邊長、周長、對應高都是 $k$；面積比是 $k^2$。",
      "$\\overline{DE}\\parallel\\overline{BC}$：$\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$；$\\overline{DE}:\\overline{BC}=\\overline{AD}:\\overline{AB}$（整段）。",
      "圓心角 ＝ 弧度數；圓周角、弦切角 ＝ 弧度數的一半；直徑所對圓周角 $90^\\circ$；圓內接四邊形對角互補。",
      "切線 ⊥ 過切點的半徑（看到切線就想直角、畢氏定理）；兩切線段等長。",
      "外心到三頂點等距、內心到三邊等距、重心把中線分成 $2:1$ 並把面積六等分。",
      "非選題：每一步寫「因為…所以…（理由）」，最後寫出結論。"
    ] },

    { type: "extend", title: "高中延伸：相似直角三角形與三角比", where: "龍騰 高一下 數學第二冊 ・ 三角比", html: `
      <p>國中學過：兩個直角三角形只要有一個銳角相等，就會 AA 相似，所以它們的<b>邊長比值都一樣</b>。也就是說，直角三角形的邊長比只由銳角的大小決定，跟三角形畫多大無關。</p>
      <p>高中把這些「只跟角度有關的比值」取了名字，叫做<b>三角比</b>。在直角三角形中，對銳角 $\\theta$：</p>
      $$\\sin\\theta=\\frac{\\text{對邊}}{\\text{斜邊}},\\qquad \\cos\\theta=\\frac{\\text{鄰邊}}{\\text{斜邊}},\\qquad \\tan\\theta=\\frac{\\text{對邊}}{\\text{鄰邊}}$$
      <h3>用 30°-60°-90° 三角形試試看</h3>
      <p>國中學過 $30^\\circ$-$60^\\circ$-$90^\\circ$ 三角形的三邊比為 $1:\\sqrt{3}:2$（短股：長股：斜邊）。$30^\\circ$ 的對邊是短股，所以：</p>
      $$\\sin 30^\\circ=\\frac{1}{2},\\qquad \\cos 30^\\circ=\\frac{\\sqrt{3}}{2},\\qquad \\tan 30^\\circ=\\frac{1}{\\sqrt{3}}=\\frac{\\sqrt{3}}{3}$$
      <p><b>小例題</b>：一條斜坡長 10 公尺，與水平地面的夾角是 $30^\\circ$，斜坡升高多少？水平前進多少？</p>
      $$\\text{高}=10\\times\\sin 30^\\circ=5\\ \\text{公尺},\\qquad \\text{水平距離}=10\\times\\cos 30^\\circ=5\\sqrt{3}\\approx 8.66\\ \\text{公尺}$$
      <p class="note">不管斜坡長 10 公尺還是 100 公尺，「高 ÷ 斜坡長」永遠是 $\\dfrac{1}{2}$——這正是相似三角形邊長比值不變的威力。</p>
    ` }
  ],

  /* ================= 互動圖 ================= */
  widgets: {
    /* 題型辨識器：點選線索 → 示意圖 ＋ 該叫出的章節與性質 */
    recognizer(stage, H) {
      const svg = H.svg(stage, 480, 220);
      const g = H.el("g", {}, svg);
      const out = H.readout(stage);
      const cases = [
        { btn: "平行線截三角形", ch: "相似形",
          fig: `<path d="M240,25 L110,195 L370,195 Z" fill="none" stroke="#cdc5ff" stroke-width="2.5"/><line x1="183.8" y1="98.5" x2="296.2" y2="98.5" stroke="#f6dc9a" stroke-width="3"/><path d="M234,92 l8,6.5 -8,6.5 M234,188.5 l8,6.5 -8,6.5" fill="none" stroke="#f6dc9a" stroke-width="2"/>` +
            `<text style="font-size:18px" x="234" y="18">A</text><text style="font-size:18px" x="94" y="205">B</text><text style="font-size:18px" x="376" y="205">C</text><text style="font-size:18px" x="164" y="100">D</text><text style="font-size:18px" x="302" y="100">E</text>`,
          list: ["$\\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}$", "$\\triangle ADE\\sim\\triangle ABC$（AA），$\\overline{DE}:\\overline{BC}=\\overline{AD}:\\overline{AB}$（整段）", "$D$、$E$ 是中點時：中點連線定理，$\\overline{DE}=\\frac{1}{2}\\overline{BC}$"] },
        { btn: "圓上有角", ch: "圓：圓心角、圓周角",
          fig: `<circle cx="240" cy="112" r="90" fill="none" stroke="#cdc5ff" stroke-width="2.5"/><path d="M176.4,175.6 L240,112 L303.6,175.6" fill="none" stroke="#8fd0ff" stroke-width="2.5"/><path d="M176.4,175.6 L222,23.8 L303.6,175.6" fill="none" stroke="#f6dc9a" stroke-width="2.5"/><path d="M176.4,175.6 A90,90 0 0 0 303.6,175.6" fill="none" stroke="#ff8fa3" stroke-width="5"/><circle cx="240" cy="112" r="3.5" fill="#fff"/>` +
            `<text style="font-size:18px" x="246" y="108">O</text><text style="font-size:18px" x="160" y="190">A</text><text style="font-size:18px" x="308" y="190">B</text><text style="font-size:18px" x="214" y="16">C</text><text style="font-size:18px" x="232" y="220" fill="#ff8fa3">弧 AB</text>`,
          list: ["圓心角 $\\angle AOB$ ＝ 弧 $AB$ 的度數", "圓周角 $\\angle ACB$ ＝ 弧 $AB$ 度數的一半；同弧的圓周角都相等", "直徑所對的圓周角 $=90^\\circ$；圓內接四邊形對角互補", "切線與弦的夾角（弦切角）＝ 所夾弧度數的一半"] },
        { btn: "有切線、切點", ch: "圓：切線性質",
          fig: `<circle cx="170" cy="112" r="70" fill="none" stroke="#cdc5ff" stroke-width="2.5"/><line x1="170" y1="112" x2="360" y2="112" stroke="#8fd0ff" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M195.8,46.9 L360,112 L195.8,177.1" fill="none" stroke="#f6dc9a" stroke-width="2.5"/><line x1="170" y1="112" x2="195.8" y2="46.9" stroke="#ff8fa3" stroke-width="2"/><line x1="170" y1="112" x2="195.8" y2="177.1" stroke="#ff8fa3" stroke-width="2"/><circle cx="170" cy="112" r="3.5" fill="#fff"/><circle cx="360" cy="112" r="4" fill="#fff"/>` +
            `<text style="font-size:18px" x="152" y="130">O</text><text style="font-size:18px" x="368" y="117">P</text><text style="font-size:18px" x="188" y="38">A</text><text style="font-size:18px" x="188" y="198">B</text><text style="font-size:18px" x="250" y="70" fill="#f6dc9a">PA = PB</text>`,
          list: ["切線 ⊥ 過切點的半徑：$\\overline{OA}\\perp\\overline{PA}$ → 出現直角，想畢氏定理", "從圓外一點 $P$ 作兩切線，切線段等長：$\\overline{PA}=\\overline{PB}$", "內切圓：三角形每個頂點的兩條切線段等長"] },
        { btn: "出現「心」", ch: "三角形的三心",
          fig: `<path d="M200,25 L80,195 L400,195 Z" fill="none" stroke="#cdc5ff" stroke-width="2.5"/><line x1="200" y1="25" x2="240" y2="195" stroke="#8fd0ff" stroke-width="1.8" stroke-dasharray="5 4"/><line x1="80" y1="195" x2="300" y2="110" stroke="#8fd0ff" stroke-width="1.8" stroke-dasharray="5 4"/><line x1="400" y1="195" x2="140" y2="110" stroke="#8fd0ff" stroke-width="1.8" stroke-dasharray="5 4"/><circle cx="226.7" cy="138.3" r="5" fill="#ff8fa3"/>` +
            `<text style="font-size:18px" x="236" y="136" fill="#ff8fa3">G</text><text style="font-size:18px" x="194" y="18">A</text><text style="font-size:18px" x="64" y="205">B</text><text style="font-size:18px" x="406" y="205">C</text><text style="font-size:18px" x="300" y="60" fill="#8fd0ff">三中線交於重心</text>`,
          list: ["外心：中垂線交點，到三<b>頂點</b>等距；直角三角形外心＝斜邊中點", "內心：角平分線交點，到三<b>邊</b>等距；面積 $=\\frac{\\text{周長}\\times r}{2}$", "重心：中線交點，$\\overline{AG}:\\overline{GM}=2:1$，面積六等分"] },
        { btn: "問面積比", ch: "相似形：面積比",
          fig: `<path d="M110,190 L60,190 L80,130 Z" fill="rgba(246,220,154,.25)" stroke="#f6dc9a" stroke-width="2.5"/><path d="M420,190 L270,190 L330,10 Z" fill="rgba(205,197,255,.15)" stroke="#cdc5ff" stroke-width="2.5"/>` +
            `<text style="font-size:18px" x="58" y="212" fill="#f6dc9a">邊 1 → 面積 1</text><text style="font-size:18px" x="270" y="212" fill="#cdc5ff">邊 3 倍 → 面積 9 倍</text><text style="font-size:18px" x="118" y="100" fill="#fff">相似比 k → 面積比 k²</text>`,
          list: ["相似：面積比 ＝ 相似比的平方；周長比 ＝ 相似比", "同高的三角形：面積比 ＝ 底的比（重心六等分就是這樣來的）", "先確認兩圖形真的相似（AA、SAS、SSS），再用 $k^2$"] },
        { btn: "要寫證明", ch: "推理證明",
          fig: `<path d="M60,180 L130,60 L200,180 Z" fill="none" stroke="#cdc5ff" stroke-width="2.5"/><path d="M280,180 L340,80 L400,180 Z" fill="none" stroke="#cdc5ff" stroke-width="2.5"/><path d="M78,180 A18,18 0 0 0 69,164.5" fill="none" stroke="#f6dc9a" stroke-width="3"/><path d="M296,180 A16,16 0 0 0 288,166.2" fill="none" stroke="#f6dc9a" stroke-width="3"/><path d="M182,180 A18,18 0 0 1 191,164.5" fill="none" stroke="#8fd0ff" stroke-width="3"/><path d="M384,180 A16,16 0 0 1 392,166.2" fill="none" stroke="#8fd0ff" stroke-width="3"/>` +
            `<text style="font-size:18px" x="150" y="30" fill="#f6dc9a">因為 … 所以 …（理由）</text><text x="206" y="138" style="font-size:34px">∼</text><text style="font-size:18px" x="120" y="210" fill="#8fd0ff">兩角相等 → AA 相似</text>`,
          list: ["每一步寫「因為（已知）所以（結論）」並註明理由：定義、性質、判定", "相似判定：AA、SAS、SSS；全等判定：SSS、SAS、ASA、AAS、RHS", "最後一行寫出要證的結論；計算題也要寫出算式"] }
      ];
      H.toggle(stage, cases.map(c => c.btn), i => {
        const c = cases[i];
        g.innerHTML = c.fig;
        out.set(`<span class="tag">${c.ch}</span> 叫出這些法則：<ul style="margin:6px 0 0 1.2em;padding:0">${c.list.map(x => `<li>${x}</li>`).join("")}</ul>`);
      });
      /* 讓按鈕在圖下方、讀數之上 */
      stage.insertBefore(stage.lastChild, out.el);
    },

    /* 平行線滑過三角形 */
    parallelSlide(stage, H) {
      const A = [200, 28], B = [50, 295], C = [430, 295], M = [(B[0] + C[0]) / 2, B[1]];
      const G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
      const svg = H.svg(stage, 480, 330);
      const trap = H.el("path", { fill: "rgba(205,197,255,.16)", stroke: "none" }, svg);
      const small = H.el("path", { fill: "rgba(246,220,154,.30)", stroke: "none" }, svg);
      H.el("path", { d: `M${A} L${B} L${C} Z`, fill: "none", stroke: "#cdc5ff", "stroke-width": 2.5 }, svg);
      const med = H.el("line", { x1: A[0], y1: A[1], x2: M[0], y2: M[1], stroke: "#8fd0ff", "stroke-width": 1.5, "stroke-dasharray": "5 4" }, svg);
      const de = H.el("line", { stroke: "#f6dc9a", "stroke-width": 3.5 }, svg);
      const gDot = H.el("circle", { cx: G[0], cy: G[1], r: 5, fill: "#ff8fa3" }, svg);
      H.el("text", { x: G[0] + 9, y: G[1] - 8, text: "G", fill: "#ff8fa3" }, svg);
      H.el("text", { x: A[0] - 5, y: A[1] - 8, text: "A" }, svg);
      H.el("text", { x: B[0] - 16, y: B[1] + 16, text: "B" }, svg);
      H.el("text", { x: C[0] + 6, y: C[1] + 16, text: "C" }, svg);
      H.el("text", { x: M[0] - 5, y: M[1] + 20, text: "M", fill: "#8fd0ff" }, svg);
      H.el("text", { x: 300, y: 318, text: "BC = 12", fill: "#cdc5ff" }, svg);
      const tD = H.el("text", { text: "D" }, svg), tE = H.el("text", { text: "E" }, svg), tDE = H.el("text", { fill: "#f6dc9a", "font-weight": 700 }, svg);
      const out = H.readout(stage);
      H.slider(stage, { label: "k = AD : AB", min: 0.1, max: 0.95, step: 0.01, value: 0.5, fmt: v => Math.abs(v - 2 / 3) < 0.016 ? "2/3" : H.fmt(v, 2) }, k => {
        const snap = Math.abs(k - 2 / 3) < 0.016; if (snap) k = 2 / 3;
        const D = [A[0] + k * (B[0] - A[0]), A[1] + k * (B[1] - A[1])], E = [A[0] + k * (C[0] - A[0]), A[1] + k * (C[1] - A[1])];
        H.set(de, { x1: D[0], y1: D[1], x2: E[0], y2: E[1] });
        H.set(small, { d: `M${A} L${D} L${E} Z` }); H.set(trap, { d: `M${D} L${B} L${C} L${E} Z` });
        H.set(tD, { x: D[0] - 20, y: D[1] + 5 }); H.set(tE, { x: E[0] + 8, y: E[1] + 5 });
        H.set(tDE, { x: D[0] + 10, y: D[1] - 8, text: k > 0.4 ? "DE = " + H.fmt(12 * k, 2) : "" });
        H.set(gDot, { r: snap ? 8 : 5 });
        const ks = snap ? "\\tfrac{2}{3}" : H.fmt(k, 2), k2 = snap ? "\\tfrac{4}{9}" : H.fmt(k * k, 4), r2 = snap ? "\\tfrac{5}{9}" : H.fmt(1 - k * k, 4);
        out.set(`$\\dfrac{\\overline{AD}}{\\overline{AB}}=\\dfrac{\\overline{AE}}{\\overline{AC}}=\\dfrac{\\overline{DE}}{\\overline{BC}}=${ks}$，$\\overline{DE}=12\\times ${ks}=${H.fmt(12 * k, 2)}$<br>` +
          `面積比 $\\triangle ADE:\\triangle ABC=\\left(${ks}\\right)^2=$ <span class="big">${snap ? "4 : 9" : H.fmt(k * k, 4)}</span>，梯形 $DBCE$ 占 $1-${k2}=${r2}$` +
          (snap ? `<br><span class="tag">通過重心</span> $\\overline{AG}:\\overline{AM}=2:3$，所以過重心的平行線截出相似比 $2:3$、面積比 $4:9$。` : ""));
      });
    }
  }
};
