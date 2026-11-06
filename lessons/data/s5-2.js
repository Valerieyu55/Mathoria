/* 1-2 二次函數的最大值與最小值（康軒九下 第 1 章 二次函數）
   對應 108 課綱：F-9-1 二次函數的意義、F-9-2 二次函數的圖形與極值
   主體只處理「已配方好」的二次函數；一般式 y = x² + bx + c 的配方放在標示「挑戰」的段落。 */
window.MATHORIA_LESSON = {
  title: "1-2 二次函數的最大值與最小值",
  unit: "康軒 九下 ・ 第 1 章 二次函數",
  subtitle: "找到頂點，就找到拋物線的最高點或最低點。",
  codes: ["F-9-1 二次函數的意義", "F-9-2 二次函數的圖形與極值"],
  time: "2～3 節課",
  goals: [
    "由 $y=a(x-h)^2+k$ 讀出頂點 $(h,k)$、對稱軸 $x=h$ 與開口方向，而且不被 $h$ 的正負號騙",
    "用「$(x-h)^2\\ge 0$」說明為什麼 $a>0$ 有最小值 $k$、$a<0$ 有最大值 $k$",
    "從 $y=ax^2$、$y=ax^2+k$、$y=a(x-h)^2$、$y=a(x-h)^2+k$ 判斷最大值或最小值，並說出發生在哪個 $x$",
    "挑戰：用八年級學過的配方法，把 $y=x^2+bx+c$ 化成頂點式",
    "在圍籬面積、利潤、拋球高度等情境中列出二次函數，並解釋最大值、最小值的意義"
  ],
  sections: [
    { type: "story", lines: [
      { who: "narrator", text: "拋物線天空塔的第二層，發光的軌道上浮著一行字：「說出最高點，才能往上飛。」" },
      { who: "player", text: "最高點……應該就是拋物線的頂點吧？" },
      { who: "pet", text: "{name}，沒錯！頂點式 $y=a(x-h)^2+k$ 裡，頂點就是 $(h,k)$" },
      { who: "boss", text: "嘻嘻，我是{boss}。$y=-(x+3)^2+5$ 的頂點在 $(3,5)$，括號裡寫 $+3$，$h$ 當然是 $3$ 啦！" },
      { who: "player", text: "等等，$x+3=x-(-3)$，所以 $h=-3$。我才不會把頂點放錯位置！" },
      { who: "pet", text: "找對頂點，最大值、最小值就跑不掉了" }
    ] },

    { type: "concept", title: "複習：頂點式 y = a(x − h)² + k", html: `
      <p>上一節我們看過，二次函數 $y=a(x-h)^2+k$（$a\\ne 0$）的圖形是一條<b>拋物線</b>：</p>
      <div class="table-wrap"><table>
        <tr><th>頂點</th><td>$(h,k)$</td></tr>
        <tr><th>對稱軸</th><td>通過頂點的鉛垂線 $x=h$</td></tr>
        <tr><th>開口方向</th><td>$a>0$ 開口向上；$a<0$ 開口向下</td></tr>
        <tr><th>開口寬窄</th><td>$|a|$ 越大，開口越窄</td></tr>
      </table></div>
      <div class="key"><b>小心正負號</b>：括號裡是「$x$ <b>減</b> $h$」。<br>
        $y=2(x-3)^2+1$：$h=3$，頂點 $(3,1)$。<br>
        $y=2(x+3)^2+1=2\\big(x-(-3)\\big)^2+1$：$h=-3$，頂點 $(-3,1)$。<br>
        而 $k$ 直接照抄：$+1$ 就是 $k=1$，$-1$ 就是 $k=-1$。</div>
      <p class="note">快速檢查法：讓括號等於 0 的 $x$ 就是頂點的 $x$ 坐標。$x+3=0\\Rightarrow x=-3$。</p>
    ` },
    { type: "widget", title: "調整 a、h、k，觀察拋物線", widget: "vertexLab",
      intro: "拉動三個滑桿，看看拋物線、頂點（金色點）和對稱軸（虛線）怎麼變化。",
      caption: "每一格代表 1 單位。$a$ 不能是 0（$a=0$ 就不是二次函數了），所以滑桿會跳過 0。" },

    { type: "concept", title: "為什麼頂點就是最高點或最低點？", html: `
      <p>關鍵在於：任何數的平方都不會是負的，所以</p>
      $$(x-h)^2\\ge 0,\\quad\\text{而且只有在 } x=h \\text{ 時 } (x-h)^2=0$$
      <div class="two-col">
        <div><p><b>當 $a>0$（開口向上）</b></p>
          <p>$a(x-h)^2\\ge 0$，所以 $y=a(x-h)^2+k\\ge k$。</p>
          <p>$y$ 最小就是 $k$，在 $x=h$ 時取到。</p>
          <p>$x$ 離 $h$ 越遠，$y$ 越大，<b>沒有最大值</b>。</p></div>
        <div><p><b>當 $a<0$（開口向下）</b></p>
          <p>$a(x-h)^2\\le 0$，所以 $y=a(x-h)^2+k\\le k$。</p>
          <p>$y$ 最大就是 $k$，在 $x=h$ 時取到。</p>
          <p>$x$ 離 $h$ 越遠，$y$ 越小，<b>沒有最小值</b>。</p></div>
      </div>
      <div class="key"><b>結論</b>：$y=a(x-h)^2+k$<br>
        $a>0$：當 $x=h$ 時，有<b>最小值</b> $k$，沒有最大值（頂點是<b>最低點</b>）。<br>
        $a<0$：當 $x=h$ 時，有<b>最大值</b> $k$，沒有最小值（頂點是<b>最高點</b>）。</div>
      <p class="note">最大值、最小值指的是 <b>$y$ 的值</b>（也就是 $k$）；「在哪裡發生」才是 $x=h$。兩個都要說清楚。</p>
    ` },

    { type: "concept", title: "四種已配方好的形式與平移", html: `
      <p>下面四種寫法都是「已配方好」的二次函數，頂點一眼就看得出來：</p>
      <div class="table-wrap"><table>
        <tr><th>形式</th><th>頂點</th><th>對稱軸</th><th>$a>0$</th><th>$a<0$</th></tr>
        <tr><td>$y=ax^2$</td><td>$(0,0)$</td><td>$x=0$（$y$ 軸）</td><td>最小值 0</td><td>最大值 0</td></tr>
        <tr><td>$y=ax^2+k$</td><td>$(0,k)$</td><td>$x=0$（$y$ 軸）</td><td>最小值 $k$</td><td>最大值 $k$</td></tr>
        <tr><td>$y=a(x-h)^2$</td><td>$(h,0)$</td><td>$x=h$</td><td>最小值 0</td><td>最大值 0</td></tr>
        <tr><td>$y=a(x-h)^2+k$</td><td>$(h,k)$</td><td>$x=h$</td><td>最小值 $k$</td><td>最大值 $k$</td></tr>
      </table></div>
      <h3>平移關係</h3>
      <p>這四種圖形的形狀（開口方向與寬窄）都由 $a$ 決定，彼此只差一個<b>平移</b>：</p>
      <ul>
        <li>$y=ax^2\\;\\to\\;y=ax^2+k$：上下平移。$k>0$ 向上 $k$ 單位，$k<0$ 向下 $|k|$ 單位。</li>
        <li>$y=ax^2\\;\\to\\;y=a(x-h)^2$：左右平移。$h>0$ 向右 $h$ 單位，$h<0$ 向左 $|h|$ 單位。</li>
        <li>$y=ax^2\\;\\to\\;y=a(x-h)^2+k$：頂點從 $(0,0)$ 搬到 $(h,k)$。</li>
      </ul>
      <p class="note">例：$y=-2(x+1)^2+4$ 是把 $y=-2x^2$ 向<b>左</b>平移 1 單位、再向上平移 4 單位。頂點 $(-1,4)$，開口向下，最大值 4。</p>
    ` },
    { type: "widget", title: "拆穿頂點騙徒：拖曳頂點看式子", widget: "vertexTrap",
      intro: "拖曳金色頂點到任一格點，下方會寫出正確的式子。粉紅色叉叉是頂點騙徒「把 $h$ 正負號搞反」時會放錯的位置。",
      caption: "頂點在左邊（$h<0$）時，括號裡反而出現「$+$」；這正是騙徒最愛的陷阱。" },

    { type: "example", title: "例題 1　讀出最大值或最小值", problem: "判斷下列二次函數有最大值還是最小值，求出這個值，並說出在 $x$ 等於多少時發生。<br>(1) $y=-3(x+2)^2+5$　(2) $y=2x^2-8$　(3) $y=\\dfrac{1}{2}(x-4)^2$",
      steps: [
        "(1) $x+2=x-(-2)$，頂點 $(-2,5)$。$a=-3<0$，開口向下，所以當 $x=-2$ 時有<b>最大值 5</b>，沒有最小值。",
        "(2) 這是 $y=ax^2+k$ 型，頂點 $(0,-8)$。$a=2>0$，開口向上，所以當 $x=0$ 時有<b>最小值 $-8$</b>，沒有最大值。",
        "(3) 這是 $y=a(x-h)^2$ 型，頂點 $(4,0)$。$a=\\dfrac{1}{2}>0$，所以當 $x=4$ 時有<b>最小值 0</b>，沒有最大值。"
      ],
      answer: "(1) $x=-2$ 時最大值 5　(2) $x=0$ 時最小值 $-8$　(3) $x=4$ 時最小值 0" },

    { type: "concept", title: "挑戰：用配方法把 y = x² + bx + c 化成頂點式", html: `
      <p class="note"><b>挑戰內容</b>：課綱要求的是「已配方好」的二次函數。如果題目給的是 $y=x^2+bx+c$，可以用<b>八年級學過的配方法</b>先化成頂點式，再讀出最大值或最小值。</p>
      <p>配方法的核心是完全平方公式：</p>
      $$x^2+2mx+m^2=(x+m)^2$$
      <p>所以看到 $x^2+bx$，就加上「$x$ 係數一半的平方」$\\left(\\dfrac{b}{2}\\right)^2$，再減掉同樣的數，式子的值不變。</p>
      <div class="key"><b>示範</b>：$y=x^2-6x+5$<br>
        $x$ 的係數是 $-6$，一半是 $-3$，平方是 $9$。<br>
        $y=(x^2-6x+9)-9+5=(x-3)^2-4$<br>
        頂點 $(3,-4)$，$a=1>0$，所以當 $x=3$ 時有最小值 $-4$。</div>
      <p class="note">驗算：把 $(x-3)^2-4$ 展開，$x^2-6x+9-4=x^2-6x+5$，和原式一樣。</p>
    ` },
    { type: "example", title: "例題 2（挑戰）　先配方，再找極值", problem: "用配方法求下列二次函數的最大值或最小值。<br>(1) $y=x^2+4x+1$　(2) $y=-x^2+6x-4$",
      steps: [
        "(1) $x$ 係數 4 的一半是 2，平方是 4：$y=(x^2+4x+4)-4+1=(x+2)^2-3$。",
        "頂點 $(-2,-3)$，$a=1>0$，當 $x=-2$ 時有最小值 $-3$。",
        "(2) 先把 $-1$ 提出來：$y=-(x^2-6x)-4$。",
        "括號內配方：$x^2-6x=(x-3)^2-9$，所以 $y=-\\big[(x-3)^2-9\\big]-4=-(x-3)^2+9-4=-(x-3)^2+5$。",
        "頂點 $(3,5)$，$a=-1<0$，當 $x=3$ 時有最大值 5。（驗算：$x=3$ 代入原式，$-9+18-4=5$ ✔）"
      ],
      answer: "(1) $x=-2$ 時最小值 $-3$　(2) $x=3$ 時最大值 5" },

    { type: "concept", title: "生活中的最大值與最小值", html: `
      <p>很多「最大」「最小」的問題，列出關係式後就是一個二次函數：</p>
      <ul>
        <li><b>圍籬面積</b>：周長固定時，長方形的寬是 $x$，長就被決定了，面積是 $x$ 的二次函數。</li>
        <li><b>利潤</b>：漲價會讓每件賺更多，但賣出的數量變少，利潤＝每件利潤 × 數量，是二次函數。</li>
        <li><b>拋球高度</b>：往上拋的球，高度 $h$ 和時間 $t$ 的關係是開口向下的拋物線。</li>
      </ul>
      <div class="key"><b>解應用題三步驟</b><br>
        ① 設變數、列出二次函數（並注意變數的合理範圍，例如長度要大於 0）。<br>
        ② 寫成（或利用題目給的）頂點式，找出頂點；若需要自己配方，屬於挑戰內容。<br>
        ③ 用情境的語言回答：<b>最大（小）的是什麼量、是多少、在什麼情況下發生</b>。</div>
    ` },
    { type: "widget", title: "周長 20 公尺的長方形花圃", widget: "fenceArea",
      intro: "用 20 公尺的圍籬圍一個長方形花圃。拉動滑桿改變寬 $x$，觀察面積和右邊的拋物線。",
      caption: "寬 $x$ 公尺時，長是 $10-x$ 公尺，面積 $y=x(10-x)=-(x-5)^2+25$。$0<x<10$ 才合理。" },

    { type: "example", title: "例題 3　拋球的最高高度", problem: "小翔從地面把球往上拋，$t$ 秒後球的高度為 $h=-5(t-2)^2+20$ 公尺。球最高能到幾公尺？在第幾秒？",
      figure: `<svg viewBox="0 0 320 200"><line x1="40" y1="170" x2="300" y2="170" stroke="#fff" stroke-opacity=".5"/><line x1="40" y1="170" x2="40" y2="15" stroke="#fff" stroke-opacity=".5"/><path d="M40,170 Q120,-10 200,170" fill="none" stroke="#8fd0ff" stroke-width="3"/><line x1="120" y1="80" x2="120" y2="170" stroke="#f6dc9a" stroke-dasharray="5 4"/><line x1="40" y1="80" x2="120" y2="80" stroke="#f6dc9a" stroke-dasharray="5 4"/><circle cx="120" cy="80" r="6" fill="#f6dc9a"/><text x="128" y="72" font-size="13" fill="#f6dc9a">頂點 (2, 20)</text><text x="12" y="84" font-size="12" fill="#fff">20</text><text x="116" y="188" font-size="12" fill="#fff">2</text><text x="196" y="188" font-size="12" fill="#fff">4</text><text x="290" y="188" font-size="12" fill="#fff">t</text><text x="46" y="22" font-size="12" fill="#fff">h</text></svg>`,
      steps: [
        "式子已經是頂點式：$h=-5(t-2)^2+20$，頂點 $(2,20)$。",
        "$a=-5<0$，開口向下，頂點是最高點：當 $t=2$ 時，$h$ 有最大值 20。",
        "情境意義：球在拋出後第 2 秒到達最高點，高度 20 公尺。",
        "補充：$t=0$ 時 $h=-5\\times 4+20=0$（從地面出發）；$t=4$ 時 $h=0$，球落回地面。對稱軸 $t=2$ 正好在 0 和 4 的中間。"
      ],
      answer: "拋出後第 2 秒，球達到最高 20 公尺" },

    { type: "example", title: "例題 4（挑戰）　飲料店的最大利潤", problem: "一杯飲料成本 30 元，售價 50 元時每天可賣 100 杯。調查發現：每漲價 1 元，每天就少賣 2 杯。售價定為多少元時，每天的利潤最大？最大利潤是多少？",
      steps: [
        "設漲價 $x$ 元。每杯利潤 $=(50+x)-30=20+x$ 元，每天賣 $100-2x$ 杯（要 $0\\le x<50$ 才合理）。",
        "每天利潤 $y=(20+x)(100-2x)=-2x^2+60x+2000$。",
        "配方（挑戰）：$y=-2(x^2-30x)+2000=-2\\big[(x-15)^2-225\\big]+2000=-2(x-15)^2+2450$。",
        "$a=-2<0$，當 $x=15$ 時 $y$ 有最大值 2450。",
        "情境意義：漲價 15 元，售價 $50+15=65$ 元，每天賣 $100-30=70$ 杯，利潤 $35\\times 70=2450$ 元 ✔。"
      ],
      answer: "售價 65 元時，每天利潤最大，為 2450 元" },

    { type: "myth", title: "破解{boss}的幻術", items: [
      { wrong: "$y=(x+2)^2-1$ 的頂點是 $(2,-1)$。", right: "頂點是 $(-2,-1)$。", why: "$x+2=x-(-2)$，所以 $h=-2$。讓括號等於 0 的 $x$ 就是頂點的 $x$ 坐標。" },
      { wrong: "$y=3(x-1)^2+4$ 有最大值 4。", right: "$a=3>0$，開口向上，當 $x=1$ 時有<b>最小值</b> 4，沒有最大值。", why: "開口向上的拋物線往兩側一直升高，可以要多大有多大。" },
      { wrong: "$y=-(x-3)^2+5$ 的最大值是 3。", right: "最大值是 5，發生在 $x=3$ 時。", why: "最大值、最小值是 $y$ 的值 $k$；$x=h$ 只是「在哪裡」取到。" },
      { wrong: "$y=(x-4)^2$ 是把 $y=x^2$ 向左平移 4 單位。", right: "是向<b>右</b>平移 4 單位，頂點從 $(0,0)$ 移到 $(4,0)$。", why: "要讓 $(x-4)^2=0$，$x$ 必須是 4，所以最低點跑到 $x=4$，也就是右邊。" }
    ] },

    { type: "practice", title: "即時練習", items: [
      { q: "$y=2(x-3)^2+1$ 的最小值是多少？", answer: ["1"], show: "1", ex: "$a=2>0$，開口向上，當 $x=3$ 時有最小值 1。" },
      { q: "$y=-(x+4)^2-2$ 的頂點坐標是？", o: ["$(-4,-2)$", "$(4,-2)$", "$(-4,2)$", "$(4,2)$"], a: 0, ex: "$x+4=x-(-4)$，所以 $h=-4$；$k=-2$。頂點 $(-4,-2)$。" },
      { q: "關於 $y=-3x^2+7$，下列敘述何者正確？", o: ["當 $x=0$ 時有最大值 7", "當 $x=0$ 時有最小值 7", "當 $x=7$ 時有最大值 0", "有最大值 $-3$"], a: 0, ex: "這是 $y=ax^2+k$ 型，頂點 $(0,7)$，$a=-3<0$ 開口向下，所以 $x=0$ 時有最大值 7。" },
      { q: "$y=5(x+1)^2$ 在 $x$ 等於多少時有最小值？", answer: ["-1"], show: "$-1$", hint: "讓括號等於 0 的 $x$ 是多少？", ex: "頂點 $(-1,0)$，$a=5>0$，當 $x=-1$ 時有最小值 0。" },
      { q: "下列哪一個二次函數有<b>最大值</b> 3？", o: ["$y=-2(x-1)^2+3$", "$y=2(x-1)^2+3$", "$y=-2(x-3)^2$", "$y=3x^2-1$"], a: 0, ex: "要有最大值須 $a<0$，且最大值是 $k$。只有 $y=-2(x-1)^2+3$ 符合；$y=-2(x-3)^2$ 的最大值是 0。" },
      { q: "往上拋的球，$t$ 秒後高度 $h=-5(t-3)^2+45$ 公尺。球最高能到幾公尺？", answer: ["45"], show: "45 公尺", ex: "$a=-5<0$，頂點 $(3,45)$，在第 3 秒時達到最高 45 公尺。" },
      { q: "用 24 公分長的繩子圍成長方形，寬 $x$ 公分時面積 $y=x(12-x)$，可整理成 $y=-(x-6)^2+36$。面積最大是多少平方公分？", answer: ["36"], show: "36", hint: "寬 $x$ 時，長是 $12-x$。", ex: "面積 $y=x(12-x)=-(x-6)^2+36$，當 $x=6$（正方形）時面積最大 36 平方公分。" },
      { q: "（挑戰）用配方法求 $y=x^2-8x+10$ 的最小值。", answer: ["-6"], show: "$-6$", hint: "$-8$ 的一半是 $-4$，平方是 16。", ex: "$y=(x^2-8x+16)-16+10=(x-4)^2-6$，當 $x=4$ 時有最小值 $-6$。" }
    ] },

    { type: "summary", title: "重點整理", items: [
      "$y=a(x-h)^2+k$（$a\\ne 0$）：頂點 $(h,k)$，對稱軸 $x=h$；$a>0$ 開口向上，$a<0$ 開口向下。",
      "括號裡是「減 $h$」：$y=(x+2)^2$ 的頂點在 $x=-2$。讓括號等於 0 的 $x$ 就是頂點的 $x$ 坐標。",
      "因為 $(x-h)^2\\ge 0$：$a>0$ 時在 $x=h$ 有最小值 $k$、沒有最大值；$a<0$ 時在 $x=h$ 有最大值 $k$、沒有最小值。",
      "$y=ax^2$、$y=ax^2+k$、$y=a(x-h)^2$ 的頂點分別是 $(0,0)$、$(0,k)$、$(h,0)$，都可由 $y=ax^2$ 平移得到。",
      "挑戰：$y=x^2+bx+c$ 可用配方法加減 $\\left(\\dfrac{b}{2}\\right)^2$ 化成頂點式。",
      "應用題：列出二次函數 → 找頂點 → 用情境說明「什麼量、最大（小）是多少、在何時發生」。周長固定的長方形，正方形面積最大。"
    ] },

    { type: "extend", title: "高中延伸：一般式的頂點與限定範圍的極值", where: "龍騰 高一 數學第一冊 ・ 多項式函數", html: `
      <p>高中會直接處理一般式 $y=ax^2+bx+c$（$a\\ne 0$），並討論「$x$ 只能在某個範圍內」時的最大值、最小值。</p>
      <h3>1. 頂點公式</h3>
      <p>對一般式配方：</p>
      $$y=a\\left(x^2+\\frac{b}{a}x\\right)+c=a\\left(x+\\frac{b}{2a}\\right)^2+c-\\frac{b^2}{4a}=a\\left(x+\\frac{b}{2a}\\right)^2+\\frac{4ac-b^2}{4a}$$
      <p>所以頂點的 $x$ 坐標是 $x=-\\dfrac{b}{2a}$，頂點坐標 $\\left(-\\dfrac{b}{2a},\\dfrac{4ac-b^2}{4a}\\right)$。</p>
      <p>例：$y=2x^2-8x+3$，$x=-\\dfrac{-8}{2\\times 2}=2$，代入得 $y=8-16+3=-5$，頂點 $(2,-5)$，最小值 $-5$。</p>
      <h3>2. 限定範圍的最大值與最小值</h3>
      <p>若 $x$ 只能在一段範圍內，就比較「頂點（若在範圍內）」和「兩個端點」的 $y$ 值。</p>
      <p>例：$y=(x-1)^2+2$，$-1\\le x\\le 2$。</p>
      <ul>
        <li>頂點 $x=1$ 在範圍內，$y=2$ 是最小值。</li>
        <li>端點：$x=-1$ 時 $y=(-2)^2+2=6$；$x=2$ 時 $y=1^2+2=3$。</li>
        <li>所以最大值 6（在 $x=-1$），最小值 2（在 $x=1$）。離對稱軸越遠的端點，$y$ 越大。</li>
      </ul>
      <h3>3. 連到二次不等式</h3>
      <p>拋物線在 $x$ 軸下方的部分，就是 $y<0$ 的解。例如 $y=x^2-2x-3=(x+1)(x-3)$ 開口向上、與 $x$ 軸交於 $-1$ 和 $3$，所以 $x^2-2x-3<0$ 的解是 $-1<x<3$。高中會用這種「看圖」的方式解二次不等式。</p>
    ` }
  ],

  /* ================= 互動圖 ================= */
  widgets: {
    /* 頂點式實驗室：a、h、k 三個滑桿 */
    vertexLab(stage, H) {
      const U = 22, O = [240, 165], W = 480, Ht = 330;
      const X = x => O[0] + x * U, Y = y => O[1] - y * U;
      const svg = H.svg(stage, W, Ht);
      const cid = "vlclip" + Math.random().toString(36).slice(2, 7);
      const defs = H.el("defs", {}, svg); const cp = H.el("clipPath", { id: cid }, defs); H.el("rect", { x: 0, y: 0, width: W, height: Ht }, cp);
      for (let i = -10; i <= 10; i++) H.el("line", { x1: X(i), y1: 0, x2: X(i), y2: Ht, stroke: "rgba(255,255,255,.06)" }, svg);
      for (let j = -7; j <= 7; j++) H.el("line", { x1: 0, y1: Y(j), x2: W, y2: Y(j), stroke: "rgba(255,255,255,.06)" }, svg);
      H.el("line", { x1: 0, y1: O[1], x2: W, y2: O[1], stroke: "rgba(255,255,255,.45)" }, svg);
      H.el("line", { x1: O[0], y1: 0, x2: O[0], y2: Ht, stroke: "rgba(255,255,255,.45)" }, svg);
      for (const i of [-10, -5, 5, 10]) H.el("text", { x: X(i) - 6, y: O[1] + 16, text: String(i), "font-size": 14, fill: "rgba(255,255,255,.6)" }, svg);
      for (const j of [-5, 5]) H.el("text", { x: O[0] + 5, y: Y(j) + 4, text: String(j), "font-size": 14, fill: "rgba(255,255,255,.6)" }, svg);
      const axis = H.el("line", { y1: 0, y2: Ht, stroke: "#8fd0ff", "stroke-width": 2, "stroke-dasharray": "7 6" }, svg);
      const curve = H.el("path", { fill: "none", stroke: "#cdc5ff", "stroke-width": 3.5, "clip-path": `url(#${cid})` }, svg);
      const kline = H.el("line", { stroke: "#f6dc9a", "stroke-width": 1.5, "stroke-dasharray": "4 4", opacity: .7 }, svg);
      const V = H.el("circle", { r: 8, fill: "#f6dc9a", stroke: "#fff", "stroke-width": 2 }, svg);
      const VL = H.el("text", { fill: "#f6dc9a", "font-size": 17, "font-weight": 700 }, svg);
      const out = H.readout(stage);
      const avals = [-3, -2.5, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5, 3];
      let a = 1, h = 2, k = -3;
      const draw = () => {
        let d = "";
        for (let x = -11; x <= 11.001; x += 0.1) { const y = a * (x - h) ** 2 + k; const py = Math.max(-200, Math.min(Ht + 200, Y(y))); d += (d ? " L" : "M") + X(x).toFixed(1) + "," + py.toFixed(1); }
        H.set(curve, { d });
        H.set(axis, { x1: X(h), x2: X(h) });
        H.set(kline, { x1: O[0], y1: Y(k), x2: X(h), y2: Y(k) });
        H.set(V, { cx: X(h), cy: Y(k) });
        const lx = X(h) + 12 > W - 80 ? X(h) - 86 : X(h) + 12;
        H.set(VL, { x: lx, y: Y(k) + (a > 0 ? 22 : -12), text: `(${H.fmt(h)}, ${H.fmt(k)})` });
        const up = a > 0;
        out.set(`$${eq(a, h, k)}$<br><span class="tag">${up ? "開口向上" : "開口向下"}</span>頂點 $(${H.fmt(h)},${H.fmt(k)})$，對稱軸 $x=${H.fmt(h)}$<br>` +
          (up ? `當 $x=${H.fmt(h)}$ 時有<b>最小值</b> <span class="big">${H.fmt(k)}</span>，沒有最大值。`
              : `當 $x=${H.fmt(h)}$ 時有<b>最大值</b> <span class="big">${H.fmt(k)}</span>，沒有最小值。`));
      };
      H.slider(stage, { label: "a", min: 0, max: avals.length - 1, step: 1, value: 7, fmt: i => H.fmt(avals[i]) }, i => { a = avals[i]; draw(); });
      H.slider(stage, { label: "h", min: -6, max: 6, step: 0.5, value: 2, fmt: v => H.fmt(v) }, v => { h = v; draw(); });
      H.slider(stage, { label: "k", min: -5, max: 5, step: 0.5, value: -3, fmt: v => H.fmt(v) }, v => { k = v; draw(); });
      function eq(a, h, k) {
        const fa = H.fmt(a), A = a === 1 ? "" : a === -1 ? "-" : fa;
        const inner = h === 0 ? "x" : h > 0 ? `x-${H.fmt(h)}` : `x+${H.fmt(-h)}`;
        const sq = h === 0 ? "x^2" : `(${inner})^2`;
        const K = k === 0 ? "" : k > 0 ? `+${H.fmt(k)}` : `-${H.fmt(-k)}`;
        return `y=${A}${sq}${K}`;
      }
    },

    /* 頂點正負號陷阱：拖曳頂點，式子自動更新 */
    vertexTrap(stage, H) {
      const U = 24, O = [240, 165], W = 480, Ht = 330;
      const X = x => O[0] + x * U, Y = y => O[1] - y * U;
      const svg = H.svg(stage, W, Ht);
      const cid = "vtclip" + Math.random().toString(36).slice(2, 7);
      const defs = H.el("defs", {}, svg); const cp = H.el("clipPath", { id: cid }, defs); H.el("rect", { x: 0, y: 0, width: W, height: Ht }, cp);
      for (let i = -9; i <= 9; i++) H.el("line", { x1: X(i), y1: 0, x2: X(i), y2: Ht, stroke: "rgba(255,255,255,.06)" }, svg);
      for (let j = -6; j <= 6; j++) H.el("line", { x1: 0, y1: Y(j), x2: W, y2: Y(j), stroke: "rgba(255,255,255,.06)" }, svg);
      H.el("line", { x1: 0, y1: O[1], x2: W, y2: O[1], stroke: "rgba(255,255,255,.45)" }, svg);
      H.el("line", { x1: O[0], y1: 0, x2: O[0], y2: Ht, stroke: "rgba(255,255,255,.45)" }, svg);
      for (const i of [-8, -4, 4, 8]) H.el("text", { x: X(i) - 5, y: O[1] + 16, text: String(i), "font-size": 14, fill: "rgba(255,255,255,.6)" }, svg);
      for (const j of [-4, 4]) H.el("text", { x: O[0] + 5, y: Y(j) + 4, text: String(j), "font-size": 14, fill: "rgba(255,255,255,.6)" }, svg);
      const wrongCurve = H.el("path", { fill: "none", stroke: "#ff8fa3", "stroke-width": 2, "stroke-dasharray": "6 6", opacity: .65, "clip-path": `url(#${cid})` }, svg);
      const curve = H.el("path", { fill: "none", stroke: "#cdc5ff", "stroke-width": 3.5, "clip-path": `url(#${cid})` }, svg);
      const axis = H.el("line", { y1: 0, y2: Ht, stroke: "#8fd0ff", "stroke-width": 2, "stroke-dasharray": "7 6" }, svg);
      const cross = H.el("path", { stroke: "#ff8fa3", "stroke-width": 3.5, "stroke-linecap": "round" }, svg);
      const crossL = H.el("text", { fill: "#ff8fa3", "font-size": 15 }, svg);
      const V = H.el("circle", { r: 12, fill: "#f6dc9a", stroke: "#fff", "stroke-width": 2 }, svg);
      const VL = H.el("text", { fill: "#f6dc9a", "font-size": 17, "font-weight": 700 }, svg);
      const out = H.readout(stage);
      let a = 1, h = -2, k = -1;
      const path = (hh) => { let d = ""; for (let x = -11; x <= 11.001; x += 0.1) { const y = a * (x - hh) ** 2 + k; d += (d ? " L" : "M") + X(x).toFixed(1) + "," + Math.max(-200, Math.min(Ht + 200, Y(y))).toFixed(1); } return d; };
      const draw = () => {
        H.set(curve, { d: path(h) }); H.set(axis, { x1: X(h), x2: X(h) });
        H.set(V, { cx: X(h), cy: Y(k) });
        H.set(VL, { x: X(h) > W - 90 ? X(h) - 80 : X(h) + 14, y: Y(k) + (a > 0 ? 24 : -14), text: `(${h}, ${k})` });
        const show = h !== 0;
        H.set(wrongCurve, { d: show ? path(-h) : "" });
        const cx = X(-h), cy = Y(k), s = 7;
        H.set(cross, { d: show ? `M${cx - s},${cy - s} L${cx + s},${cy + s} M${cx + s},${cy - s} L${cx - s},${cy + s}` : "" });
        H.set(crossL, { x: cx - 30, y: cy + (a > 0 ? -12 : 22), text: show ? "騙徒的頂點" : "" });
        const A = a === 1 ? "" : "-";
        const inner = h === 0 ? "x" : h > 0 ? `x-${h}` : `x+${-h}`;
        const sq = h === 0 ? "x^2" : `(${inner})^2`;
        const K = k === 0 ? "" : k > 0 ? `+${k}` : `-${-k}`;
        let msg = `<span class="big">$y=${A}${sq}${K}$</span><br>頂點 $(${h},${k})$，所以 $h=${h}$、$k=${k}$。`;
        if (h < 0) msg += `<br>$h$ 是負的，括號寫成 $x-(${h})=x+${-h}$。騙徒看到「$+${-h}$」就說頂點在 $x=${-h}$ ✘`;
        else if (h > 0) msg += `<br>括號 $x-${h}$ 等於 0 時 $x=${h}$，頂點在右邊。騙徒會說在 $x=${-h}$ ✘`;
        else msg += `<br>$h=0$，頂點在 $y$ 軸上，括號省略。`;
        msg += `<br>${a > 0 ? `當 $x=${h}$ 時有<b>最小值</b> $${k}$` : `當 $x=${h}$ 時有<b>最大值</b> $${k}$`}`;
        out.set(msg);
      };
      H.drag(svg, V, (x, y) => {
        h = Math.max(-8, Math.min(8, Math.round((x - O[0]) / U)));
        k = Math.max(-5, Math.min(5, Math.round((O[1] - y) / U)));
        h = h + 0; k = k + 0; draw();
      });
      H.toggle(stage, ["$a=1$（開口向上）", "$a=-1$（開口向下）"], i => { a = i === 0 ? 1 : -1; draw(); });
      H.math(stage);
    },

    /* 周長 20 的長方形：面積與寬的拋物線 */
    fenceArea(stage, H) {
      const W = 480, Ht = 330, S = 16;
      const svg = H.svg(stage, W, Ht);
      /* 左：長方形 */
      const rc = [105, 150];
      const rect = H.el("rect", { fill: "rgba(95,211,168,.22)", stroke: "#5fd3a8", "stroke-width": 3 }, svg);
      const tw = H.el("text", { fill: "#8fd0ff", "font-size": 15 }, svg), tl = H.el("text", { fill: "#ff8fa3", "font-size": 15 }, svg);
      const ta = H.el("text", { fill: "#fff", "font-size": 14, "text-anchor": "middle" }, svg);
      H.el("text", { x: 20, y: 316, fill: "rgba(255,255,255,.6)", "font-size": 12, text: "周長固定 20 公尺" }, svg);
      /* 右：面積圖 */
      const g0 = [262, 290], gx = 20, gy = 10;   /* x: 0~10，y: 0~25 */
      const GX = x => g0[0] + x * gx, GY = y => g0[1] - y * gy;
      for (let i = 0; i <= 10; i++) H.el("line", { x1: GX(i), y1: GY(0), x2: GX(i), y2: GY(26), stroke: "rgba(255,255,255,.06)" }, svg);
      for (let j = 0; j <= 25; j += 5) { H.el("line", { x1: GX(0), y1: GY(j), x2: GX(10), y2: GY(j), stroke: "rgba(255,255,255,.06)" }, svg); H.el("text", { x: GX(0) - 22, y: GY(j) + 4, "font-size": 13, fill: "rgba(255,255,255,.6)", text: String(j) }, svg); }
      for (const i of [0, 5, 10]) H.el("text", { x: GX(i) - 4, y: GY(0) + 16, "font-size": 13, fill: "rgba(255,255,255,.6)", text: String(i) }, svg);
      H.el("line", { x1: GX(0), y1: GY(0), x2: GX(10.4), y2: GY(0), stroke: "rgba(255,255,255,.5)" }, svg);
      H.el("line", { x1: GX(0), y1: GY(0), x2: GX(0), y2: GY(27), stroke: "rgba(255,255,255,.5)" }, svg);
      H.el("text", { x: GX(7.5) - 14, y: GY(0) + 18, "font-size": 13, fill: "#8fd0ff", text: "寬 x" }, svg);
      H.el("text", { x: GX(0) + 6, y: GY(27) + 6, "font-size": 12, fill: "#5fd3a8", text: "面積 y" }, svg);
      let d = ""; for (let x = 0; x <= 10.001; x += 0.1) d += (d ? " L" : "M") + GX(x).toFixed(1) + "," + GY(x * (10 - x)).toFixed(1);
      H.el("path", { d, fill: "none", stroke: "#cdc5ff", "stroke-width": 3 }, svg);
      H.el("line", { x1: GX(5), y1: GY(0), x2: GX(5), y2: GY(25), stroke: "#f6dc9a", "stroke-dasharray": "5 5", opacity: .6 }, svg);
      H.el("circle", { cx: GX(5), cy: GY(25), r: 4, fill: "#f6dc9a" }, svg);
      const drop = H.el("line", { stroke: "#5fd3a8", "stroke-width": 1.5, "stroke-dasharray": "4 4" }, svg);
      const pt = H.el("circle", { r: 8, fill: "#5fd3a8", stroke: "#fff", "stroke-width": 2 }, svg);
      const out = H.readout(stage);
      H.slider(stage, { label: "寬 x（公尺）", min: 0.5, max: 9.5, step: 0.5, value: 2, fmt: v => H.fmt(v) }, x => {
        const L = 10 - x, A = x * L;
        const w = x * S, l = L * S;
        H.set(rect, { x: rc[0] - l / 2, y: rc[1] - w / 2, width: l, height: w });
        H.set(tl, { x: rc[0] - 30, y: rc[1] - w / 2 - 8, text: `長 ${H.fmt(L)}` });
        H.set(tw, { x: rc[0] + l / 2 + 6, y: rc[1] + 4, text: `寬 ${H.fmt(x)}` });
        H.set(ta, { x: rc[0], y: rc[1] + 5, text: w > 20 ? H.fmt(A, 2) + " m²" : "" });
        H.set(pt, { cx: GX(x), cy: GY(A) }); H.set(drop, { x1: GX(x), y1: GY(0), x2: GX(x), y2: GY(A) });
        const sq = x === 5;
        out.set(`寬 $${H.fmt(x)}$，長 $10-${H.fmt(x)}=${H.fmt(L)}$，面積 $y=${H.fmt(x)}\\times ${H.fmt(L)}=$ <span class="big">${H.fmt(A, 2)}</span> 平方公尺<br>` +
          `$y=x(10-x)=-(x-5)^2+25$，` + (sq ? `<span class="tag">正方形！</span>現在 $x=5$，面積達到<b>最大值 25</b>。` : `最大值 25 發生在 $x=5$（正方形），目前還差 $${H.fmt(25 - A, 2)}$。`));
      });
    }
  }
};
