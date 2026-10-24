/* 新生前置課（6 節）：從零開始認識零件、砌第一部機、駕駛、齒輪、感應器。
   官方內容只連結不抄；步驟和練習自己寫。 */
/* 老師路徑（8 節）：帶隊不需要識砌機，但要識規則、賽制、評核、零件和安全。 */
window.TEACHER = [
  {
    id: 't1', track: 'teacher', phase: 'T', phaseName: '老師路徑', title: '規則、檢錄與裁判視角', time: '約 60 分鐘自學',
    goal: ['比學生早一步熟規則：能即場判斷學生的機器會不會過檢錄。', '知道比賽時哪些事只有學生可以做（Student Centered Policy）。'],
    steps: [
      { t: '讀本站規則摘要頁，全部過一次，重點記 R（機器）和 GG（比賽）兩組。', link: { href: 'rules.html', label: '規則摘要' } },
      { t: '打開 Game Manual 原文，找到 R3（尺寸）、R9（摩打）、R12–R13（合法零件）、GG11（換手）、SG6（持有限制）五條，對照摘要看一次原文。', link: { href: 'https://link.vex.com/docs/26-27/viqrc/game-manual', label: 'Game Manual' } },
      { t: '記住三條成年人不可以做的事：不可以進入駕駛區、不可以代學生向裁判提出計分異議（SC2）、不可以在比賽中觸碰機器。' },
      { t: '用紙皮做一個 11 × 20 × 15 吋（279 × 508 × 381 mm）的尺寸框放在工作室，之後每次學生改機都要放得入。' },
      { t: '訂一個「規則版本檢查日」：每次比賽前兩週到官方頁看 Game Manual 版本號，有更新就看 Game Manual Updates 一節。' }
    ],
    deliver: ['尺寸框相片。', '你自己寫的「五條最易犯規」清單貼在工作室。'],
    template: null, teacher: [], tips: ['裁判只認原文，有爭議時帶學生看英文條號。', '規則摘要是本站自己寫的簡化版，不是官方文件。'], links: []
  },
  {
    id: 't2', track: 'teacher', phase: 'T', phaseName: '老師路徑', title: '賽季行事曆、註冊與報名', time: '約 60 分鐘',
    goal: ['完成 RobotEvents 隊伍註冊，拿到隊號和牌照。', '排出本季比賽行事曆並倒推訓練進度。'],
    steps: [
      { t: '到 RobotEvents 用學校名開帳戶，註冊 VEX IQ 隊伍（每隊一個隊號，年費約 US$150；第二隊起同一隊號加字母）。', link: { href: 'https://www.robotevents.com/', label: 'RobotEvents' } },
      { t: '註冊後下載並列印兩塊牌照（License Plate），裝在機器相對兩側（R4）。' },
      { t: '在 RobotEvents 選 Hong Kong 地區，列出本季所有 VEX IQ 比賽（預賽多在 11–12 月，香港少年工程挑戰賽約 2 月）。記下報名開放日和截止日——預賽名額有限，開放當日就報。' },
      { t: '把比賽日期填入老師頁的時間表，倒推：第 8 節（整合）要在第一場比賽前完成。', link: { href: 'teacher.html', label: '老師頁時間表' } },
      { t: '每場比賽前要交的文件：學生家長同意書（S3 要求每位學生有 participant release form）、學校的外出活動表格。提前兩週收齊。' },
      { t: '查清楚每場的檢錄時間、是否有 Skills 時段、評審形式（現場面試還是交筆記）。' }
    ],
    deliver: ['隊號和牌照。', '本季行事曆（比賽日、報名日、文件截止日）。'],
    template: null, teacher: [], tips: ['香港預賽通常免費或費用低，但名額先到先得。', '註冊年費可走學校採購，保留收據。'], links: []
  },
  {
    id: 't3', track: 'teacher', phase: 'T', phaseName: '老師路徑', title: '帶隊而不砌機：角色、節奏、紀律', time: '約 45 分鐘',
    goal: ['建立每節固定流程，令你每節只需露面 10 分鐘。', '清楚學生角色分工，舊生「指」不「砌」。'],
    steps: [
      { t: '定角色：總教練（舊生）、隊長、每個模組一個負責人（新生）、記錄員（輪流）、駕駛員兩位 + 入袋員一位。寫在工作室牆上。' },
      { t: '每節流程：開始 5 分鐘（點名、總教練講今日做甚麼交甚麼、電池檢查）→ 中段學生自行按課堂頁做 → 結束 5 分鐘（按老師頁檢查重點看、拍照、學生複製進度傳給你）。' },
      { t: '三條硬規矩：沒有測試表不可以改機；每次只改一樣；離開前零件歸位、電池充電。' },
      { t: '設一個溝通渠道（例如學校平台群組），學生每節結束把「進度文字」和相片貼上去，你不在場也看到。' },
      { t: '定每兩週一次 15 分鐘「老師檢查」：看工程筆記日期和簽名、看迭代表有沒有前後數據、問每人一條面試題。' }
    ],
    deliver: ['角色表。', '每節流程表貼在工作室。'],
    template: null, teacher: [], tips: ['舊生主導太多時，指定新生做模組負責人並由他們在結束時匯報。', '學生只想砌不想記錄，就用「沒有表格不可以改機」這條。'], links: []
  },
  {
    id: 't4', track: 'teacher', phase: 'T', phaseName: '老師路徑', title: '評核：工程筆記與面試', time: '約 60 分鐘',
    goal: ['懂得評審看筆記的標準，能給學生具體的改善方向。', '能主持一次模擬面試。'],
    steps: [
      { t: '看一次官方評審指南中的工程筆記量表（Engineering Notebook Rubric）：重點是設計過程完整、每頁有日期簽名、記錄失敗和改動、有測試數據。', link: { href: 'https://www.robotevents.com/', label: 'RobotEvents 的 Judge Guide 下載頁' } },
      { t: '用本站的評核量表（老師頁）每兩週評一次：筆記完整度、測試數據、迭代證據、分工記錄。', link: { href: 'teacher.html#rubric', label: '評核量表' } },
      { t: '模擬面試四條必問：你們的機器點樣得分？為何選這個設計？試過甚麼失敗、怎樣改？下一步想改甚麼？每位學生都要答到，不可以只由隊長答。' },
      { t: '面試禮儀：全隊一齊、帶筆記、答問題時指住筆記的頁。老師不可以在場提示。' },
      { t: '比賽後當日收每人 300 字檢討，作為該場的評核。' }
    ],
    deliver: ['評核量表填過一次的記錄。', '模擬面試的問答筆記。'],
    template: null, teacher: [], tips: ['評審最想看到的是失敗和改動，不是漂亮相片。', '筆記可以用紙本或電子，但要有日期和簽名，不可事後補。'], links: []
  },
  {
    id: 't5', track: 'teacher', phase: 'T', phaseName: '老師路徑', title: '零件庫存、採購與預算', time: '約 45 分鐘',
    goal: ['有一張全隊零件庫存表，知道缺甚麼。', '本季採購清單和預算已交學校。'],
    steps: [
      { t: '叫學生在前置課第 1 節做零件盤點，你把數量填入庫存表（老師頁可下載範本）。', link: { href: 'teacher.html#inventory', label: '庫存表' } },
      { t: '先砌 Hero Bot 再買：對照圖紙的零件清單找缺件，不要盲目買整套。' },
      { t: '通常最先要補：Smart Motor（比賽機 6 個）、第二代電池和充電器（每隊 3–4 粒）、長樑和齒輪、連接銷。' },
      { t: '場地：今季遊戲元件套裝（不含圍欄地墊），每年換。' },
      { t: '走學校採購流程，保留收據；淘寶買結構件可行，但電子件（摩打、主腦、電池）建議買官方或代理行貨，比賽檢錄要合法零件。' },
      { t: '每學期末再盤點一次，壞的摩打和電池記錄報廢。' }
    ],
    deliver: ['庫存表。', '本季採購清單和預算。'],
    template: null, teacher: [], tips: ['電池是最常壞的消耗品，預算要每年留一筆。', '本地代理（BDS）可散買零件，不用買整套。'], links: []
  },
  {
    id: 't6', track: 'teacher', phase: 'T', phaseName: '老師路徑', title: '安全、電池與工作室管理', time: '約 30 分鐘',
    goal: ['電池、工具和工作室有固定規則，不會出事也不會丟零件。'],
    steps: [
      { t: '電池規則：只用原廠充電器；充電時有人在場；充滿即拔；發脹、發熱、不能充的電池即時隔離並報廢。' },
      { t: '工具規則：拆銷器和六角匙有固定位置和數量，每節結束點數。' },
      { t: '場地規則：不可以踩地墊邊緣（會翹），場地元件只可按圖裝拆。' },
      { t: '工作室開放時段和值日表貼在門口；沒有老師或指定職員在場不可開工。' },
      { t: '比賽外出：按學校外出活動程序，家長同意書、保險、集合解散安排。' }
    ],
    deliver: ['電池與工具規則貼在工作室。'],
    template: null, teacher: [], tips: ['電池用膠紙標號 1、2、3，輪流用，壽命較平均。'], links: []
  },
  {
    id: 't7', track: 'teacher', phase: 'T', phaseName: '老師路徑', title: '比賽日老師工作', time: '約 30 分鐘',
    goal: ['知道比賽日由出發到回校每一步你要做甚麼。'],
    steps: [
      { t: '前一日：按資源頁的比賽日清單和學生一齊執拾；確認電池全部充滿；列印賽程（如大會已公布）。', link: { href: 'resources.html#matchday', label: '比賽日清單' } },
      { t: '到場：報到、交文件、領賽程；帶學生去檢錄（你在旁，但由學生回答裁判問題）。' },
      { t: '駕駛員會議由學生去，你可以旁聽。' },
      { t: '比賽中：你不可以進駕駛區；每局前提醒學生換電池、和隊友商量分工；記錄每局分數和問題。' },
      { t: '評審面試：全隊帶筆記去，你不陪入。' },
      { t: '回校：當日收 300 字檢討；一週內整理相片和數據放入隊伍存檔，給下一屆。' }
    ],
    deliver: ['比賽日分數和問題記錄。', '隊伍存檔（相片、分數、檢討）。'],
    template: null, teacher: [], tips: ['多和其他學校老師交流，問他們用甚麼機構、怎樣訓練，是最快的進步方法。'], links: []
  },
  {
    id: 't8', track: 'teacher', phase: 'T', phaseName: '老師路徑', title: '官方證書課與進階資源', time: '自定',
    goal: ['完成 VEX IQ Educator Certification Course（免費）。', '知道哪裡找進一步資源。'],
    steps: [
      { t: '到 pd.vex.com 開帳戶，報讀 VEX IQ Educator Certification Course（免費、自學進度，有讀有片有實作，最後一部分介紹比賽）。', link: { href: 'https://pd.vex.com/training/intro-courses', label: 'VEX PD 入門課程' } },
      { t: '用一部 Hero Bot 跟課做實作部分，不用自己砌新機。' },
      { t: 'teachiq.vex.com 是第一次教 IQ 的老師起點頁，看 scope and sequence 了解官方課程次序。', link: { href: 'https://teachiq.vex.com/', label: 'teachiq.vex.com' } },
      { t: 'VEX Library（kb.vex.com）是技術問題字典：摩打、感應器、VEXcode 設定，先搜這裡。', link: { href: 'https://kb.vex.com/', label: 'VEX Library' } },
      { t: 'VEX Forum 的 IQ 版有其他教練的問答；本地可加入香港教練群組，問 ARL／JSTEA。', link: { href: 'https://www.vexforum.com/', label: 'VEX Forum' } }
    ],
    deliver: ['證書課完成證明。'],
    template: null, teacher: [], tips: ['證書課一個週末可過一遍；它教你「怎樣教」，不教你砌機，砌機交給學生。'], links: []
  }
];

window.PHASES.T = { name: '老師路徑', desc: '帶隊不需要識砌機，但要識規則、賽制、評核、零件和安全。' };
window.ALL_LESSONS = window.LESSONS.concat(window.TEACHER);
