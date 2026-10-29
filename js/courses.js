/* =====================================================================
   MATHORIA 數域魔法學院 — 課程設定檔
   ---------------------------------------------------------------------
   老師只要改這一個檔案，就能：
   - 調整據點名稱、章節、任務說明
   - 掛上新的課程網頁（url）
   - 把「迷霧封印」的據點開放（sealed: false）
   - 調整每個任務的 XP
   XP 規則（可改）：探索任務 40、專題 80、Boss 150、終焉 Boss 400
   ===================================================================== */

window.MATHORIA_CONFIG = {
  gameTitle: "MATHORIA 數域魔法學院",
  subtitle: "G9 數學 × 探索 × 挑戰 × 成長",
  teacherName: "余佳霖老師",
  brand: "Find the value of you!",

  /* Google Apps Script 網頁應用程式網址（部署後貼上，例如 https://script.google.com/macros/s/xxxx/exec）
     有填：任務回報與魔王戰會寫進 Google 試算表、核可碼由後端驗證、學生換裝置可還原進度、教師後台看全班。
     沒填（空字串）：離線模式，進度只存在學生自己的瀏覽器，核可碼用下面的 approvalSecret 在前端驗證。 */
  apiUrl: "https://script.google.com/macros/s/AKfycbztBC27FRXibSfr_Cd03JqY5KnvqN10oGmPmT65G7y1o0-NRCPD3gHpaLnK3Wb17w/exec",

  /* 離線模式才會用到的核可碼密語。改用 Apps Script 後，密語改設在指令碼屬性 APPROVAL_SECRET，這裡可清空。 */
  approvalSecret: "",

  /* 角色四階段：等級門檻依企劃書 */
  stages: [
    { id: 1, min: 1,  name: "見習探索者", en: "Novice Explorer", desc: "剛進入學院的新生，學習好奇與熱情，踏上數學冒險的第一步。" },
    { id: 2, min: 6,  name: "符文學徒",   en: "Rune Apprentice", desc: "開始掌握數學魔法，學會運用公式與圖形，解鎖更多技能。" },
    { id: 3, min: 16, name: "法則騎士",   en: "Law Knight",      desc: "能運用邏輯與推理，面對更強大的挑戰，守護數學之城。" },
    { id: 4, min: 26, name: "數域守護者", en: "Math Guardian",   desc: "集結所有數學法則的力量，探索未知領域，成為數域世界的守護者。" }
  ],

  /* 每升一級所需 XP：40 + 3×(等級-1)。
     全部任務約 2170 XP ≈ Lv.28；第一站全破約 Lv.8（符文學徒），學期中段到 Lv.16（法則騎士），全破才進化為數域守護者。 */
  xpForLevel: function (lv) { return 40 + 3 * (lv - 1); },

  /* 寵物 */
  pets: [
    { id: "crystal_fox",     name: "星靈狐", trait: "擅長圖形與觀察", file: "crystal_fox", hd: true },  /* hd: 已有高解析去背圖 */
    { id: "ink_cat",         name: "墨數貓", trait: "擅長運算與計算", file: "ink_cat", hd: true },
    { id: "wisdom_owl",      name: "智慧鴞", trait: "擅長推理與證明", file: "wisdom_owl", hd: true },
    { id: "starlight_dragon",name: "光翼龍", trait: "擅長應用與挑戰", file: "starlight_dragon", hd: true }
  ],

  /* 五項能力 */
  stats: { calc: "運算力", shape: "圖形力", reason: "推理力", proof: "證明力", apply: "應用力" },

  /* XP 預設值 */
  xp: { lesson: 40, project: 80, boss: 150, finalBoss: 400 },

  /* =============== 八大據點（依康軒九上、九下順序） =============== */
  stations: [
    {
      id: "similar",
      num: 1, term: "九上", chapter: "第 1 章 相似形",
      name: "相似形之森", en: "Similarity Forest",
      badge: "badge_similar.png",
      pos: { x: 27, y: 22, fogW: 34, fogH: 30 },  /* 地圖位置（%）與迷霧大小 */
      intro: "森林裡的每一棵樹都按比例生長。學會縮放的法則，才能看穿迷霧。",
      boss: { name: "比例迷霧獸", myth: "以為放大圖形就是每一邊都「加」一樣的長度；或把不對應的邊拿來相比。", hint: "相似是「乘」同一個比，不是「加」；對應邊要先找對。" },
      lessons: [
        { id: "s1-1", title: "1-1 連比例", stat: "calc",  url: "https://valerieyu55.github.io/store_manager/", urlLabel: "手搖飲創業專案", task: "完成研發部與調飲實驗室任務，求出三連比。" },
        { id: "s1-2", title: "1-2 比例線段", stat: "shape", url: "https://valerieyu55.github.io/similar-tea-shop/", urlLabel: "比不比熟成紅茶", task: "在杯身設計室解鎖比例線段關卡。" },
        { id: "s1-3", title: "1-3 相似多邊形", stat: "shape", url: "https://valerieyu55.github.io/similar-tea-shop/", urlLabel: "比不比熟成紅茶", task: "在品牌部完成相似多邊形任務，並在財務室破解面積比＝相似比²。" },
        { id: "s1-4", title: "1-4 相似三角形的應用", stat: "apply", url: "https://valerieyu55.github.io/measure-quest/", urlLabel: "測量遠征", task: "跟著泰勒斯完成三大測量挑戰並匯出學習歷程報告。" }
      ],
      project: { id: "s1-p", title: "專題：一束光，丈量一個世界", stat: "apply", task: "小組完成測量遠征報告並繳交。" }
    },
    {
      id: "circle",
      num: 2, term: "九上", chapter: "第 2 章 圓",
      name: "圓環聖殿", en: "Circle Sanctuary",
      badge: "badge_circle.png",
      pos: { x: 15, y: 60, fogW: 30, fogH: 34 },  /* 地圖位置（%）與迷霧大小 */sealed: true,
      intro: "白色的環形神殿，每一道弧都藏著角度的秘密。",
      boss: { name: "弧影巨龍", myth: "把圓周角和圓心角當成一樣大，或忘了它們必須對著同一條弧。", hint: "同弧的圓周角是圓心角的一半。" },
      lessons: [
        { id: "s2-1", title: "2-1 點、直線與圓的關係", stat: "shape", task: "判斷點與圓、直線與圓、兩圓的位置關係。" },
        { id: "s2-2", title: "2-2 圓心角、圓周角與弦切角", stat: "reason", task: "運用圓周角定理解題。" }
      ]
    },
    {
      id: "truth",
      num: 3, term: "九上", chapter: "第 3 章 推理證明（3-1）",
      name: "真理審判庭", en: "Truth Tribunal",
      badge: "badge_truth.png",
      pos: { x: 52, y: 66, fogW: 22, fogH: 22 },  /* 地圖位置（%）與迷霧大小 */sealed: true,
      intro: "在這裡，每一句話都要有理由。沒有證明的主張，將被天平判定無效。",
      boss: { name: "謬誤審判者", myth: "證明跳步：把想證的結論當成已知來用，或漏掉關鍵條件。", hint: "每一步都要寫出「因為…所以…」，並標明用的是哪一個性質。" },
      lessons: [
        { id: "s3-1", title: "3-1 幾何推理與證明", stat: "proof", task: "完成一題完整的幾何證明，包含已知、求證、證明。" }
      ]
    },
    {
      id: "threecenter",
      num: 4, term: "九上", chapter: "第 3 章 三角形的心（3-2）",
      name: "三心神殿", en: "Three-Heart Shrine",
      badge: "badge_threecenter.png",
      pos: { x: 50, y: 86, fogW: 20, fogH: 16 },  /* 地圖位置（%）與迷霧大小 */sealed: true,
      intro: "三顆光核在三角形中閃爍：外心、內心、重心。認錯一顆，神殿就會變形。",
      boss: { name: "三心擬態獸", myth: "外心、內心、重心互相冒充：把重心當成到三頂點等距、把內心當成到三頂點等距。", hint: "外心到三頂點等距；內心到三邊等距；重心把中線分成 2：1。" },
      lessons: [
        { id: "s4-1", title: "3-2 三角形的外心、內心、重心", stat: "reason", task: "分辨三心的作圖與性質，完成重心 2：1 的計算。" }
      ]
    },
    {
      id: "parabola",
      num: 5, term: "九下", chapter: "第 1 章 二次函數",
      name: "拋物線天空塔", en: "Parabola Sky Tower",
      badge: "badge_parabola.png",
      pos: { x: 84, y: 15, fogW: 26, fogH: 30 },  /* 地圖位置（%）與迷霧大小 */intro: "塔身纏繞著發光的曲線軌道。頂點在哪裡，決定你能飛多高。",
      boss: { name: "頂點騙徒", myth: "y = a(x − h)² + k 的 h 正負號搞反，把頂點放錯位置。", hint: "x − h 中的 h 才是頂點橫坐標；y = (x + 2)² 的頂點在 x = −2。" },
      lessons: [
        { id: "s5-1", title: "1-1 二次函數的圖形", stat: "shape", url: "https://valerieyu55.github.io/MATH.COURT/", urlLabel: "拋物線・看見數學的軌跡", task: "操作參數 a、h、k，觀察開口與頂點的變化並記錄。" },
        { id: "s5-2", title: "1-2 二次函數的最大值與最小值", stat: "apply", task: "配方法求頂點，解一題最大利潤或最大面積的應用題。" }
      ]
    },
    {
      id: "probability",
      num: 6, term: "九下", chapter: "第 2 章 統計與機率",
      name: "機率命運島", en: "Probability Destiny Island",
      badge: "badge_probability.png",
      pos: { x: 84, y: 40, fogW: 24, fogH: 22 },  /* 地圖位置（%）與迷霧大小 */intro: "巨大的骰子與命運之輪。這座島上，直覺常常說謊，只有數據不會。",
      boss: { name: "賭徒謬誤王", myth: "連續輸了五次，覺得「下一次一定會贏」；或以為四分位數就是平均數。", hint: "每一次擲骰都是獨立事件；四分位數看的是位置，不是平均。" },
      lessons: [
        { id: "s6-1", title: "2-1 資料的分析（四分位數與盒狀圖）", stat: "calc", url: "https://valerieyu55.github.io/G9/", urlLabel: "統計與機率儀表板", task: "用儀表板分析一組資料，畫出盒狀圖並解讀。" },
        { id: "s6-2", title: "2-2 機率", stat: "reason", url: "https://valerieyu55.github.io/G9/", urlLabel: "統計與機率儀表板", task: "完成機率模擬實驗，比較理論機率與實驗結果。" }
      ]
    },
    {
      id: "space",
      num: 7, term: "九下", chapter: "第 3 章 立體圖形",
      name: "空間魔方城", en: "Space Cube City",
      badge: "badge_space.png",
      pos: { x: 80, y: 72, fogW: 30, fogH: 34 },  /* 地圖位置（%）與迷霧大小 */intro: "漂浮的水晶方塊與線框多面體。平面在這裡被摺成立體，想像力是通行證。",
      boss: { name: "摺紙幻術師", myth: "把摺不回去的展開圖當成正方體展開圖；或把歪斜線誤判為平行。", hint: "試著在腦中真的把它摺起來；兩直線不相交又不平行，就是歪斜。" },
      lessons: [
        { id: "s7-1", title: "3-1 空間中的線、平面與形體", stat: "shape", url: "https://valerieyu55.github.io/3-1-geometry/index.html", urlLabel: "從平面到立體", task: "旋轉 3D 模型，判斷線與面的平行、垂直與歪斜關係。" },
        { id: "s7-2", title: "3-2 柱體、錐體與展開圖", stat: "apply", task: "畫出一個柱體的展開圖，並計算表面積與體積。" }
      ]
    },
    {
      id: "final",
      num: 8, term: "會考前", chapter: "總複習・跨單元挑戰",
      name: "終焉試煉之地", en: "Final Trial Ground",
      badge: "badge_final.png",
      pos: { x: 64, y: 13, fogW: 22, fogH: 22 },  /* 地圖位置（%）與迷霧大小 */isFinal: true,
      intro: "所有魔王的碎片在這裡聚集。只有集齊七枚徽章的守護者，才能推開金色之門。",
      boss: { name: "悖論之王", myth: "跨單元綜合題：把相似、圓、函數、機率與空間混在一起設下陷阱。", hint: "先辨認題目屬於哪一章，再把學過的法則一個一個叫出來。" },
      lessons: [
        { id: "s8-1", title: "會考模擬戰 I", stat: "calc",  task: "完成一份會考模擬題並訂正。" },
        { id: "s8-2", title: "會考模擬戰 II", stat: "reason", task: "完成第二份會考模擬題並訂正。" }
      ]
    }
  ]
};
