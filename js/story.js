/* =====================================================================
   MATHORIA 數域魔法學院 — 劇情對話腳本
   ---------------------------------------------------------------------
   說話的人（who）：
     player   主角（學生自己，顯示目前進化階段的立繪）
     pet      寵物夥伴（依學生選的寵物，會自動加上口頭禪）
     boss     該據點的魔王
     narrator 學院之聲（旁白，不顯示立繪）
   文字裡可用：{name} 學生暱稱、{pet} 寵物名字、{boss} 魔王名字、{station} 據點名字
   mood（可省略）：happy 跳一下｜shock 震一下｜think 歪頭｜angry 抖動
   老師想改台詞，直接改這個檔案的文字即可。
   ===================================================================== */

window.MATHORIA_STORY = {

  /* 寵物個性：口頭禪會自動加在寵物每句話的最後 */
  petVoice: {
    crystal_fox: { tic: "～", intro: "我是星靈狐，眼睛最擅長看出圖形裡藏起來的形狀" },
    ink_cat: { tic: "喵", intro: "我是墨數貓，算得比誰都快，不過你可別偷懶" },
    wisdom_owl: { tic: "咕", intro: "我是智慧鴞，任何結論都要有理由，這是我的原則" },
    starlight_dragon: { tic: "嗷", intro: "我是光翼龍，最喜歡把數學用在真實世界的冒險裡" }
  },

  /* ---------- 入學開場 ---------- */
  opening: [
    { who: "narrator", text: "很久以前，數域世界的八座浮空島，靠著「數學法則」彼此相連。" },
    { who: "narrator", text: "直到「迷思魔王」們出現，用錯誤的想法把法則一條條扯斷，島嶼被黑霧吞沒。" },
    { who: "player", text: "這裡就是數域魔法學院……我真的被選上了？", mood: "shock" },
    { who: "pet", text: "{name}，終於等到你了！{petIntro}", mood: "happy" },
    { who: "player", text: "等等，你會說話？而且你知道我的名字？", mood: "think" },
    { who: "pet", text: "從今天起，我就是你的夥伴。每解開一個單元，你和我都會變得更強" },
    { who: "pet", text: "第一站在北邊的「相似形之森」，那裡的迷霧最淡，適合新生出發" },
    { who: "player", text: "好！那就出發吧，{pet}！", mood: "happy" }
  ],

  /* ---------- 各據點 ---------- */
  stations: {
    similar: {
      enter: [
        { who: "narrator", text: "相似形之森。每一棵樹，都按照同一個比例長大。" },
        { who: "pet", text: "你看那兩棵樹，形狀一模一樣，只是一大一小", mood: "think" },
        { who: "player", text: "所以大的那棵，是把小的每一邊都「加長一樣多」嗎？", mood: "think" },
        { who: "pet", text: "不對不對！是每一邊都「乘上同一個倍數」。加法會把形狀撐歪的", mood: "shock" },
        { who: "player", text: "乘同一個比……我記住了。先從連比例開始吧！", mood: "happy" }
      ],
      bossBefore: [
        { who: "boss", text: "嘻嘻，放大圖形？簡單啦，每一邊都加 3 公分就好了～", mood: "happy" },
        { who: "player", text: "才不是！相似是對應邊成「同一個比例」，要用乘的。", mood: "angry" },
        { who: "boss", text: "那……那我把這兩條不對應的邊拿來比，你總分不出來了吧？", mood: "think" },
        { who: "pet", text: "{name}，先找對應頂點，再比對應邊，它就騙不了你" }
      ],
      bossAfter: [
        { who: "boss", text: "嗚……被看穿了，迷霧要散了……", mood: "shock" },
        { who: "pet", text: "成功了！森林的比例法則恢復了", mood: "happy" },
        { who: "player", text: "原來面積比還是相似比的平方，這下全都串起來了。", mood: "happy" }
      ]
    },
    circle: {
      enter: [
        { who: "narrator", text: "圓環聖殿。白色的弧與弦，在這裡交織成神殿的骨架。" },
        { who: "player", text: "到處都是圓……這裡的角度好像都有規律。", mood: "think" },
        { who: "pet", text: "注意看「同一段弧」對著的角，圓心角和圓周角之間有固定的關係" },
        { who: "player", text: "圓周角是圓心角的一半，前提是它們對著同一段弧，對吧？", mood: "happy" },
        { who: "pet", text: "答對了！這句話就是進入聖殿的鑰匙" }
      ],
      bossBefore: [
        { who: "boss", text: "吼——圓周角、圓心角，長得都一樣，當然一樣大！", mood: "angry" },
        { who: "player", text: "它們的頂點位置不同：一個在圓心，一個在圓周上。", mood: "think" },
        { who: "pet", text: "而且要先確認它們看的是不是同一段弧，別被牠混過去" }
      ],
      bossAfter: [
        { who: "boss", text: "我的弧……斷掉了……", mood: "shock" },
        { who: "player", text: "同弧的圓周角，是圓心角的一半。這次不會再搞混了。", mood: "happy" },
        { who: "pet", text: "聖殿的光環又亮起來了", mood: "happy" }
      ]
    },
    truth: {
      enter: [
        { who: "narrator", text: "真理審判庭。沒有理由的主張，會被天平判定無效。" },
        { who: "pet", text: "在這裡，每說一句話都要附上「因為」" },
        { who: "player", text: "所以證明就是：已知什麼、要證什麼，然後一步一步接起來？", mood: "think" },
        { who: "pet", text: "沒錯，而且每一步都要寫出你用的是哪一個性質" }
      ],
      bossBefore: [
        { who: "boss", text: "肅靜！本庭宣判：因為結論成立，所以結論成立！", mood: "angry" },
        { who: "player", text: "你把要證明的東西當成已知了，這叫循環論證。", mood: "angry" },
        { who: "boss", text: "那……我跳過中間幾步，總可以吧？", mood: "think" },
        { who: "pet", text: "不行，少一步，整條推理鏈就斷了" }
      ],
      bossAfter: [
        { who: "boss", text: "天平……竟然站在你那邊……", mood: "shock" },
        { who: "player", text: "已知、求證、證明，每一步都要有根據。", mood: "happy" },
        { who: "pet", text: "審判庭恢復公正了", mood: "happy" }
      ]
    },
    threecenter: {
      enter: [
        { who: "narrator", text: "三心神殿。三角形裡，藏著三顆會發光的心。" },
        { who: "pet", text: "外心、內心、重心，它們的位置和性質都不一樣", mood: "think" },
        { who: "player", text: "外心到三個頂點等距，內心到三條邊等距……", mood: "think" },
        { who: "pet", text: "重心呢？", mood: "think" },
        { who: "player", text: "重心把每條中線分成 2：1，靠頂點那段比較長！", mood: "happy" }
      ],
      bossBefore: [
        { who: "boss", text: "嘿嘿，我是重心喔，我到三個頂點一樣遠～", mood: "happy" },
        { who: "player", text: "到三頂點等距的是外心，你冒充錯了。", mood: "angry" },
        { who: "boss", text: "那我換成內心，內心也到三頂點等距吧？", mood: "think" },
        { who: "pet", text: "內心是到三「邊」等距，牠又在偷換概念" }
      ],
      bossAfter: [
        { who: "boss", text: "三顆核心……都被你認出來了……", mood: "shock" },
        { who: "player", text: "外心看頂點、內心看邊、重心看中線，分清楚了。", mood: "happy" },
        { who: "pet", text: "神殿的三顆心又一起亮了", mood: "happy" }
      ]
    },
    parabola: {
      enter: [
        { who: "narrator", text: "拋物線天空塔。塔身纏繞著發光的曲線軌道，直通雲端。" },
        { who: "player", text: "這條軌道是 y = a(x − h)² + k 的形狀吧？", mood: "think" },
        { who: "pet", text: "對，a 決定開口方向和寬窄，(h, k) 就是頂點" },
        { who: "player", text: "頂點在哪裡，我就能知道最高或最低能到哪。", mood: "happy" },
        { who: "pet", text: "要爬到塔頂，就要先找到頂點" }
      ],
      bossBefore: [
        { who: "boss", text: "y = (x + 2)² 的頂點？當然在 x = 2 啦！", mood: "happy" },
        { who: "player", text: "x + 2 等於 x − (−2)，所以 h 是 −2。", mood: "angry" },
        { who: "boss", text: "可惡，我的面具都翻過來了……", mood: "shock" },
        { who: "pet", text: "記住：括號裡是「減 h」，正負號別被牠騙了" }
      ],
      bossAfter: [
        { who: "boss", text: "頂點……被你找到了……", mood: "shock" },
        { who: "player", text: "配方找頂點，就能算出最大值和最小值。", mood: "happy" },
        { who: "pet", text: "天空塔的軌道恢復了，我們飛上去吧", mood: "happy" }
      ]
    },
    probability: {
      enter: [
        { who: "narrator", text: "機率命運島。骰子、轉盤、燈籠，整座島像一場不會結束的嘉年華。" },
        { who: "player", text: "這裡好熱鬧，可是總覺得哪裡怪怪的。", mood: "think" },
        { who: "pet", text: "在這座島上，直覺常常說謊，要相信的是數據" },
        { who: "player", text: "所以要先整理資料，看四分位數和盒狀圖，再算機率。", mood: "happy" }
      ],
      bossBefore: [
        { who: "boss", text: "哈哈哈！你已經連輸五次了，下一次一定會贏！", mood: "happy" },
        { who: "player", text: "每一次擲骰子都是獨立事件，前面輸幾次都不影響下一次。", mood: "angry" },
        { who: "boss", text: "那……第二四分位數就是平均數，對吧？", mood: "think" },
        { who: "pet", text: "四分位數看的是排序後的位置，不是平均" }
      ],
      bossAfter: [
        { who: "boss", text: "我的王冠骰子……竟然擲不出想要的點數……", mood: "shock" },
        { who: "player", text: "機率不會記住過去，數據才不會說謊。", mood: "happy" },
        { who: "pet", text: "命運島的燈籠變得好安靜，真好", mood: "happy" }
      ]
    },
    space: {
      enter: [
        { who: "narrator", text: "空間魔方城。平面在這裡被摺成立體，想像力是唯一的通行證。" },
        { who: "pet", text: "看那些漂浮的方塊，每一個都能攤開成一張展開圖", mood: "think" },
        { who: "player", text: "兩條直線不相交又不平行……那就是歪斜線？", mood: "think" },
        { who: "pet", text: "沒錯，只有在空間裡才會出現歪斜線" },
        { who: "player", text: "好，我會在腦中把每一張圖都摺起來看看。", mood: "happy" }
      ],
      bossBefore: [
        { who: "boss", text: "看我這張展開圖，摺起來就是完美的正方體！", mood: "happy" },
        { who: "player", text: "你有兩個面會疊在一起，這張摺不回正方體。", mood: "angry" },
        { who: "boss", text: "那這兩條線不相交，所以一定平行！", mood: "think" },
        { who: "pet", text: "在空間裡，不相交也可能是歪斜，別上當" }
      ],
      bossAfter: [
        { who: "boss", text: "我的身體……摺不起來了……", mood: "shock" },
        { who: "player", text: "平行、垂直、歪斜，我都分得清楚了。", mood: "happy" },
        { who: "pet", text: "魔方城重新拼好了", mood: "happy" }
      ]
    },
    final: {
      enter: [
        { who: "narrator", text: "終焉試煉之地。所有魔王的碎片，都在金色之門前聚集。" },
        { who: "player", text: "相似、圓、證明、函數、機率、空間……全部都在這裡。", mood: "think" },
        { who: "pet", text: "{name}，這一路上學會的法則，現在都是你的武器" },
        { who: "player", text: "先判斷題目屬於哪一章，再把學過的法則一個一個叫出來。", mood: "happy" }
      ],
      bossBefore: [
        { who: "boss", text: "愚蠢的守護者，我把所有單元攪在一起，看你從哪裡下手！", mood: "angry" },
        { who: "player", text: "不管題目怎麼混，都是由我學過的法則組成的。", mood: "angry" },
        { who: "pet", text: "我們一起走過八座島，這一戰不會輸" },
        { who: "boss", text: "那就來吧！讓我看看你的數學有多少真本事！", mood: "angry" }
      ],
      bossAfter: [
        { who: "boss", text: "不可能……所有迷思……都被拆穿了……", mood: "shock" },
        { who: "narrator", text: "金色之門緩緩打開，八座浮空島的法則重新相連。" },
        { who: "pet", text: "{name}，你做到了！你就是數域的守護者", mood: "happy" },
        { who: "player", text: "原來我一直在尋找的那個未知數 x……就是我自己。", mood: "happy" },
        { who: "narrator", text: "Find the value of you." }
      ]
    }
  },

  /* ---------- 進化（依新的階段編號 2～4） ---------- */
  evolve: {
    2: [
      { who: "pet", text: "{name}，你身上的光變了！是符文的力量", mood: "happy" },
      { who: "player", text: "我好像……看得懂公式在說什麼了。", mood: "shock" },
      { who: "pet", text: "這就是「符文學徒」。從現在起，數學會變成你的魔法" }
    ],
    3: [
      { who: "pet", text: "盔甲和盾牌出現了！你已經是「法則騎士」", mood: "happy" },
      { who: "player", text: "以前只會算，現在我能說出每一步的理由。", mood: "happy" },
      { who: "pet", text: "邏輯就是你的盾，迷思再也傷不了你" }
    ],
    4: [
      { who: "narrator", text: "八道法則的光匯聚在一起，化成一頂王冠。" },
      { who: "pet", text: "{name}……你成為「數域守護者」了", mood: "happy" },
      { who: "player", text: "謝謝你一路陪我，{pet}。接下來，換我守護這個世界。", mood: "happy" }
    ]
  }
};
