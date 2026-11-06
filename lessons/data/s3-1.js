/* 3-1 幾何推理與證明（康軒九上 第 3 章 推理證明）
   對應 108 課綱：S-9-11 證明的意義（幾何推理、代數推理） */
window.MATHORIA_LESSON = {
  title: "3-1 幾何推理與證明",
  unit: "康軒 九上 ・ 第 3 章 推理證明",
  subtitle: "每一步都說出「因為…所以…」和依據的性質，結論才站得住腳。",
  codes: ["S-9-11 證明的意義"],
  time: "2 節課",
  goals: [
    "知道證明的格式：已知、求證、證明，並能在每一步寫出所依據的性質",
    "熟悉推理工具箱：對頂角、平行線、內角和、外角、等腰三角形、全等性質、平行四邊形",
    "會用全等三角形與輔助線完成幾何證明，並分辨 SSA、AAA 為什麼不能判斷全等",
    "會用代數式表示整數、奇數、偶數，完成代數推理，並知道舉例不等於證明"
  ],
  sections: [
    { type: "story", lines: [
      { who: "narrator", text: "真理審判庭的天平上，刻著一行字：「沒有理由的主張，一律無效。」" },
      { who: "boss", text: "我是{boss}！等腰三角形兩底角相等？因為它是等腰三角形，兩底角當然相等，證畢！哈哈，多簡單～" },
      { who: "pet", text: "{name}，小心！它把要證的結論直接當成理由了，這叫「循環論證」" },
      { who: "player", text: "所以證明要從「已知」出發，每一步都寫出「因為…所以…」和用到的性質？" },
      { who: "boss", text: "哼，看圖就知道一樣長了，還寫什麼理由？漏一兩個條件，天平也不會發現吧！" },
      { who: "player", text: "天平會發現的。我要一步一步，把每個理由都擺上去！" }
    ] },

    { type: "concept", title: "什麼是證明？", html: `
      <p>在數學裡，一個敘述要成為「對的」，不能只靠看起來、量起來或舉幾個例子，必須從<b>已經確定的事實</b>出發，一步一步推到結論。這個過程叫做<b>證明</b>。</p>
      <div class="key"><b>證明的格式</b><br>
        <b>已知</b>：題目給的條件（可以直接拿來用）。<br>
        <b>求證</b>：要證明的結論（證完之前<b>不能</b>拿來用）。<br>
        <b>證明</b>：每一步寫成「因為…，所以…」，並在後面註明所依據的性質或定義。</div>
      <p>先看一個小例子：證明「對頂角相等」。</p>
      <div class="fig"><svg viewBox="0 0 320 170">
        <line x1="30" y1="140" x2="290" y2="30" stroke="#cdc5ff" stroke-width="2.5"/>
        <line x1="30" y1="40" x2="290" y2="130" stroke="#8fd0ff" stroke-width="2.5"/>
        <circle cx="160" cy="85" r="3.5" fill="#fff"/>
        <text x="190" y="90" fill="#f6dc9a" font-size="15">1</text>
        <text x="155" y="66" fill="#ff8fa3" font-size="15">2</text>
        <text x="120" y="90" fill="#f6dc9a" font-size="15">3</text>
        <text x="155" y="116" fill="#5fd3a8" font-size="15">4</text>
      </svg></div>
      <p><b>已知</b>：兩直線相交，$\\angle 1$ 與 $\\angle 3$ 是對頂角。　<b>求證</b>：$\\angle 1=\\angle 3$。</p>
      <p><b>證明</b>：<br>
        因為 $\\angle 1$ 與 $\\angle 2$ 合成一個平角，所以 $\\angle 1+\\angle 2=180^\\circ$。（平角為 $180^\\circ$）<br>
        因為 $\\angle 2$ 與 $\\angle 3$ 合成一個平角，所以 $\\angle 2+\\angle 3=180^\\circ$。（平角為 $180^\\circ$）<br>
        所以 $\\angle 1+\\angle 2=\\angle 2+\\angle 3$，兩邊同減 $\\angle 2$，得 $\\angle 1=\\angle 3$。（等量減等量，差相等）　∎</p>
      <p class="note">已經證明過的性質，之後就可以放進「工具箱」當理由使用。像這樣把性質一個一個證出來、再拿來證新的事，數學就越蓋越高。</p>
    ` },

    { type: "concept", title: "推理工具箱：可以當理由的性質", html: `
      <p>國中學過、已經確定成立的性質，都可以寫在每一步後面當理由：</p>
      <div class="table-wrap"><table>
        <tr><th>類別</th><th>可以使用的性質</th></tr>
        <tr><td>角</td><td>平角 $180^\\circ$；<b>對頂角相等</b></td></tr>
        <tr><td>平行線</td><td>兩平行線被一直線所截：<b>同位角相等</b>、<b>內錯角相等</b>、<b>同側內角互補</b></td></tr>
        <tr><td>三角形的角</td><td><b>內角和 $180^\\circ$</b>；<b>外角定理</b>：外角等於兩個內對角的和</td></tr>
        <tr><td>等腰三角形</td><td>兩腰相等的三角形，<b>兩底角相等</b></td></tr>
        <tr><td>全等</td><td>判斷全等：<b>SSS、SAS、ASA、AAS、RHS</b><br>全等之後：<b>對應邊相等、對應角相等</b></td></tr>
        <tr><td>平行四邊形</td><td>兩組對邊分別平行（定義）；<b>對邊相等、對角相等、對角線互相平分</b></td></tr>
        <tr><td>其他</td><td>已知條件、定義（如中點、角平分線）、<b>共用邊</b>、等量代換、等量加減</td></tr>
      </table></div>
      <div class="key"><b>使用工具箱的兩個規則</b><br>
        ① 只能用<b>已知條件</b>和<b>已經成立的性質</b>；要證的結論在證出來之前不能用。<br>
        ② 「看起來相等」「量起來一樣」都<b>不是</b>理由。</div>
      <p class="note">在某一題裡，如果要證的正好是工具箱中的性質（例如證明「等腰三角形兩底角相等」），那這一題就<b>不能</b>拿它當理由，否則就是循環論證。</p>
    ` },

    { type: "widget", title: "證明建造器：替每一步選理由", widget: "proofBuilder",
      intro: "先選一題證明。每一步的敘述都寫好了，請從按鈕中選出正確的<b>理由</b>。選對了，圖上會標出新得到的條件。",
      caption: "注意證明一：要證的是 $\\angle B=\\angle C$，所以「等腰三角形兩底角相等」在這題不能當理由。" },

    { type: "concept", title: "全等性質：哪些能用，哪些不能用", html: `
      <p>全等是幾何證明最常用的工具：先證出兩個三角形全等，再用「對應邊相等、對應角相等」得到想要的結論。判斷全等只能用下面五種：</p>
      <div class="table-wrap"><table>
        <tr><th>性質</th><th>對應相等的部分</th></tr>
        <tr><td><b>SSS</b></td><td>三邊</td></tr>
        <tr><td><b>SAS</b></td><td>兩邊與它們的<b>夾角</b></td></tr>
        <tr><td><b>ASA</b></td><td>兩角與它們的<b>夾邊</b></td></tr>
        <tr><td><b>AAS</b></td><td>兩角與其中一角的<b>對邊</b></td></tr>
        <tr><td><b>RHS</b></td><td>直角三角形的<b>斜邊</b>與一股</td></tr>
      </table></div>
      <div class="key"><b>不能判斷全等的兩種</b><br>
        <b>AAA</b>：三個角相等，只能保證形狀相同，大小可以不同（例如邊長 3、4、5 和 6、8、10 的三角形）。<br>
        <b>SSA</b>：兩邊與一個<b>不是夾角</b>的角相等，可能畫出兩個不同的三角形。</div>
      <p class="note">RHS 看起來像「兩邊和非夾角」，但它多了「這個角是直角」的條件，所以三角形只有一種畫法。在國中的全等性質中，這是「兩邊和非夾角」唯一被列為全等性質的情形。</p>
    ` },

    { type: "widget", title: "全等條件檢查器", widget: "congruenceCheck",
      intro: "點選按鈕（或直接點圖上的邊、角），勾選 $\\triangle ABC$ 與 $\\triangle DEF$ 中已知對應相等的部分，看看能不能判斷全等。",
      caption: "切換到「直角三角形」時，$\\angle C=\\angle F=90^\\circ$ 已經知道，試試只再選斜邊和一股。" },

    { type: "widget", title: "反例實驗：SSA 會畫出兩個三角形", widget: "ssaSwing",
      intro: "固定 $\\angle A=35^\\circ$、$\\overline{AB}=6$。拉動滑桿改變 $\\overline{BC}$ 的長度，看看以 $B$ 為圓心、$\\overline{BC}$ 為半徑的圓和射線交在哪裡。",
      caption: "當 $\\overline{BC}$ 介於「$B$ 到射線的距離」和 $6$ 之間時，同樣的兩邊一角可以畫出兩個不同的三角形，所以 SSA 不能保證全等。" },

    { type: "example", title: "例題 1　輔助線：三角形內角和為什麼是 180°",
      problem: "<b>已知</b>：$\\triangle ABC$。<b>求證</b>：$\\angle A+\\angle B+\\angle C=180^\\circ$。",
      figure: `<svg viewBox="0 0 310 200"><line x1="20" y1="40" x2="290" y2="40" stroke="#8fd0ff" stroke-width="2" stroke-dasharray="6 5"/><path d="M150,40 L60,170 L260,170 Z" fill="rgba(167,155,240,.15)" stroke="#cdc5ff" stroke-width="2.5"/><path d="M128,40 A22,22 0 0 0 137.5,58.1" fill="none" stroke="#ff8fa3" stroke-width="2.5"/><path d="M72.5,151.9 A22,22 0 0 1 82,170" fill="none" stroke="#ff8fa3" stroke-width="2.5"/><path d="M172,40 A22,22 0 0 1 164.2,56.8" fill="none" stroke="#5fd3a8" stroke-width="2.5"/><path d="M238,170 A22,22 0 0 1 245.8,153.2" fill="none" stroke="#5fd3a8" stroke-width="2.5"/><text x="144" y="30">A</text><text x="42" y="186">B</text><text x="266" y="186">C</text><text x="22" y="32" fill="#8fd0ff">D</text><text x="278" y="32" fill="#8fd0ff">E</text></svg>`,
      steps: [
        "過 $A$ 作直線 $DE\\parallel\\overline{BC}$（<b>輔助線</b>：原圖沒有、為了證明而加畫的線）。",
        "因為 $DE\\parallel\\overline{BC}$，$\\overline{AB}$ 是截線，所以 $\\angle DAB=\\angle B$。（兩平行線的內錯角相等）",
        "同理，$\\overline{AC}$ 是截線，所以 $\\angle EAC=\\angle C$。（兩平行線的內錯角相等）",
        "因為 $D$、$A$、$E$ 在同一直線上，所以 $\\angle DAB+\\angle BAC+\\angle EAC=180^\\circ$。（平角為 $180^\\circ$）",
        "把相等的角代換進去，得 $\\angle B+\\angle BAC+\\angle C=180^\\circ$，即 $\\angle A+\\angle B+\\angle C=180^\\circ$。（等量代換）∎"
      ],
      answer: "畫一條平行線，把三個內角「搬」到同一個平角上，就證出內角和 $180^\\circ$。" },

    { type: "example", title: "例題 2　用全等證明中點",
      problem: "如圖，$\\overline{AD}$ 與 $\\overline{BC}$ 交於 $E$，$\\overline{AB}\\parallel\\overline{CD}$，且 $E$ 是 $\\overline{AD}$ 的中點。證明：$E$ 也是 $\\overline{BC}$ 的中點。",
      figure: `<svg viewBox="0 0 300 220"><path d="M60,40 L220,40 L150,110 Z" fill="rgba(95,211,168,.16)"/><path d="M240,180 L80,180 L150,110 Z" fill="rgba(255,143,163,.16)"/><line x1="60" y1="40" x2="220" y2="40" stroke="#8fd0ff" stroke-width="2.5"/><line x1="80" y1="180" x2="240" y2="180" stroke="#8fd0ff" stroke-width="2.5"/><line x1="60" y1="40" x2="240" y2="180" stroke="#cdc5ff" stroke-width="2.5"/><line x1="220" y1="40" x2="80" y2="180" stroke="#cdc5ff" stroke-width="2.5"/><line x1="100.6" y1="80.2" x2="109.4" y2="68.8" stroke="#f6dc9a" stroke-width="2.5"/><line x1="190.6" y1="150.2" x2="199.4" y2="138.8" stroke="#f6dc9a" stroke-width="2.5"/><text x="44" y="38">A</text><text x="226" y="38">B</text><text x="66" y="198">C</text><text x="244" y="198">D</text><text x="164" y="114">E</text></svg>`,
      steps: [
        "<b>已知</b>：$\\overline{AB}\\parallel\\overline{CD}$，$\\overline{AE}=\\overline{DE}$。<b>求證</b>：$\\overline{BE}=\\overline{CE}$。",
        "因為 $\\overline{AB}\\parallel\\overline{CD}$，$\\overline{AD}$ 是截線，所以 $\\angle BAE=\\angle CDE$。（兩平行線的內錯角相等）",
        "因為 $E$ 是 $\\overline{AD}$ 的中點，所以 $\\overline{AE}=\\overline{DE}$。（中點的定義）",
        "因為 $\\angle AEB$ 與 $\\angle DEC$ 是對頂角，所以 $\\angle AEB=\\angle DEC$。（對頂角相等）",
        "在 $\\triangle ABE$ 與 $\\triangle DCE$ 中，$\\overline{AE}$、$\\overline{DE}$ 分別夾在這兩組相等的角之間，所以 $\\triangle ABE\\cong\\triangle DCE$。（ASA 全等）",
        "所以 $\\overline{BE}=\\overline{CE}$（全等三角形對應邊相等），即 $E$ 是 $\\overline{BC}$ 的中點。∎"
      ],
      answer: "依序用「內錯角相等、中點定義、對頂角相等」湊出 ASA，再由對應邊相等得證。" },

    { type: "concept", title: "代數推理：用文字符號說明「所有」情形", html: `
      <p>「任意兩個偶數的和是偶數」這種敘述講的是<b>無限多個</b>數，不可能一個一個驗證。這時要用<b>文字符號</b>代表任意整數，再用代數性質推導，這就是<b>代數推理</b>。</p>
      <div class="table-wrap"><table>
        <tr><th>要表示的數</th><th>寫法（$n$ 為整數）</th></tr>
        <tr><td>任意偶數</td><td>$2n$</td></tr>
        <tr><td>任意奇數</td><td>$2n+1$（或 $2n-1$）</td></tr>
        <tr><td>三個連續整數</td><td>$n-1,\\;n,\\;n+1$</td></tr>
        <tr><td>兩個連續奇數</td><td>$2n-1,\\;2n+1$</td></tr>
        <tr><td>$k$ 的倍數</td><td>$k\\times(\\text{整數})$</td></tr>
      </table></div>
      <div class="key"><b>代數推理常用的依據</b><br>
        加法、乘法的交換律與結合律；分配律；乘法公式（和的平方、差的平方、平方差）；<br>
        整數相加、相減、相乘的結果仍是整數；倍數、奇數、偶數的定義。</div>
      <p><b>範例：偶數＋奇數＝奇數。</b>設偶數為 $2m$、奇數為 $2n+1$（$m$、$n$ 為整數）。</p>
      $$2m+(2n+1)=2(m+n)+1\\quad\\text{（結合律、分配律）}$$
      <p>因為 $m+n$ 是整數（整數相加仍是整數），所以 $2(m+n)+1$ 是奇數（奇數的定義）。∎</p>
      <p class="note">為什麼要用兩個不同的字母 $m$、$n$？如果寫成 $2n$ 和 $2n+1$，就只證到「相鄰」的偶數和奇數（例如 4 和 5），沒有包含 4 和 9 這種情形。</p>
      <div class="key"><b>例子、證明與反例</b><br>
        舉再多例子都<b>不算證明</b>，因為例子永遠只是一部分情形。<br>
        但只要找到<b>一個反例</b>，就能推翻一個敘述。例如「兩個質數的和都是偶數」，只要舉出 $2+3=5$ 就知道它是錯的。</div>
    ` },

    { type: "example", title: "例題 3　三個連續整數的和",
      problem: "證明：任意三個連續整數的和是 3 的倍數。",
      steps: [
        "設中間的整數為 $n$，則三個連續整數是 $n-1$、$n$、$n+1$。（連續整數相差 1）",
        "$(n-1)+n+(n+1)=(n+n+n)+(-1+1)=3n$。（加法交換律、結合律）",
        "因為 $n$ 是整數，所以 $3n$ 是 3 的倍數。（倍數的定義）∎",
        "驗算一個例子：$7+8+9=24=3\\times 8$，中間數正是 8。例子只是幫忙檢查，真正的證明是上面的代數推理。"
      ],
      answer: "三數和 $=3n$，$n$ 為整數，所以必為 3 的倍數。" },

    { type: "example", title: "例題 4　兩個連續奇數的平方差",
      problem: "證明：兩個連續奇數中，大數的平方減去小數的平方，一定是 8 的倍數。",
      steps: [
        "設兩個連續奇數為 $2n-1$ 和 $2n+1$（$n$ 為整數）。",
        "$(2n+1)^2=4n^2+4n+1$，$(2n-1)^2=4n^2-4n+1$。（和的平方、差的平方公式）",
        "$(2n+1)^2-(2n-1)^2=(4n^2+4n+1)-(4n^2-4n+1)=8n$。（去括號、合併同類項）",
        "也可用平方差公式：$\\big[(2n+1)+(2n-1)\\big]\\big[(2n+1)-(2n-1)\\big]=4n\\times 2=8n$。",
        "因為 $n$ 是整數，所以 $8n$ 是 8 的倍數。（倍數的定義）∎　例如 $7^2-5^2=49-25=24=8\\times 3$。"
      ],
      answer: "平方差 $=8n$，$n$ 為整數，所以必為 8 的倍數。" },

    { type: "myth", title: "破解{boss}的幻術", items: [
      { wrong: "要證等腰三角形兩底角相等：「因為兩底角相等，所以它是等腰三角形，所以兩底角相等。」", right: "要證的結論在證出來之前<b>不能</b>當理由，這叫<b>循環論證</b>。", why: "正確做法是從已知 $\\overline{AB}=\\overline{AC}$ 出發，作角平分線，用 SAS 全等推出 $\\angle B=\\angle C$。" },
      { wrong: "圖上 $\\overline{AB}$ 和 $\\overline{CD}$ 看起來平行，所以可以用內錯角相等。", right: "只有<b>已知</b>或<b>已證明</b>平行，才能用平行線的性質。", why: "圖形可能畫得不準。「看起來」「量起來」都不能當理由。" },
      { wrong: "「對頂角相等」成立，所以「相等的兩個角一定是對頂角」也成立。", right: "一個敘述成立，它的<b>逆敘述</b>不一定成立，要另外判斷。", why: "反例：等腰三角形的兩個底角相等，但它們不是對頂角。" },
      { wrong: "兩個三角形有兩邊和一角對應相等（SSA），或三個角對應相等（AAA），就全等。", right: "SSA 和 AAA <b>都不是</b>全等性質。", why: "SSA 可能畫出兩個不同的三角形；AAA 只保證形狀相同，大小可以不同。" }
    ] },

    { type: "practice", title: "即時練習", items: [
      { q: "在 $\\triangle ABC$ 與 $\\triangle DEF$ 中，下列哪一組條件<b>不能</b>判斷兩三角形全等？",
        o: ["$\\overline{AB}=\\overline{DE}$、$\\overline{BC}=\\overline{EF}$、$\\angle A=\\angle D$", "$\\angle A=\\angle D$、$\\angle B=\\angle E$、$\\overline{BC}=\\overline{EF}$", "$\\overline{AB}=\\overline{DE}$、$\\overline{BC}=\\overline{EF}$、$\\overline{CA}=\\overline{FD}$", "$\\angle A=\\angle D$、$\\overline{AB}=\\overline{DE}$、$\\angle B=\\angle E$"], a: 0,
        ex: "$\\angle A$ 不是 $\\overline{AB}$ 與 $\\overline{BC}$ 的夾角（夾角是 $\\angle B$），這是 SSA，不能判斷全等。其他依序是 AAS、SSS、ASA。" },
      { q: "小明想證明「等腰三角形兩底角相等」，他寫：「因為 $\\triangle ABC$ 是等腰三角形，所以 $\\angle B=\\angle C$（等腰三角形兩底角相等）。」這個證明有什麼問題？",
        o: ["把要證的結論當成理由，是循環論證", "沒有畫圖，所以不算", "應該改用 SSS 全等才對", "沒有問題，這樣就完成了"], a: 0,
        ex: "要證的就是「等腰三角形兩底角相等」，不能拿它自己當理由。應該作 $\\angle A$ 的角平分線，用 SAS 證出兩個三角形全等。" },
      { q: "敘述「若 $a=b$，則 $a^2=b^2$」是對的。它的逆敘述「若 $a^2=b^2$，則 $a=b$」可以用下列哪一組數當反例推翻？",
        o: ["$a=2$，$b=-2$", "$a=3$，$b=3$", "$a=0$，$b=0$", "$a=1$，$b=2$"], a: 0,
        ex: "$2^2=(-2)^2=4$，但 $2\\neq -2$，所以逆敘述不成立。$a=1$、$b=2$ 不滿足 $a^2=b^2$，不能當反例。可見原敘述對，逆敘述不一定對。" },
      { q: "平行四邊形 $ABCD$ 的對角線交於 $O$。若 $\\overline{AC}=14$，則 $\\overline{AO}=$？",
        answer: ["7"], show: "7", ex: "平行四邊形的對角線互相平分，所以 $\\overline{AO}=14\\div 2=7$。" },
      { q: `如圖，$\\overline{AB}\\parallel\\overline{CD}$，點 $E$ 在兩平行線之間，$\\angle ABE=40^\\circ$，$\\angle CDE=30^\\circ$，則 $\\angle BED$ 是幾度？<div class="fig"><svg viewBox="0 0 340 190"><line x1="40" y1="40" x2="320" y2="40" stroke="#8fd0ff" stroke-width="2.5"/><line x1="40" y1="153.3" x2="320" y2="153.3" stroke="#8fd0ff" stroke-width="2.5"/><line x1="80" y1="40" x2="160" y2="107.1" stroke="#cdc5ff" stroke-width="2.5"/><line x1="80" y1="153.3" x2="160" y2="107.1" stroke="#cdc5ff" stroke-width="2.5"/><circle cx="160" cy="107.1" r="3.5" fill="#fff"/><text x="70" y="30">B</text><text x="306" y="30">A</text><text x="70" y="175">D</text><text x="306" y="175">C</text><text x="168" y="112">E</text><text x="112" y="58" fill="#f6dc9a" font-size="13">40°</text><text x="112" y="150" fill="#f6dc9a" font-size="13">30°</text></svg></div>`,
        answer: ["70"], show: "$70^\\circ$", hint: "過 $E$ 作一條和 $\\overline{AB}$ 平行的輔助線。",
        ex: "過 $E$ 作 $\\overline{EF}\\parallel\\overline{AB}$（$F$ 在 $E$ 的左側），則 $\\overline{EF}\\parallel\\overline{CD}$。由內錯角相等，$\\angle BEF=\\angle ABE=40^\\circ$，$\\angle FED=\\angle CDE=30^\\circ$，所以 $\\angle BED=40^\\circ+30^\\circ=70^\\circ$。" },
      { q: "設 $n$ 為整數，兩個連續奇數 $2n-1$、$2n+1$ 的平方差 $(2n+1)^2-(2n-1)^2$ 化簡後等於 $kn$，則 $k=$？",
        answer: ["8"], show: "8", ex: "$(4n^2+4n+1)-(4n^2-4n+1)=8n$，所以 $k=8$，平方差一定是 8 的倍數。" },
      { q: "小華驗算了 $1+2+3$、$4+5+6$、$10+11+12$ 都是 3 的倍數，就說「任意三個連續整數的和是 3 的倍數」已經證明完成。下列敘述何者正確？",
        o: ["還不算證明：例子再多也只是一部分情形，要用代數推理", "已經證明完成，因為驗算了超過兩個例子", "原敘述是錯的，因為 $2+3+4$ 不是 3 的倍數", "要再驗算 100 個例子才算證明"], a: 0,
        ex: "舉例只能檢查，不能證明「所有」情形。設三數為 $n-1$、$n$、$n+1$，和為 $3n$ 才是證明。另外 $2+3+4=9$ 是 3 的倍數，不是反例。" },
      { q: "設 $m$、$n$ 為整數。下列哪一個推導，可以證明「任意偶數加任意奇數是奇數」？",
        o: ["$2m+(2n+1)=2(m+n)+1$", "$2n+(2n+1)=4n+1$", "$2+3=5$，5 是奇數", "$2m+(2n+1)=2(m+n+1)$"], a: 0,
        ex: "$m+n$ 是整數，所以 $2(m+n)+1$ 是奇數。用同一個 $n$ 只證到相鄰的偶數與奇數；只舉 $2+3$ 是例子不是證明；最後一個選項算錯了，$2(m+n+1)=2m+2n+2$。" }
    ] },

    { type: "summary", title: "重點整理", items: [
      "證明的格式：<b>已知</b>（可直接用）、<b>求證</b>（證完前不能用）、<b>證明</b>（每一步「因為…所以…」並註明性質）。",
      "工具箱：對頂角相等；平行線的同位角、內錯角相等，同側內角互補；內角和 $180^\\circ$；外角定理；等腰三角形底角相等；平行四邊形性質。",
      "全等性質只有 SSS、SAS、ASA、AAS、RHS；全等後可得對應邊、對應角相等。SSA 與 AAA 不能判斷全等。",
      "遇到條件不夠時，可以加畫<b>輔助線</b>（平行線、角平分線、連線），製造可用的角或全等三角形。",
      "代數推理：用 $2n$、$2n+1$、$n-1,n,n+1$ 等表示任意整數，再用運算律、乘法公式、倍數定義推導。",
      "常見錯誤：循環論證、用「看起來」當理由、把逆敘述當成成立。舉例不算證明，但一個反例就能推翻敘述。"
    ] },

    { type: "extend", title: "高中延伸：反證法與逆否命題", where: "高中數學第一冊 ・ 數與式（實數：√2 是無理數）；四種命題為補充", html: `
      <p>國中用「直接證明」：從已知一路推到結論。高中會多學一種很強的方法——<b>反證法</b>：先假設結論<b>不成立</b>，推出矛盾，就說明結論一定成立。</p>
      <h3>1. 四種命題</h3>
      <p>原命題「若 $p$，則 $q$」可以變出另外三個命題：</p>
      <div class="table-wrap"><table>
        <tr><th>名稱</th><th>形式</th></tr>
        <tr><td>原命題</td><td>若 $p$，則 $q$</td></tr>
        <tr><td>逆命題</td><td>若 $q$，則 $p$</td></tr>
        <tr><td>否命題</td><td>若非 $p$，則非 $q$</td></tr>
        <tr><td>逆否命題</td><td>若非 $q$，則非 $p$</td></tr>
      </table></div>
      <div class="key"><b>原命題與逆否命題同真同假</b>（逆命題與否命題也同真同假）。<br>
        但原命題對，逆命題不一定對——這就是國中說的「逆敘述不一定成立」。</div>
      <p><b>小例子</b>：證明「若 $n^2$ 是偶數，則 $n$ 是偶數」（$n$ 為整數）。直接證不好下手，改證它的逆否命題「若 $n$ 是奇數，則 $n^2$ 是奇數」：設 $n=2k+1$（$k$ 為整數），</p>
      $$n^2=4k^2+4k+1=2(2k^2+2k)+1$$
      <p>是奇數，所以逆否命題成立，原命題也成立。</p>
      <h3>2. 反證法：$\\sqrt{2}$ 是無理數</h3>
      <p><b>假設</b> $\\sqrt{2}$ 是有理數，則可寫成 $\\sqrt{2}=\\dfrac{p}{q}$，其中 $p$、$q$ 是正整數且<b>互質</b>（已約到最簡）。</p>
      <ol>
        <li>兩邊平方：$2=\\dfrac{p^2}{q^2}$，所以 $p^2=2q^2$，$p^2$ 是偶數。</li>
        <li>由上面的小例子，$p$ 是偶數，設 $p=2k$，代入得 $4k^2=2q^2$，即 $q^2=2k^2$。</li>
        <li>所以 $q^2$ 是偶數，同理 $q$ 也是偶數。</li>
        <li>$p$、$q$ 都是偶數，有公因數 2，和「互質」<b>矛盾</b>。</li>
      </ol>
      <p>所以假設錯誤，$\\sqrt{2}$ 不是有理數，也就是 $\\sqrt{2}$ 是<b>無理數</b>。∎</p>
      <p class="note">反證法的精神和「反例」剛好相反：反例是舉一個例子推翻別人的敘述；反證法是假設結論錯，從邏輯上推出不可能，來確認自己的敘述。</p>
    ` }
  ],

  /* ================= 互動圖 ================= */
  widgets: {
    /* 證明建造器：每一步選理由 */
    proofBuilder(stage, H) {
      const C = { lav: "#cdc5ff", gold: "#f6dc9a", sky: "#8fd0ff", pink: "#ff8fa3", green: "#5fd3a8" };
      const mid = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
      const PROOFS = [
        {
          given: "$\\triangle ABC$ 中，$\\overline{AB}=\\overline{AC}$。",
          prove: "$\\angle B=\\angle C$",
          aux: "作 $\\angle A$ 的角平分線，交 $\\overline{BC}$ 於 $D$。",
          pts: { A: [240, 40], B: [100, 280], C: [380, 280], D: [240, 280] },
          lab: { A: [234, 28], B: [80, 298], C: [388, 298], D: [234, 304] },
          base: [["A", "B"], ["B", "C"], ["C", "A"]], dash: [["A", "D"]],
          steps: [
            { s: "$\\overline{AB}=\\overline{AC}$", ok: "已知", opts: ["已知", "等腰三角形兩底角相等", "看圖量起來一樣長"],
              no: { "等腰三角形兩底角相等": "這是要證的結論（而且講的是角），在這題不能拿來當理由。", "看圖量起來一樣長": "圖可能畫得不準，「量起來」不是理由。這是題目給的條件。" },
              mark: g => { g.tick("A", "B", 1, C.gold); g.tick("A", "C", 1, C.gold); } },
            { s: "$\\angle BAD=\\angle CAD$", ok: "AD 是∠A 的角平分線（作圖）", opts: ["AD 是∠A 的角平分線（作圖）", "對頂角相等", "等腰三角形兩底角相等"],
              no: { "對頂角相等": "∠BAD 和 ∠CAD 是相鄰的兩個角，不是兩直線相交形成的對頂角。", "等腰三角形兩底角相等": "這是要證的結論，不能先用（循環論證）！而且底角是 ∠B、∠C。" },
              mark: g => { g.arc("A", "B", "D", 30, C.pink); g.arc("A", "D", "C", 36, C.pink); } },
            { s: "$\\overline{AD}=\\overline{AD}$", ok: "共用邊", opts: ["共用邊", "已知", "D 是 BC 的中點"],
              no: { "已知": "題目沒有給這個條件；它成立是因為兩個三角形共用同一條邊。", "D 是 BC 的中點": "D 是不是中點現在還不知道（要等證出全等才知道），不能拿來用。" },
              mark: g => g.seg("A", "D", C.sky, 4) },
            { s: "$\\triangle ABD\\cong\\triangle ACD$", ok: "SAS 全等", opts: ["SAS 全等", "SSA 全等", "SSS 全等", "AAA 全等"],
              no: { "SSA 全等": "SSA 不是全等性質。而且 ∠BAD、∠CAD 正好夾在兩組相等的邊之間。", "SSS 全等": "我們不知道 BD=CD，只知道兩組邊相等。", "AAA 全等": "AAA 不是全等性質，而且目前只知道一組角相等。" },
              mark: g => { g.poly(["A", "B", "D"], "rgba(95,211,168,.2)"); g.poly(["A", "D", "C"], "rgba(143,208,255,.2)"); } },
            { s: "$\\angle B=\\angle C$", ok: "全等三角形對應角相等", opts: ["全等三角形對應角相等", "三角形內角和 180°", "等腰三角形兩底角相等"],
              no: { "三角形內角和 180°": "內角和只說三個角加起來是 180°，不能直接推出 ∠B=∠C。", "等腰三角形兩底角相等": "用要證的結論證自己，就是循環論證！" },
              mark: g => { g.arc("B", "C", "A", 30, C.gold, 4); g.arc("C", "A", "B", 30, C.gold, 4); } }
          ]
        },
        {
          given: "平行四邊形 $ABCD$ 的對角線 $\\overline{AC}$、$\\overline{BD}$ 交於 $O$。",
          prove: "$\\overline{OA}=\\overline{OC}$，$\\overline{OB}=\\overline{OD}$",
          aux: "",
          pts: { A: [70, 270], B: [320, 270], C: [410, 60], D: [160, 60], O: [240, 165] },
          lab: { A: [52, 290], B: [324, 292], C: [416, 56], D: [140, 56], O: [252, 186] },
          base: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "C"], ["B", "D"]], dash: [],
          steps: [
            { s: "$\\overline{AB}\\parallel\\overline{CD}$", ok: "平行四邊形的定義（兩組對邊分別平行）", opts: ["平行四邊形的定義（兩組對邊分別平行）", "看起來是平行的", "對頂角相等"],
              no: { "看起來是平行的": "「看起來」不是理由！平行是因為它是平行四邊形。", "對頂角相等": "對頂角講的是角，不能推出兩線平行。" },
              mark: g => { g.seg("A", "B", C.sky, 4); g.seg("C", "D", C.sky, 4); } },
            { s: "$\\angle OAB=\\angle OCD$，$\\angle OBA=\\angle ODC$", ok: "兩平行線的內錯角相等", opts: ["兩平行線的內錯角相等", "兩平行線的同位角相等", "對頂角相等"],
              no: { "兩平行線的同位角相等": "∠OAB 和 ∠OCD 在截線 AC 的兩側、夾在兩平行線之間，是內錯角，不是同位角。", "對頂角相等": "對頂角相等的是 ∠AOB 和 ∠COD，不是這兩組角。" },
              mark: g => { g.arc("A", "B", "C", 34, C.pink); g.arc("C", "D", "A", 34, C.pink); g.arc("B", "D", "A", 30, C.green); g.arc("D", "B", "C", 30, C.green); } },
            { s: "$\\overline{AB}=\\overline{CD}$", ok: "平行四邊形兩組對邊分別相等", opts: ["平行四邊形兩組對邊分別相等", "已知", "全等三角形對應邊相等"],
              no: { "已知": "題目只說它是平行四邊形；AB=CD 是由平行四邊形的性質得到的。", "全等三角形對應邊相等": "還沒證出全等，不能先用全等的結果（順序顛倒了）。" },
              mark: g => { g.tick("A", "B", 1, C.gold); g.tick("C", "D", 1, C.gold); } },
            { s: "$\\triangle OAB\\cong\\triangle OCD$", ok: "ASA 全等", opts: ["ASA 全等", "SAS 全等", "SSA 全等", "AAA 全等"],
              no: { "SAS 全等": "我們知道的是兩組角，以及它們所夾的邊 AB=CD，不是兩邊夾一角。", "SSA 全等": "SSA 不是全等性質。", "AAA 全等": "AAA 不是全等性質。這裡兩角之間還夾著一組相等的邊。" },
              mark: g => { g.poly(["O", "A", "B"], "rgba(95,211,168,.2)"); g.poly(["O", "C", "D"], "rgba(143,208,255,.2)"); } },
            { s: "$\\overline{OA}=\\overline{OC}$，$\\overline{OB}=\\overline{OD}$", ok: "全等三角形對應邊相等", opts: ["全等三角形對應邊相等", "平行四邊形對邊相等", "O 看起來在正中間"],
              no: { "平行四邊形對邊相等": "OA、OC 是對角線被分成的兩段，不是平行四邊形的對邊。", "O 看起來在正中間": "看起來不算理由！要靠全等推出來。" },
              mark: g => { g.seg("O", "A", C.gold, 4); g.seg("O", "C", C.gold, 4); g.tick("O", "A", 2, C.gold); g.tick("O", "C", 2, C.gold); g.tick("O", "B", 3, C.pink); g.tick("O", "D", 3, C.pink); } }
          ]
        }
      ];

      let svg, cur, k, base, over;
      H.toggle(stage, ["證明一：等腰三角形底角相等", "證明二：平行四邊形對角線互相平分"], i => load(i));
      svg = H.svg(stage, 480, 320);
      base = H.el("g", {}, svg); over = H.el("g", {}, svg);
      const info = document.createElement("div");
      info.style.cssText = "font-size:15px;line-height:1.7;padding:2px 4px";
      stage.appendChild(info);
      const list = document.createElement("div");
      list.style.cssText = "display:flex;flex-direction:column;gap:6px";
      stage.appendChild(list);
      const opts = H.row(stage);
      const out = H.readout(stage);
      const again = H.row(stage);

      const g = {
        P: n => cur.pts[n],
        seg(a, b, col, w = 3) { const P = g.P(a), Q = g.P(b); H.el("line", { x1: P[0], y1: P[1], x2: Q[0], y2: Q[1], stroke: col, "stroke-width": w, "stroke-linecap": "round" }, over); },
        tick(a, b, n, col) {
          const P = g.P(a), Q = g.P(b), M = mid(P, Q), L = H.dist(P, Q), u = [(Q[0] - P[0]) / L, (Q[1] - P[1]) / L], v = [-u[1], u[0]];
          for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 7, c = [M[0] + u[0] * o, M[1] + u[1] * o];
            H.el("line", { x1: c[0] - v[0] * 9, y1: c[1] - v[1] * 9, x2: c[0] + v[0] * 9, y2: c[1] + v[1] * 9, stroke: col, "stroke-width": 3 }, over); }
        },
        arc(p, a, b, r, col, w = 3) { H.el("path", { d: H.arcPath(g.P(p), g.P(a), g.P(b), r), fill: "none", stroke: col, "stroke-width": w }, over); },
        poly(ns, fill) { const d = "M" + ns.map(n => g.P(n).join(",")).join(" L") + " Z"; over.insertBefore(H.el("path", { d, fill, stroke: "none" }), over.firstChild); }
      };

      function load(i) {
        cur = PROOFS[i]; k = 0;
        base.innerHTML = ""; over.innerHTML = ""; list.innerHTML = ""; opts.innerHTML = ""; again.innerHTML = "";
        cur.base.forEach(([a, b]) => { const P = cur.pts[a], Q = cur.pts[b]; H.el("line", { x1: P[0], y1: P[1], x2: Q[0], y2: Q[1], stroke: C.lav, "stroke-width": 2.5 }, base); });
        cur.dash.forEach(([a, b]) => { const P = cur.pts[a], Q = cur.pts[b]; H.el("line", { x1: P[0], y1: P[1], x2: Q[0], y2: Q[1], stroke: C.lav, "stroke-width": 2, "stroke-dasharray": "7 6" }, base); });
        for (const n in cur.pts) { const P = cur.pts[n], T = cur.lab[n]; H.el("circle", { cx: P[0], cy: P[1], r: 3.5, fill: "#fff" }, base); H.el("text", { x: T[0], y: T[1], text: n, "font-size": 17 }, base); }
        info.innerHTML = `<b style="color:#f6dc9a">已知</b>：${cur.given}<br><b style="color:#f6dc9a">求證</b>：${cur.prove}` + (cur.aux ? `<br><b style="color:#8fd0ff">輔助線</b>：${cur.aux}` : "");
        H.math(info);
        out.set("從第 1 步開始：這一步的理由是什麼？");
        next();
      }
      function stepRow(st, n, reason, done) {
        const d = document.createElement("div");
        d.style.cssText = `display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 10px;padding:7px 12px;border-radius:10px;border-left:3px solid ${done ? "#5fd3a8" : "#f6dc9a"};background:rgba(255,255,255,${done ? ".04" : ".08"})`;
        d.innerHTML = `<b style="color:#cdc5ff;min-width:1.2em">${n}.</b><span>${st.s}</span><span style="margin-left:auto;color:${done ? "#5fd3a8" : "#f6dc9a"};font-size:14px">（理由：${done ? reason : "？"}）</span>`;
        H.math(d); return d;
      }
      function next() {
        opts.innerHTML = "";
        if (k >= cur.steps.length) {
          const fin = document.createElement("div");
          fin.style.cssText = "padding:8px 12px;border-radius:10px;background:rgba(95,211,168,.14);border:1px solid rgba(95,211,168,.5);font-weight:700";
          fin.innerHTML = `所以 ${cur.prove}。　∎ 證明完成`; H.math(fin); list.appendChild(fin);
          out.set(`<span class="tag">證明完成</span> 每一步都有理由，天平判定這個證明<b>有效</b>！`);
          H.button(again, "↻ 重新挑戰這題", () => load(PROOFS.indexOf(cur)));
          H.sfx("correct"); return;
        }
        const st = cur.steps[k];
        const row = stepRow(st, k + 1, "", false); list.appendChild(row);
        const order = st.opts.slice().sort(() => Math.random() - 0.5);
        order.forEach(o => {
          const b = H.button(opts, o, () => {
            if (o === st.ok) {
              list.replaceChild(stepRow(st, k + 1, o, true), row);
              st.mark(g); H.sfx("correct");
              out.set(`<span class="tag">✔ 正確</span> 第 ${k + 1} 步：因為「${o}」，所以 ${st.s}。`);
              k++; next();
            } else {
              b.disabled = true; b.style.opacity = ".45"; H.sfx("wrong");
              out.set(`<span class="tag" style="background:#ff8fa3">✘ 再想想</span> ${st.no[o] || "這個理由推不出這一步。"}`);
            }
          });
          b.style.fontSize = "14px";
        });
      }
    },

    /* 全等條件檢查器 */
    congruenceCheck(stage, H) {
      const C = { lav: "#cdc5ff", gold: "#f6dc9a", sky: "#8fd0ff", pink: "#ff8fa3", green: "#5fd3a8" };
      /* 部件：0 AB=DE, 1 BC=EF, 2 CA=FD, 3 ∠A=∠D, 4 ∠B=∠E, 5 ∠C=∠F */
      const NAMES = ["AB = DE", "BC = EF", "CA = FD", "∠A = ∠D", "∠B = ∠E", "∠C = ∠F"];
      const TEX = ["\\overline{AB}=\\overline{DE}", "\\overline{BC}=\\overline{EF}", "\\overline{CA}=\\overline{FD}", "\\angle A=\\angle D", "\\angle B=\\angle E", "\\angle C=\\angle F"];
      const SIDE_V = [[0, 1], [1, 2], [2, 0]];          /* 邊 → 兩端頂點（0=A,1=B,2=C） */
      const ANG_SIDES = [[0, 2], [0, 1], [1, 2]];        /* 角 A、B、C 的兩鄰邊 */
      const SIDE_ANGS = [[0, 1], [1, 2], [2, 0]];        /* 邊的兩端角 */
      let on = [false, false, false, false, false, false], right = false;
      const shapes = { gen: [[0, 170], [180, 170], [120, 40]], rt: [[0, 170], [180, 170], [135, 92.06]] };

      const mode = H.toggle(stage, ["一般三角形", "直角三角形（∠C=∠F=90°）"], i => { right = i === 1; if (right) on[5] = true; else on[5] = false; draw(); });
      const svg = H.svg(stage, 480, 260);
      const gfx = H.el("g", {}, svg), hit = H.el("g", {}, svg);
      const bar = document.createElement("div"); bar.className = "ls-toggle"; stage.appendChild(bar);
      const btns = NAMES.map((n, i) => { const b = document.createElement("button"); b.type = "button"; b.textContent = n; b.onclick = () => flip(i); bar.appendChild(b); return b; });
      const out = H.readout(stage);
      const tools = H.row(stage);
      H.button(tools, "清除全部", () => { on = [false, false, false, false, false, right]; H.sfx("tab"); draw(); });

      function flip(i) {
        if (right && i === 5) { out.set(`<span class="tag">直角</span> 在直角三角形模式中，$\\angle C=\\angle F=90^\\circ$ 是已知條件，固定勾選。`); return; }
        on[i] = !on[i]; H.sfx("tab"); draw();
      }
      function judge3(S) {
        const sides = S.filter(i => i < 3), angs = S.filter(i => i >= 3).map(i => i - 3);
        if (sides.length === 3) return { ok: true, name: "SSS", why: "三邊對應相等" };
        if (angs.length === 3) return { ok: false, name: "AAA", why: "三個角相等只能保證形狀相同，大小可以不同（放大縮小都符合）" };
        if (sides.length === 2) {
          const a = angs[0], inc = ANG_SIDES[a].every(s => sides.includes(s));
          if (inc) return { ok: true, name: "SAS", why: "兩邊與它們的夾角對應相等" };
          if (right && a === 2 && sides.includes(0)) return { ok: true, name: "RHS", why: "直角三角形的斜邊 $\\overline{AB}$ 與一股對應相等" };
          return { ok: false, name: "SSA", why: "這個角不是兩邊的夾角，可能畫出兩個不同的三角形（看下一個互動圖）" };
        }
        if (sides.length === 1) {
          const s = sides[0], between = SIDE_ANGS[s].every(a => angs.includes(a));
          return between ? { ok: true, name: "ASA", why: "兩角與它們的夾邊對應相等" } : { ok: true, name: "AAS", why: "兩角與其中一角的對邊對應相等" };
        }
        return null;
      }
      function verdict() {
        const S = on.map((v, i) => v ? i : -1).filter(i => i >= 0);
        if (S.length < 3) return { none: true, n: S.length };
        let fail = null; const pr = ["SSS", "SAS", "ASA", "AAS", "RHS"]; let best = null;
        for (let a = 0; a < S.length; a++) for (let b = a + 1; b < S.length; b++) for (let c = b + 1; c < S.length; c++) {
          const r = judge3([S[a], S[b], S[c]]);
          if (r.ok) { if (!best || pr.indexOf(r.name) < pr.indexOf(best.name)) best = r; } else if (!fail) fail = r;
        }
        return best || fail;
      }
      function tri(off, labels, sh) {
        const V = sh.map(p => [p[0] + off[0], p[1] + off[1]]);
        const cen = [(V[0][0] + V[1][0] + V[2][0]) / 3, (V[0][1] + V[1][1] + V[2][1]) / 3];
        H.el("path", { d: `M${V[0]} L${V[1]} L${V[2]} Z`, fill: "rgba(167,155,240,.1)" }, gfx);
        SIDE_V.forEach(([p, q], s) => {
          const sel = on[s], P = V[p], Q = V[q];
          H.el("line", { x1: P[0], y1: P[1], x2: Q[0], y2: Q[1], stroke: sel ? C.gold : "rgba(205,197,255,.55)", "stroke-width": sel ? 4 : 2.5, "stroke-linecap": "round" }, gfx);
          if (sel) { const L = H.dist(P, Q), u = [(Q[0] - P[0]) / L, (Q[1] - P[1]) / L], v = [-u[1], u[0]], M = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
            for (let t = 0; t <= s; t++) { const o = (t - s / 2) * 7, c = [M[0] + u[0] * o, M[1] + u[1] * o];
              H.el("line", { x1: c[0] - v[0] * 8, y1: c[1] - v[1] * 8, x2: c[0] + v[0] * 8, y2: c[1] + v[1] * 8, stroke: C.gold, "stroke-width": 2.5 }, gfx); } }
          const hl = H.el("line", { x1: P[0], y1: P[1], x2: Q[0], y2: Q[1], stroke: "transparent", "stroke-width": 22, style: "cursor:pointer" }, hit);
          hl.addEventListener("click", () => flip(s));
        });
        [0, 1, 2].forEach(a => {
          const P = V[a], o = V.filter((_, j) => j !== a), sel = on[3 + a], col = [C.pink, C.green, C.sky][a];
          if (right && a === 2) {
            const u1 = [(o[0][0] - P[0]), (o[0][1] - P[1])], u2 = [(o[1][0] - P[0]), (o[1][1] - P[1])];
            const n1 = Math.hypot(...u1), n2 = Math.hypot(...u2), s = 14;
            const p1 = [P[0] + u1[0] / n1 * s, P[1] + u1[1] / n1 * s], p2 = [P[0] + u2[0] / n2 * s, P[1] + u2[1] / n2 * s];
            H.el("path", { d: `M${p1} L${p1[0] + u2[0] / n2 * s},${p1[1] + u2[1] / n2 * s} L${p2}`, fill: "none", stroke: col, "stroke-width": 2.5 }, gfx);
          } else if (sel) {
            for (let t = 0; t <= a; t++) H.el("path", { d: H.arcPath(P, o[0], o[1], 20 + t * 5), fill: "none", stroke: col, "stroke-width": 2.5 }, gfx);
          }
          const lp = [P[0] + (P[0] - cen[0]) * 0.22, P[1] + (P[1] - cen[1]) * 0.22];
          H.el("text", { x: lp[0] - 6, y: lp[1] + 6, text: labels[a], "font-size": 17 }, gfx);
          const hc = H.el("circle", { cx: P[0] + (cen[0] - P[0]) * 0.22, cy: P[1] + (cen[1] - P[1]) * 0.22, r: 20, fill: "transparent", style: "cursor:pointer" }, hit);
          hc.addEventListener("click", () => flip(3 + a));
        });
      }
      function draw() {
        gfx.innerHTML = ""; hit.innerHTML = "";
        const sh = right ? shapes.rt : shapes.gen;
        tri([30, 40], ["A", "B", "C"], sh); tri([270, 40], ["D", "E", "F"], sh);
        btns.forEach((b, i) => { b.classList.toggle("on", on[i]); b.style.opacity = right && i === 5 ? ".8" : "1"; });
        const v = verdict();
        const known = on.map((x, i) => x ? TEX[i] : null).filter(Boolean);
        const list = known.length ? `已知 $${known.join("，")}$。<br>` : "";
        if (v.none) out.set(`${list}<span class="tag">條件不夠</span> 目前只有 ${v.n} 組對應相等，至少要 3 組才可能判斷全等。`);
        else if (v.ok) out.set(`${list}<span class="tag" style="background:#5fd3a8">${v.name} 全等</span> ${v.why}，所以 $\\triangle ABC\\cong\\triangle DEF$。`);
        else out.set(`${list}<span class="tag" style="background:#ff8fa3">${v.name}：不一定全等</span> ${v.why}。`);
      }
    },

    /* SSA 反例：擺動 BC */
    ssaSwing(stage, H) {
      const U = 30, A = [40, 290], B = [220, 290], ang = 35 * Math.PI / 180, cs = Math.cos(ang), sn = Math.sin(ang);
      const h = 6 * sn;  /* B 到射線的距離 */
      const svg = H.svg(stage, 480, 330);
      const onRay = t => [A[0] + t * U * cs, A[1] - t * U * sn];
      const far = onRay(14);
      H.el("line", { x1: A[0], y1: A[1], x2: far[0], y2: far[1], stroke: "#cdc5ff", "stroke-width": 2.5 }, svg);
      const t2 = H.el("path", { fill: "rgba(255,143,163,.22)", stroke: "#ff8fa3", "stroke-width": 2.5 }, svg);
      const t1 = H.el("path", { fill: "rgba(95,211,168,.22)", stroke: "#5fd3a8", "stroke-width": 2.5 }, svg);
      const circ = H.el("circle", { cx: B[0], cy: B[1], fill: "none", stroke: "#8fd0ff", "stroke-width": 1.5, "stroke-dasharray": "5 5" }, svg);
      H.el("line", { x1: A[0], y1: A[1], x2: B[0], y2: B[1], stroke: "#f6dc9a", "stroke-width": 4 }, svg);
      H.el("path", { d: H.arcPath(A, B, far, 34), fill: "none", stroke: "#f6dc9a", "stroke-width": 2 }, svg);
      H.el("text", { x: A[0] + 40, y: A[1] - 8, text: "35°", fill: "#f6dc9a", "font-size": 13 }, svg);
      H.el("text", { x: (A[0] + B[0]) / 2 - 8, y: A[1] + 22, text: "6", fill: "#f6dc9a" }, svg);
      [A, B].forEach(P => H.el("circle", { cx: P[0], cy: P[1], r: 4, fill: "#fff" }, svg));
      H.el("text", { x: A[0] - 16, y: A[1] + 20, text: "A", "font-size": 17 }, svg);
      H.el("text", { x: B[0] + 4, y: B[1] + 22, text: "B", "font-size": 17 }, svg);
      const c1 = H.el("circle", { r: 6, fill: "#5fd3a8" }, svg), c2 = H.el("circle", { r: 6, fill: "#ff8fa3" }, svg);
      const l1 = H.el("text", { fill: "#5fd3a8", "font-size": 15 }, svg), l2 = H.el("text", { fill: "#ff8fa3", "font-size": 15 }, svg);
      const out = H.readout(stage);
      const hide = (...e) => e.forEach(x => H.set(x, x.tagName === "text" ? { text: "" } : x.tagName === "path" ? { d: "" } : { r: 0 }));
      const put = (c, l, t, txt) => { const P = onRay(t); H.set(c, { cx: P[0], cy: P[1], r: 6 }); H.set(l, { x: P[0] - 30, y: P[1] - 10, text: txt }); return P; };
      const triD = P => `M${A} L${B} L${P} Z`;
      H.slider(stage, { label: "BC 的長度", min: 2.5, max: 8, step: 0.05, value: 4.5, fmt: v => H.fmt(v, 2) }, a => {
        if (Math.abs(a - h) < 0.06) a = h;
        H.set(circ, { r: a * U });
        const D = a * a - h * h, m = 6 * cs;
        const hs = `$B$ 到射線的距離約 $${H.fmt(h, 2)}$`;
        if (D < 0) {
          hide(c1, c2, l1, l2, t1, t2);
          out.set(`<span class="tag" style="background:#ff8fa3">0 個三角形</span> $\\overline{BC}=${H.fmt(a, 2)}$ 太短，圓碰不到射線（${hs}）。`);
        } else if (a === h) {
          const P = put(c1, l1, m, "C"); hide(c2, l2, t2); H.set(t1, { d: triD(P) });
          out.set(`<span class="tag" style="background:#5fd3a8">1 個三角形</span> $\\overline{BC}\\approx${H.fmt(h, 2)}$ 恰好等於 $B$ 到射線的距離，圓與射線相切，$\\angle ACB=90^\\circ$。`);
        } else if (a < 6) {
          const r1 = m + Math.sqrt(D), r2 = m - Math.sqrt(D);
          H.set(t1, { d: triD(put(c1, l1, r1, "C₁")) }); H.set(t2, { d: triD(put(c2, l2, r2, "C₂")) });
          out.set(`<span class="tag" style="background:#f6dc9a">2 個不同的三角形</span> $\\angle A=35^\\circ$、$\\overline{AB}=6$、$\\overline{BC}=${H.fmt(a, 2)}$ 都一樣，但 $\\overline{AC_1}\\approx${H.fmt(r1, 2)}$、$\\overline{AC_2}\\approx${H.fmt(r2, 2)}$。<br>所以 <b>SSA 不能保證全等</b>！`);
        } else {
          const r1 = m + Math.sqrt(D);
          H.set(t1, { d: triD(put(c1, l1, r1, "C")) }); hide(c2, l2, t2);
          out.set(`<span class="tag" style="background:#5fd3a8">1 個三角形</span> $\\overline{BC}=${H.fmt(a, 2)}\\ge\\overline{AB}=6$，另一個交點落在 $A$ 或射線反方向，只剩一個三角形，$\\overline{AC}\\approx${H.fmt(r1, 2)}$。`);
        }
      });
    }
  }
};
