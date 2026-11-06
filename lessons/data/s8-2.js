/* 會考模擬戰 II：九下與跨單元總複習（終焉試煉 ・ 會考總複習）
   對應 108 課綱：F-9-1、F-9-2 二次函數；D-9-1～D-9-3 統計與機率；S-9-12、S-9-13 立體圖形 */
window.MATHORIA_LESSON = {
  title: "會考模擬戰 II：九下與跨單元總複習",
  unit: "終焉試煉 ・ 會考總複習",
  subtitle: "二次函數、盒狀圖、機率、立體圖形，一次叫出九下所有法則。",
  codes: ["F-9-1, F-9-2 二次函數", "D-9-1～D-9-3 統計與機率", "S-9-12, S-9-13 立體圖形"],
  time: "2 節課",
  goals: [
    "由頂點式 $y=a(x-h)^2+k$ 讀出頂點、對稱軸、開口方向、平移方式與最大（小）值",
    "依固定規則求四分位數、全距、四分位距，並正確判讀盒狀圖",
    "用古典機率與兩層樹狀圖，處理銅板、骰子、撲克牌與「放回／不放回」抽球",
    "分辨空間中直線的平行、相交與歪斜，並算出柱體、錐體的表面積與直角柱體積",
    "能寫出有根據的說明，完成會考非選擇題"
  ],
  sections: [
    { type: "story", lines: [
      { who: "narrator", text: "終焉試煉之地的第二道門，門上浮著四個符文：拋物線、盒子、樹枝和一座尖塔。" },
      { who: "boss", text: "我是{boss}！這一次我把函數、統計、機率和空間全部攪在一起，看你分不分得出哪一題是哪一章！" },
      { who: "player", text: "題目再怎麼混，也是由我學過的法則組成的。" },
      { who: "pet", text: "{name}，先認出題目屬於哪一章，再把那一章的法則一個一個叫出來" },
      { who: "boss", text: "哼，頂點的正負號、盒子的長度、樹枝的機率、尖塔的高……每一個都是陷阱！" },
      { who: "player", text: "那我就一步一步寫清楚，讓每個陷阱都現形！" }
    ] },

    { type: "concept", title: "九下必備公式卡", html: `
      <h3>1. 二次函數（頂點式）</h3>
      <div class="key"><b>$y=a(x-h)^2+k$（$a\\ne 0$）</b><br>
        頂點 $(h,k)$；對稱軸是通過頂點的鉛垂線 $x=h$。<br>
        $a>0$ 開口向上，頂點是最低點，最小值為 $k$；$a<0$ 開口向下，頂點是最高點，最大值為 $k$。<br>
        $|a|$ 越大，開口越窄。</div>
      <p><b>平移</b>：$y=ax^2$ 的圖形向右平移 $h$ 單位、向上平移 $k$ 單位，就得到 $y=a(x-h)^2+k$（$h$、$k$ 為負數時表示向左、向下）。平移只改變位置，不改變開口方向與大小。</p>
      <h3>2. 統計</h3>
      <div class="table-wrap"><table>
        <tr><th>名稱</th><th>算法</th><th>代表意義</th></tr>
        <tr><td>全距</td><td>最大值 $-$ 最小值</td><td>全部資料的分散範圍</td></tr>
        <tr><td>四分位距</td><td>$Q_3-Q_1$</td><td>中間約一半資料的分散範圍</td></tr>
      </table></div>
      <h3>3. 機率</h3>
      <div class="key"><b>古典機率</b>：當每一種結果發生的機會都相等時，<br>
        $$P(\\text{事件})=\\frac{\\text{事件包含的結果數}}{\\text{所有可能的結果數}},\\qquad 0\\le P\\le 1$$
        樹狀圖的每一個末端要是<b>「同樣可能」</b>的結果，才能直接數個數相除。</div>
      <h3>4. 立體圖形</h3>
      <div class="table-wrap"><table>
        <tr><th>立體</th><th>表面積</th></tr>
        <tr><td>直角柱</td><td>$2\\times$底面積 $+$ 底面周長 $\\times$ 高</td></tr>
        <tr><td>正角錐</td><td>底面積 $+$ 每個側面三角形面積 $\\left(\\tfrac12\\times\\text{底邊}\\times\\text{斜高}\\right)$ 的總和</td></tr>
        <tr><td>直圓錐</td><td>底面積 $\\pi r^2$ $+$ 側面積 $\\pi r\\ell$（$\\ell$ 為母線長）</td></tr>
      </table></div>
      <p>直角柱的體積 $=$ 底面積 $\\times$ 高。直圓錐的側面展開是扇形：半徑為 $\\ell$、弧長為 $2\\pi r$，所以面積 $=\\tfrac12\\times 2\\pi r\\times\\ell=\\pi r\\ell$。</p>
      <p class="note">錐體的「高」是頂點到底面的垂直距離；「斜高」在側面上。兩者和底面上的一段長度會組成直角三角形，用畢氏定理互換。</p>
    ` },

    { type: "concept", title: "盒狀圖判讀五步驟", html: `
      <div class="fig"><svg viewBox="0 0 400 150">
        <line x1="40" y1="60" x2="120" y2="60" stroke="#cdc5ff" stroke-width="2.5"/>
        <line x1="270" y1="60" x2="360" y2="60" stroke="#cdc5ff" stroke-width="2.5"/>
        <line x1="40" y1="45" x2="40" y2="75" stroke="#cdc5ff" stroke-width="2.5"/>
        <line x1="360" y1="45" x2="360" y2="75" stroke="#cdc5ff" stroke-width="2.5"/>
        <rect x="120" y="38" width="150" height="44" fill="rgba(143,208,255,.18)" stroke="#8fd0ff" stroke-width="2.5"/>
        <line x1="185" y1="38" x2="185" y2="82" stroke="#f6dc9a" stroke-width="3"/>
        <text x="22" y="100" fill="#fff" font-size="13">最小值</text>
        <text x="112" y="100" fill="#8fd0ff" font-size="13">Q₁</text>
        <text x="177" y="100" fill="#f6dc9a" font-size="13">Q₂</text>
        <text x="262" y="100" fill="#8fd0ff" font-size="13">Q₃</text>
        <text x="336" y="100" fill="#fff" font-size="13">最大值</text>
        <path d="M120,24 v-6 h150 v6" fill="none" stroke="#8fd0ff" stroke-width="1.5"/>
        <text x="163" y="13" fill="#8fd0ff" font-size="12">四分位距</text>
        <path d="M40,116 v6 h320 v-6" fill="none" stroke="#ff8fa3" stroke-width="1.5"/>
        <text x="185" y="140" fill="#ff8fa3" font-size="12">全距</text>
      </svg></div>
      <ol>
        <li><b>排序</b>：把資料由小到大排好，數清楚共有 $n$ 筆。</li>
        <li><b>找中位數 $Q_2$</b>：$n$ 為奇數時取正中間那一筆；$n$ 為偶數時取正中間兩筆的平均。</li>
        <li><b>切成前半、後半</b>：本課約定，<b>$n$ 為奇數時，中位數那一筆不放進前半，也不放進後半</b>；$n$ 為偶數時直接對半分。</li>
        <li><b>找 $Q_1$、$Q_3$</b>：$Q_1$ 是前半部的中位數，$Q_3$ 是後半部的中位數。</li>
        <li><b>畫圖與判讀</b>：盒子從 $Q_1$ 到 $Q_3$，盒中的線是 $Q_2$，兩條「鬚」延伸到最小值與最大值。</li>
      </ol>
      <div class="key"><b>判讀重點</b><br>
        • 最小值、$Q_1$、$Q_2$、$Q_3$、最大值把資料分成四段，每段<b>大約</b>各占 $25\\%$ 的資料。<br>
        • <b>盒子的長度是四分位距</b>，整張圖從左端到右端才是全距。<br>
        • 某一段畫得比較長，只代表那段資料<b>比較分散</b>，不代表那段的人數比較多。</div>
      <p class="note">四分位數的取法有好幾種版本，資料筆數多時差異很小。考試時依題目或課本的規定即可，本課一律使用上面的約定。</p>
    ` },
    { type: "widget", title: "拖曳資料點，盒狀圖跟著變", widget: "boxPlot",
      intro: "上方每個圓點是一筆資料（數值 0～20）。左右拖曳圓點，下方的盒狀圖和五個數會即時更新。可以切換 9 筆或 10 筆資料。",
      caption: "天藍色是前半部、粉紅色是後半部；奇數筆時，金色那一筆是中位數，不放進任何一半。試著只拖動最大值，看看哪個量變了、哪個量不變。" },

    { type: "example", title: "例題 1　拋物線與三角形面積（跨單元）", problem: "二次函數 $y=-2(x-3)^2+8$ 的圖形頂點為 $A$，與 $x$ 軸交於 $B$、$C$ 兩點（$B$ 在 $C$ 的左邊）。<br>(1) 此圖形可由 $y=-2x^2$ 的圖形如何平移得到？<br>(2) 求 $\\triangle ABC$ 的面積。",
      figure: `<svg viewBox="0 0 340 270"><line x1="20" y1="180" x2="330" y2="180" stroke="rgba(255,255,255,.55)" stroke-width="1.5"/><line x1="40" y1="268" x2="40" y2="6" stroke="rgba(255,255,255,.55)" stroke-width="1.5"/><path d="M85,180 L175,20 L265,180 Z" fill="rgba(246,220,154,.2)" stroke="#f6dc9a" stroke-width="2"/><path d="M67,250.4 Q175,-210.4 283,250.4" fill="none" stroke="#cdc5ff" stroke-width="3"/><line x1="175" y1="20" x2="175" y2="180" stroke="#8fd0ff" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="175" cy="20" r="4" fill="#fff"/><circle cx="85" cy="180" r="4" fill="#fff"/><circle cx="265" cy="180" r="4" fill="#fff"/><text x="184" y="22" fill="#fff" font-size="14">A(3, 8)</text><text x="70" y="200" fill="#fff" font-size="14">B</text><text x="270" y="200" fill="#fff" font-size="14">C</text><text x="180" y="170" fill="#8fd0ff" font-size="12">x = 3</text><text x="26" y="196" fill="#fff" font-size="12">O</text><text x="318" y="196" fill="#fff" font-size="12">x</text><text x="46" y="14" fill="#fff" font-size="12">y</text></svg>`,
      steps: [
        "(1) 和 $y=a(x-h)^2+k$ 比較：$a=-2$、$h=3$、$k=8$。所以是把 $y=-2x^2$ 的圖形<b>向右平移 3 單位、再向上平移 8 單位</b>。",
        "頂點 $A(3,8)$；因為 $a=-2<0$，開口向下，$A$ 是最高點。",
        "(2) 與 $x$ 軸的交點，$y=0$：$-2(x-3)^2+8=0$，得 $(x-3)^2=4$，$x-3=2$ 或 $-2$，所以 $x=5$ 或 $1$。",
        "$B(1,0)$、$C(5,0)$，底 $\\overline{BC}=5-1=4$。",
        "高是 $A$ 到 $x$ 軸的距離，也就是 $A$ 的 $y$ 坐標 8。",
        "$\\triangle ABC$ 面積 $=\\dfrac{1}{2}\\times 4\\times 8=16$。"
      ],
      answer: "(1) 向右平移 3、向上平移 8；(2) 面積 16" },

    { type: "example", title: "例題 2　由資料畫盒狀圖並判讀", problem: "某班 11 位同學一週的課外閱讀時數（小時）如下：<br>$9,\\ 3,\\ 6,\\ 15,\\ 2,\\ 7,\\ 3,\\ 10,\\ 4,\\ 6,\\ 5$<br>(1) 求 $Q_1$、$Q_2$、$Q_3$、全距與四分位距。<br>(2) 若把 15 改記成 25，全距與四分位距哪一個會改變？",
      figure: `<svg viewBox="0 0 380 120"><line x1="30" y1="95" x2="350" y2="95" stroke="rgba(255,255,255,.55)" stroke-width="1.5"/><g fill="#fff" font-size="11" text-anchor="middle"><text x="30" y="112">0</text><text x="70" y="112">2</text><text x="110" y="112">4</text><text x="150" y="112">6</text><text x="190" y="112">8</text><text x="230" y="112">10</text><text x="270" y="112">12</text><text x="310" y="112">14</text><text x="350" y="112">16</text></g><line x1="70" y1="50" x2="90" y2="50" stroke="#cdc5ff" stroke-width="2.5"/><line x1="210" y1="50" x2="330" y2="50" stroke="#cdc5ff" stroke-width="2.5"/><line x1="70" y1="38" x2="70" y2="62" stroke="#cdc5ff" stroke-width="2.5"/><line x1="330" y1="38" x2="330" y2="62" stroke="#cdc5ff" stroke-width="2.5"/><rect x="90" y="30" width="120" height="40" fill="rgba(143,208,255,.18)" stroke="#8fd0ff" stroke-width="2.5"/><line x1="150" y1="30" x2="150" y2="70" stroke="#f6dc9a" stroke-width="3"/><g font-size="11" text-anchor="middle"><text x="90" y="22" fill="#8fd0ff">Q₁=3</text><text x="150" y="22" fill="#f6dc9a">Q₂=6</text><text x="210" y="22" fill="#8fd0ff">Q₃=9</text></g></svg>`,
      steps: [
        "排序：$2,\\ 3,\\ 3,\\ 4,\\ 5,\\ 6,\\ 6,\\ 7,\\ 9,\\ 10,\\ 15$，共 11 筆（奇數）。",
        "中位數是第 6 筆：$Q_2=6$。依約定，這一筆不放進前半或後半。",
        "前半部 $2,3,3,4,5$ 的中位數 $Q_1=3$；後半部 $6,7,9,10,15$ 的中位數 $Q_3=9$。",
        "全距 $=15-2=13$；四分位距 $=Q_3-Q_1=9-3=6$。",
        "(2) 改成 25 後，排序後 25 仍在最後一筆，後半部變成 $6,7,9,10,25$，中位數還是 9，所以 $Q_1$、$Q_2$、$Q_3$ 都不變，<b>四分位距仍為 6</b>。",
        "但最大值變成 25，<b>全距變成 $25-2=23$</b>。全距會被極端值影響，四分位距比較不受影響。"
      ],
      answer: "(1) $Q_1=3$、$Q_2=6$、$Q_3=9$，全距 13，四分位距 6；(2) 只有全距改變（變成 23）" },

    { type: "concept", title: "樹狀圖：放回與不放回", html: `
      <p>從袋中依序抽兩次球時，用兩層樹狀圖列出所有結果。為了讓每個末端都「同樣可能」，<b>同色的球也要編號</b>（例如 紅$_1$、紅$_2$）。</p>
      <div class="table-wrap"><table>
        <tr><th>抽法</th><th>第一次</th><th>第二次</th><th>全部結果數</th></tr>
        <tr><td>抽後<b>放回</b></td><td>$n$ 種</td><td>還是 $n$ 種</td><td>$n\\times n$</td></tr>
        <tr><td>抽後<b>不放回</b></td><td>$n$ 種</td><td>只剩 $n-1$ 種</td><td>$n\\times(n-1)$</td></tr>
      </table></div>
      <p class="note">不放回時，第二次不可能再抽到同一顆球，所以樹狀圖上不會出現「紅$_1$ → 紅$_1$」這種分支。</p>
    ` },
    { type: "widget", title: "兩層樹狀圖產生器", widget: "treeDiagram",
      intro: "選擇袋中的球、放回或不放回，再選一個事件。樹狀圖會列出所有同樣可能的結果，打勾的是符合事件的結果。",
      caption: "比較同一袋球「放回」與「不放回」時，「兩球同色」的機率有什麼不同。" },

    { type: "example", title: "例題 3（非選擇題）　放回與不放回，機率一樣嗎？", problem: "袋中有 2 顆紅球、1 顆白球，球的大小、材質都相同。從袋中依序抽出兩顆球。<br>阿哲說：「不管第一顆抽完有沒有放回，兩次都抽到紅球的機率都一樣，因為袋子裡本來就是紅球比較多。」<br>請分別用樹狀圖求出「抽後放回」與「抽後不放回」時，兩次都抽到紅球的機率，並判斷阿哲的說法是否正確，<b>寫出你的理由</b>。",
      steps: [
        "把球編號為 紅$_1$、紅$_2$、白，使每一種抽法都同樣可能。",
        "<b>抽後放回</b>：第一次 3 種、第二次也 3 種，共 $3\\times 3=9$ 種結果。兩次都紅的有 (紅$_1$,紅$_1$)、(紅$_1$,紅$_2$)、(紅$_2$,紅$_1$)、(紅$_2$,紅$_2$) 共 4 種，機率 $=\\dfrac{4}{9}$。",
        "<b>抽後不放回</b>：第一次 3 種、第二次只剩 2 種，共 $3\\times 2=6$ 種結果。兩次都紅的只有 (紅$_1$,紅$_2$)、(紅$_2$,紅$_1$) 共 2 種，機率 $=\\dfrac{2}{6}=\\dfrac{1}{3}$。",
        "比較：$\\dfrac{4}{9}=\\dfrac{12}{27}$，$\\dfrac{1}{3}=\\dfrac{9}{27}$，兩者不相等，而且 $\\dfrac{4}{9}>\\dfrac{1}{3}$。",
        "<b>結論與理由</b>：阿哲的說法<b>不正確</b>。不放回時，第一次抽走一顆紅球後，袋中只剩 1 紅 1 白，第二次抽到紅球的機會變小，所以「全部結果數」與「兩次都紅的結果數」都和放回時不同，機率也不同。"
      ],
      answer: "放回：$\\dfrac{4}{9}$；不放回：$\\dfrac{1}{3}$。兩者不同，阿哲的說法錯誤。" },

    { type: "example", title: "例題 4　紀念塔的表面積與體積", problem: "一座紀念塔由兩部分組成：下方是底面為邊長 6 公尺正方形、高 5 公尺的正四角柱；上方是一個正四角錐，底面恰好與四角柱的上底面重合，正四角錐的<b>高</b>為 4 公尺。<br>(1) 求正四角錐的斜高。<br>(2) 整座塔（含塔底）露在外面的表面積是多少平方公尺？<br>(3) 下方正四角柱的體積是多少立方公尺？",
      figure: `<svg viewBox="0 0 320 235"><g stroke-width="2" fill="none"><line x1="70" y1="215" x2="120" y2="185" stroke="#cdc5ff" stroke-dasharray="5 4"/><line x1="120" y1="185" x2="240" y2="185" stroke="#cdc5ff" stroke-dasharray="5 4"/><line x1="120" y1="185" x2="120" y2="85" stroke="#cdc5ff" stroke-dasharray="5 4"/><path d="M70,215 H190 V115 H70 Z" stroke="#cdc5ff" fill="rgba(167,155,240,.12)"/><path d="M190,215 L240,185 V85 L190,115" stroke="#cdc5ff" fill="rgba(167,155,240,.08)"/><path d="M70,115 L155,20 L190,115" stroke="#f6dc9a" fill="rgba(246,220,154,.12)"/><path d="M190,115 L155,20 L240,85" stroke="#f6dc9a" fill="rgba(246,220,154,.08)"/><line x1="70" y1="115" x2="120" y2="85" stroke="#cdc5ff" stroke-dasharray="5 4"/><line x1="120" y1="85" x2="240" y2="85" stroke="#cdc5ff" stroke-dasharray="5 4"/><line x1="155" y1="20" x2="120" y2="85" stroke="#f6dc9a" stroke-dasharray="5 4"/><line x1="155" y1="20" x2="155" y2="100" stroke="#8fd0ff" stroke-dasharray="4 3"/><line x1="155" y1="20" x2="130" y2="115" stroke="#ff8fa3" stroke-width="2.5"/></g><circle cx="155" cy="100" r="3" fill="#8fd0ff"/><text x="160" y="72" fill="#8fd0ff" font-size="13">高 4</text><text x="96" y="72" fill="#ff8fa3" font-size="13">斜高</text><text x="124" y="232" fill="#fff" font-size="13">6</text><text x="52" y="170" fill="#fff" font-size="13">5</text><text x="220" y="212" fill="#fff" font-size="13">6</text></svg>`,
      steps: [
        "(1) 正四角錐的頂點到底面正中心的距離是高 4；正中心到底邊中點的距離是 $6\\div 2=3$。",
        "高、這段 3、斜高組成直角三角形，斜高 $=\\sqrt{4^2+3^2}=\\sqrt{25}=5$（公尺）。注意斜高不是 4！",
        "(2) 露在外面的部分：塔底一個正方形、四角柱的 4 個側面、四角錐的 4 個側面三角形（四角柱上底面被四角錐蓋住，四角錐底面也貼住柱子，兩者都不算）。",
        "塔底 $=6\\times 6=36$；四角柱側面 $=4\\times(6\\times 5)=120$；四角錐側面 $=4\\times\\left(\\dfrac12\\times 6\\times 5\\right)=60$。",
        "表面積 $=36+120+60=216$（平方公尺）。",
        "(3) 直角柱體積 $=$ 底面積 $\\times$ 高 $=36\\times 5=180$（立方公尺）。"
      ],
      answer: "(1) 斜高 5 公尺；(2) 216 平方公尺；(3) 180 立方公尺" },

    { type: "myth", title: "破解{boss}的幻術", items: [
      { wrong: "$y=2(x+3)^2-1$ 的頂點是 $(3,-1)$。", right: "頂點是 $(-3,-1)$，對稱軸是 $x=-3$。", why: "頂點式是 $y=a(x-h)^2+k$。$(x+3)^2=(x-(-3))^2$，所以 $h=-3$；這個圖形是 $y=2x^2$ 向<b>左</b>平移 3、向下平移 1。" },
      { wrong: "盒狀圖中盒子的長度就是全距。", right: "盒子的長度是<b>四分位距</b> $Q_3-Q_1$；從最小值到最大值（兩條鬚的兩端）才是全距。", why: "四分位距只看中間約一半的資料，所以不會因為一個特別大或特別小的值而大幅改變。" },
      { wrong: "擲兩枚硬幣，結果只有「兩正、一正一反、兩反」三種，所以兩正的機率是 $\\dfrac13$。", right: "兩正的機率是 $\\dfrac14$。", why: "這三種結果不是同樣可能。用樹狀圖列出 (正,正)、(正,反)、(反,正)、(反,反) 四種同樣可能的結果，「一正一反」占了兩種，機率是 $\\dfrac12$。同理，硬幣連續出現 5 次正面後，下一次出現反面的機率仍是 $\\dfrac12$，硬幣不會「記得」前面的結果。" },
      { wrong: "空間中兩條直線不相交，就一定互相平行。", right: "不相交的兩直線，可能平行，也可能<b>歪斜</b>。", why: "平行線必須在同一個平面上。長方體 $ABCD\\text{-}EFGH$ 中，$\\overleftrightarrow{AB}$ 和 $\\overleftrightarrow{CG}$ 不相交，但找不到一個平面同時包含它們，所以是歪斜線。" },
      { wrong: "直圓錐的高是 4、底半徑是 3，側面積就是 $\\pi\\times 3\\times 4=12\\pi$。", right: "側面積要用母線 $\\ell=\\sqrt{4^2+3^2}=5$：$\\pi\\times 3\\times 5=15\\pi$。", why: "側面展開成扇形，扇形的半徑是母線，不是高。高、底半徑、母線組成直角三角形，斜高是斜邊，一定比高長。" }
    ] },

    { type: "practice", title: "會考模擬練習", items: [
      { q: "二次函數 $y=-3(x+2)^2+5$ 的圖形，下列敘述何者正確？", o: ["頂點 $(-2,5)$，對稱軸 $x=-2$，有最大值 5", "頂點 $(2,5)$，對稱軸 $x=2$，有最大值 5", "頂點 $(-2,5)$，對稱軸 $y=5$，有最小值 5", "頂點 $(-2,5)$，對稱軸 $x=-2$，有最小值 5"], a: 0, ex: "$(x+2)^2=(x-(-2))^2$，所以 $h=-2$、$k=5$，頂點 $(-2,5)$，對稱軸是鉛垂線 $x=-2$。$a=-3<0$ 開口向下，頂點是最高點，最大值為 5。" },
      { q: "將 $y=2x^2$ 的圖形向右平移 4 單位、再向下平移 3 單位，得到 $y=2(x-h)^2+k$ 的圖形，則 $h+k=$？", answer: ["1"], show: "1", hint: "向右是 $h$ 為正，向下是 $k$ 為負。", ex: "向右平移 4 單位：$h=4$；向下平移 3 單位：$k=-3$。所以 $h+k=4+(-3)=1$。" },
      { q: "周長 24 公分的長方形，若長為 $x$ 公分，則寬為 $(12-x)$ 公分，面積 $y=x(12-x)$，可整理成 $y=-(x-6)^2+36$。這個長方形的面積最大是多少平方公分？", answer: ["36"], show: "36", ex: "展開檢查：$-(x-6)^2+36=-(x^2-12x+36)+36=-x^2+12x=x(12-x)$。$a=-1<0$，頂點 $(6,36)$ 是最高點，當 $x=6$（此時寬也是 6，是正方形）時面積最大為 36 平方公分。" },
      { q: "有 10 筆資料：$5,\\ 8,\\ 8,\\ 10,\\ 12,\\ 13,\\ 15,\\ 17,\\ 18,\\ 24$。這組資料的四分位距是多少？", answer: ["9"], show: "9", hint: "10 筆是偶數，直接對半分成前 5 筆、後 5 筆。", ex: "前半部 $5,8,8,10,12$ 的中位數 $Q_1=8$；後半部 $13,15,17,18,24$ 的中位數 $Q_3=17$。四分位距 $=17-8=9$。（中位數 $Q_2=\\dfrac{12+13}{2}=12.5$，全距 $=24-5=19$。）" },
      { q: "某班數學成績的盒狀圖中，最小值 40 分、$Q_1=55$ 分、$Q_2=62$ 分、$Q_3=70$ 分、最大值 95 分。下列敘述何者正確？", o: ["全距是 55 分，四分位距是 15 分", "全距是 55 分，四分位距是 30 分", "成績在 62 分以上的人大約占全班的 75%", "70 分到 95 分這段最長，所以這段的人數最多"], a: 0, ex: "全距 $=95-40=55$；四分位距 $=70-55=15$。62 分是中位數，以上的人約占 50%，不是 75%。盒狀圖每一段大約都占 25% 的資料，某段比較長只代表那段資料比較分散，不代表人數比較多。" },
      { q: "從一副 52 張的撲克牌（不含鬼牌）中任意抽出一張，抽到「紅心」或「K」的機率是多少？", o: ["$\\dfrac{4}{13}$", "$\\dfrac{17}{52}$", "$\\dfrac{1}{4}$", "$\\dfrac{1}{13}$"], a: 0, ex: "紅心有 13 張，K 有 4 張，但「紅心 K」被算了兩次，所以符合的牌有 $13+4-1=16$ 張。機率 $=\\dfrac{16}{52}=\\dfrac{4}{13}$。" },
      { q: "袋中有 3 顆紅球、2 顆白球（大小相同）。依序抽出兩顆，<b>抽後不放回</b>，抽到「一紅一白」的機率是多少？", o: ["$\\dfrac{3}{5}$", "$\\dfrac{12}{25}$", "$\\dfrac{3}{10}$", "$\\dfrac{6}{25}$"], a: 0, ex: "球編號後，第一次 5 種、第二次 4 種，共 $5\\times 4=20$ 種同樣可能的結果。先紅後白：$3\\times 2=6$ 種；先白後紅：$2\\times 3=6$ 種，共 12 種。機率 $=\\dfrac{12}{20}=\\dfrac{3}{5}$。（$\\dfrac{12}{25}$ 是放回時的答案。）" },
      { q: "長方體 $ABCD\\text{-}EFGH$ 中，底面為 $ABCD$、頂面為 $EFGH$，側稜為 $\\overline{AE}$、$\\overline{BF}$、$\\overline{CG}$、$\\overline{DH}$。12 條稜所在的直線中，有幾條與直線 $AB$ 歪斜？", answer: ["4"], show: "4 條", hint: "先把與 $AB$ 平行的、相交的找出來，剩下的就是歪斜。", ex: "除了 $AB$ 本身，還有 11 條稜。與 $AB$ 平行：$DC$、$EF$、$HG$（3 條）；與 $AB$ 相交：$AD$、$AE$、$BC$、$BF$（4 條）。剩下 $CG$、$DH$、$EH$、$FG$ 共 4 條，既不平行也不相交，與 $AB$ 歪斜。" },
      { q: "一個直圓錐的底面半徑為 3 公分、高為 4 公分，它的表面積是多少平方公分？", o: ["$24\\pi$", "$21\\pi$", "$15\\pi$", "$36\\pi$"], a: 0, ex: "母線 $\\ell=\\sqrt{3^2+4^2}=5$。底面積 $=\\pi\\times 3^2=9\\pi$，側面積 $=\\pi r\\ell=\\pi\\times 3\\times 5=15\\pi$，表面積 $=9\\pi+15\\pi=24\\pi$。若誤用高 4 當母線，會得到 $9\\pi+12\\pi=21\\pi$。" },
      { q: "二次函數 $y=(x-2)^2-4$ 的圖形與 $x$ 軸交於 $P$、$Q$ 兩點，頂點為 $R$。求 $\\triangle PQR$ 的面積。", answer: ["8"], show: "8", hint: "先令 $y=0$ 求出兩個交點。", ex: "令 $y=0$：$(x-2)^2=4$，$x=4$ 或 $0$，所以 $P(0,0)$、$Q(4,0)$，底 $=4$。頂點 $R(2,-4)$ 到 $x$ 軸的距離是 4。面積 $=\\dfrac12\\times 4\\times 4=8$。" }
    ] },

    { type: "summary", title: "重點整理", items: [
      "$y=a(x-h)^2+k$：頂點 $(h,k)$，對稱軸 $x=h$；$a>0$ 有最小值 $k$，$a<0$ 有最大值 $k$。看到 $(x+3)^2$ 要讀成 $h=-3$。",
      "$y=ax^2$ 向右平移 $h$、向上平移 $k$ 得 $y=a(x-h)^2+k$；平移不改變開口方向和大小。",
      "四分位數：先排序找中位數；奇數筆時中位數不放進前後半，再分別找前半、後半的中位數得 $Q_1$、$Q_3$。",
      "全距 $=$ 最大值 $-$ 最小值；四分位距 $=Q_3-Q_1$ 是盒子的長度，較不受極端值影響。",
      "古典機率 $=\\dfrac{\\text{事件結果數}}{\\text{全部結果數}}$，前提是每個結果同樣可能；同色球要編號。放回 $n\\times n$，不放回 $n\\times(n-1)$。",
      "空間中不相交的兩直線可能平行（共平面）或歪斜（不共平面）。",
      "錐體側面積不用高：正角錐側面三角形 $\\tfrac12\\times$底邊$\\times$斜高，直圓錐側面積 $\\pi r\\ell$（$\\ell$ 為母線）；直角柱體積 $=$ 底面積 $\\times$ 高。"
    ] },

    { type: "extend", title: "高中延伸：標準差與數學期望值", where: "龍騰 高一下 數學第二冊 ・ 數據分析／機率", html: `
      <p>國中用全距、四分位距描述資料的分散程度；高中會再學一個用到<b>每一筆資料</b>的量：標準差。機率則會延伸出「平均來說可以得到多少」的期望值。</p>
      <h3>1. 標準差</h3>
      <p>$n$ 筆資料 $x_1,x_2,\\dots,x_n$，平均數為 $\\mu$，標準差</p>
      $$\\sigma=\\sqrt{\\frac{(x_1-\\mu)^2+(x_2-\\mu)^2+\\cdots+(x_n-\\mu)^2}{n}}$$
      <p><b>試試看</b>：資料 $2,4,4,4,5,5,7,9$，平均 $\\mu=\\dfrac{40}{8}=5$。</p>
      <p>各筆減去平均：$-3,-1,-1,-1,0,0,2,4$；平方後相加：$9+1+1+1+0+0+4+16=32$。</p>
      $$\\sigma=\\sqrt{\\frac{32}{8}}=\\sqrt{4}=2$$
      <h3>2. 數學期望值</h3>
      <p>每一種結果的「獲得值 $\\times$ 機率」全部加起來，就是期望值，代表玩很多次之後平均每次的結果。</p>
      <p><b>試試看</b>：擲一顆公正骰子，擲出 6 點得 30 元，其他點數得 0 元，每玩一次要付 6 元。</p>
      $$\\text{期望得到}=30\\times\\frac16+0\\times\\frac56=5\\ (\\text{元})$$
      <p>扣掉 6 元成本，平均每玩一次<b>虧 1 元</b>。這就是為什麼這類遊戲玩越多次，越容易輸錢。</p>
    ` }
  ],

  /* ================= 互動圖 ================= */
  widgets: {
    /* 互動盒狀圖：拖曳資料點 */
    boxPlot(stage, H) {
      const X0 = 40, U = 20, AY = 140, BY = 210;
      const svg = H.svg(stage, 480, 275);
      const xOf = v => X0 + v * U;
      H.el("line", { x1: X0 - 10, y1: AY, x2: X0 + 20 * U + 10, y2: AY, stroke: "rgba(255,255,255,.5)", "stroke-width": 1.5 }, svg);
      for (let v = 0; v <= 20; v++) {
        H.el("line", { x1: xOf(v), y1: AY, x2: xOf(v), y2: AY + (v % 2 ? 4 : 7), stroke: "rgba(255,255,255,.5)" }, svg);
        if (v % 2 === 0) H.el("text", { x: xOf(v), y: AY + 21, text: String(v), "text-anchor": "middle", "font-size": 14, fill: "#cfcbe8" }, svg);
      }
      /* 盒狀圖 */
      const g = { stroke: "#cdc5ff", "stroke-width": 2.5 };
      const wL = H.el("line", Object.assign({ y1: BY, y2: BY }, g), svg), wR = H.el("line", Object.assign({ y1: BY, y2: BY }, g), svg);
      const cL = H.el("line", Object.assign({ y1: BY - 12, y2: BY + 12 }, g), svg), cR = H.el("line", Object.assign({ y1: BY - 12, y2: BY + 12 }, g), svg);
      const box = H.el("rect", { y: BY - 18, height: 36, fill: "rgba(143,208,255,.18)", stroke: "#8fd0ff", "stroke-width": 2.5 }, svg);
      const med = H.el("line", { y1: BY - 18, y2: BY + 18, stroke: "#f6dc9a", "stroke-width": 3 }, svg);
      const lab = (fill) => H.el("text", { "text-anchor": "middle", "font-size": 15, fill }, svg);
      const tQ1 = lab("#8fd0ff"), tQ3 = lab("#8fd0ff"), tQ2 = lab("#f6dc9a"), tMin = lab("#fff"), tMax = lab("#fff");
      /* 資料點 */
      let vals = [3, 5, 6, 6, 8, 10, 11, 14, 17, 12], n = 9;
      const start = vals.slice();
      const dots = vals.map((_, i) => {
        const c = H.el("circle", { r: 9.5, stroke: "#fff", "stroke-width": 1.5 }, svg);
        H.drag(svg, c, x => { vals[i] = Math.max(0, Math.min(20, Math.round((x - X0) / U))); draw(); });
        return c;
      });
      const out = H.readout(stage);
      const median = a => { const m = a.length; return m % 2 ? a[(m - 1) / 2] : (a[m / 2 - 1] + a[m / 2]) / 2; };
      const draw = () => {
        const idx = vals.slice(0, n).map((v, i) => i).sort((a, b) => vals[a] - vals[b] || a - b);
        const s = idx.map(i => vals[i]);
        let lo, hi, mid = -1;
        if (n % 2) { mid = (n - 1) / 2; lo = s.slice(0, mid); hi = s.slice(mid + 1); }
        else { lo = s.slice(0, n / 2); hi = s.slice(n / 2); }
        const Q1 = median(lo), Q2 = median(s), Q3 = median(hi), mn = s[0], mx = s[n - 1];
        /* 堆疊圓點 */
        const stack = {};
        idx.forEach((i, rank) => {
          const v = vals[i], k = stack[v] = (stack[v] || 0) + 1;
          const col = rank === mid ? "#f6dc9a" : (rank < (n % 2 ? mid : n / 2) ? "#8fd0ff" : "#ff8fa3");
          H.set(dots[i], { cx: xOf(v), cy: AY - 12 - (k - 1) * 18, fill: col, display: "" });
        });
        for (let i = n; i < dots.length; i++) H.set(dots[i], { display: "none" });
        H.set(wL, { x1: xOf(mn), x2: xOf(Q1) }); H.set(wR, { x1: xOf(Q3), x2: xOf(mx) });
        H.set(cL, { x1: xOf(mn), x2: xOf(mn) }); H.set(cR, { x1: xOf(mx), x2: xOf(mx) });
        H.set(box, { x: xOf(Q1), width: Math.max(0.01, (Q3 - Q1) * U) });
        H.set(med, { x1: xOf(Q2), x2: xOf(Q2) });
        H.set(tQ1, { x: xOf(Q1), y: BY - 25, text: "Q₁=" + H.fmt(Q1, 2) });
        H.set(tQ3, { x: xOf(Q3), y: BY - 25, text: "Q₃=" + H.fmt(Q3, 2) });
        H.set(tQ2, { x: xOf(Q2), y: BY + 37, text: "Q₂=" + H.fmt(Q2, 2) });
        H.set(tMin, { x: xOf(mn), y: BY + 57, text: "最小 " + mn });
        H.set(tMax, { x: xOf(mx), y: BY + 57, text: "最大 " + mx });
        const list = s.map((v, r) => r === mid ? `<b style="color:#f6dc9a">${v}</b>` : (r < (n % 2 ? mid : n / 2) ? `<span style="color:#8fd0ff">${v}</span>` : `<span style="color:#ff8fa3">${v}</span>`)).join(", ");
        const midTxt = n % 2 ? `中位數是第 ${mid + 1} 筆，$Q_2=${H.fmt(Q2, 2)}$（奇數筆：這一筆不放進前後半）` : `中位數是第 ${n / 2}、${n / 2 + 1} 筆的平均，$Q_2=${H.fmt(Q2, 2)}$（偶數筆：直接對半分）`;
        out.set(`<span class="tag">${n} 筆</span> 排序：${list}<br>${midTxt}<br>前半部中位數 $Q_1=${H.fmt(Q1, 2)}$，後半部中位數 $Q_3=${H.fmt(Q3, 2)}$<br>全距 $=${mx}-${mn}=$ <span class="big">${mx - mn}</span>　四分位距 $=${H.fmt(Q3, 2)}-${H.fmt(Q1, 2)}=$ <span class="big">${H.fmt(Q3 - Q1, 2)}</span>`);
      };
      const row = H.row(stage);
      H.toggle(row, ["9 筆資料", "10 筆資料"], i => { n = i ? 10 : 9; draw(); });
      H.button(row, "↺ 重設資料", () => { vals = start.slice(); draw(); });
      draw();
    },

    /* 兩層樹狀圖：抽兩球，放回／不放回 */
    treeDiagram(stage, H) {
      const W = 480, HH = 420;
      const svg = H.svg(stage, W, HH);
      const layer = H.el("g", {}, svg);
      const bags = [{ r: 2, w: 1 }, { r: 2, w: 2 }, { r: 3, w: 1 }];
      const evNames = ["兩球同色", "一紅一白", "至少一紅"];
      let bag = 0, repl = 1, ev = 0;
      const out = H.readout(stage);
      const gcd = (a, b) => b ? gcd(b, a % b) : a;
      const sub = ["₁", "₂", "₃"];
      const draw = () => {
        layer.textContent = "";
        const B = bags[bag], balls = [];
        for (let i = 0; i < B.r; i++) balls.push({ c: "r", t: "紅" + sub[i] });
        for (let i = 0; i < B.w; i++) balls.push({ c: "w", t: "白" + (B.w > 1 ? sub[i] : "") });
        const leaves = [];
        balls.forEach((a, i) => balls.forEach((b, j) => { if (repl || i !== j) leaves.push({ i, j, a, b }); }));
        const L = leaves.length, top = 26, rowH = (HH - top - 12) / L;
        const test = (a, b) => ev === 0 ? a.c === b.c : ev === 1 ? a.c !== b.c : (a.c === "r" || b.c === "r");
        const col = b => b.c === "r" ? "#ff8fa3" : "#ffffff";
        const RX = 34, X1 = 150, X2 = 290, RY = top + (L * rowH) / 2;
        H.el("text", { x: X1, y: 16, text: "第一次", "text-anchor": "middle", "font-size": 14, fill: "#cfcbe8" }, layer);
        H.el("text", { x: X2, y: 16, text: "第二次", "text-anchor": "middle", "font-size": 14, fill: "#cfcbe8" }, layer);
        H.el("text", { x: 400, y: 16, text: "結果", "text-anchor": "middle", "font-size": 14, fill: "#cfcbe8" }, layer);
        let k = 0;
        balls.forEach((a, i) => {
          const mine = leaves.filter(l => l.i === i);
          const y0 = top + k * rowH, y1 = top + (k + mine.length) * rowH, ym = (y0 + y1) / 2;
          H.el("line", { x1: RX, y1: RY, x2: X1 - 16, y2: ym, stroke: "rgba(205,197,255,.6)", "stroke-width": 1.5 }, layer);
          mine.forEach((l, m) => {
            const y = top + (k + m + 0.5) * rowH, ok = test(l.a, l.b);
            H.el("line", { x1: X1 + 16, y1: ym, x2: X2 - 16, y2: y, stroke: ok ? "rgba(246,220,154,.8)" : "rgba(205,197,255,.35)", "stroke-width": ok ? 2 : 1.2 }, layer);
            H.el("text", { x: X2, y: y + 4.5, text: l.b.t, "text-anchor": "middle", "font-size": 15, fill: col(l.b) }, layer);
            if (ok) H.el("rect", { x: 340, y: y - rowH / 2 + 1.5, width: 132, height: rowH - 3, rx: 5, fill: "rgba(246,220,154,.16)" }, layer);
            H.el("text", { x: 400, y: y + 4.5, text: `(${l.a.t}, ${l.b.t})`, "text-anchor": "middle", "font-size": 14.5, fill: ok ? "#f6dc9a" : "#cfcbe8" }, layer);
            if (ok) H.el("text", { x: 462, y: y + 4.5, text: "✔", "text-anchor": "middle", "font-size": 12, fill: "#5fd3a8" }, layer);
          });
          H.el("text", { x: X1, y: ym + 5, text: a.t, "text-anchor": "middle", "font-size": 17, "font-weight": 700, fill: col(a) }, layer);
          k += mine.length;
        });
        H.el("circle", { cx: RX - 14, cy: RY, r: 6, fill: "#cdc5ff" }, layer);
        const n = balls.length, N = L, K = leaves.filter(l => test(l.a, l.b)).length, d = gcd(K, N);
        const frac = d > 1 ? `\\dfrac{${K}}{${N}}=\\dfrac{${K / d}}{${N / d}}` : `\\dfrac{${K}}{${N}}`;
        out.set(`<span class="tag">${B.r} 紅 ${B.w} 白・${repl ? "放回" : "不放回"}</span> 全部結果：$${n}\\times${repl ? n : n - 1}=${N}$ 種（同樣可能）<br>「${evNames[ev]}」有 ${K} 種，機率 $=${frac}$`);
      };
      const r1 = H.row(stage), r2 = H.row(stage);
      H.toggle(r1, bags.map(b => `${b.r} 紅 ${b.w} 白`), i => { bag = i; draw(); });
      H.toggle(r1, ["放回", "不放回"], i => { repl = i ? 0 : 1; draw(); });
      H.toggle(r2, evNames, i => { ev = i; draw(); });
      draw();
    }
  }
};
