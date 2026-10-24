/* 新生前置課（6 節）：從零開始認識零件、砌第一部機、駕駛、齒輪、感應器。
   官方內容只連結不抄；步驟和練習自己寫。 */
window.PREP = [
  {
    id: 'p1', track: 'prep', phase: 'P', phaseName: '新生前置', title: '認識零件、工具與整理', time: '約 60 分鐘',
    goal: ['能叫出 15 種常用零件的名字（中英）和用途。', '會用拆銷器拆件，會把零件盤還原。'],
    steps: [
      { t: '舊生把一盤零件倒出來，新生按下面的零件表分類：樑（Beam）、板（Plate）、連接銷（Connector Pin）、軸（Shaft）、齒輪（Gear）、輪（Wheel）、墊片（Spacer／Washer）、軸套（Bushing）、角接件（Corner Connector）、橡筋（Rubber Band）。', link: { href: 'glossary.html#parts', label: '零件術語表' } },
      { t: '找出電子件並讀出名字：主腦（Brain）、電池（Battery）、控制器（Controller）、Smart Motor、Smart Port 線、感應器（距離、陀螺／慣性、按鈕、光學）。數一數隊裡有幾多個摩打。' },
      { t: '練習拆件：用拆銷器（Pin Remover）拆 10 個連接銷，不可用手硬扯或用鉗夾（會壞）。' },
      { t: '練習「1 格 = 12.7 mm」：樑上每個孔相隔半吋。量一條 2×20 樑的長度，再用這個規律算一條 1×8 樑有多長。' },
      { t: '砌一個 10 cm 見方的「空心框」：四條樑用角接件接成正方形，要求四角直角、對角線一樣長。這是之後砌底盤的基本功。' },
      { t: '把零件盤還原，每格放回同類零件；拍一張「整理後」的相片。' },
      { t: '自測：舊生隨手拿 10 件零件，新生講名字和用途，答對 8 件以上才過關。' }
    ],
    deliver: ['零件分類相片。', '10 cm 空心框的相片和對角線量度結果。', '自測分數。'],
    template: null,
    teacher: ['零件盤是否還原。', '空心框對角線是否一樣長（差 ≤ 2 mm）。', '自測是否 ≥ 8/10。'],
    tips: ['連接銷插到底會「咔」一聲，沒聲就是未插好。', '零件表在術語表頁，背不到名字就先背英文，比賽時裁判和圖紙都用英文。'],
    links: [{ href: 'https://education.vex.com/stemlabs/zh-hant/iq', label: '官方 STEM Labs（繁中機器翻譯）' }]
  },
  {
    id: 'p2', track: 'prep', phase: 'P', phaseName: '新生前置', title: '砌第一部機（上）：底盤', time: '約 90 分鐘',
    goal: ['跟官方圖紙砌出 Hero Bot「Flop」的底盤部分。', '學會看圖紙：零件清單、步驟編號、對稱。'],
    steps: [
      { t: '到 builds.vex.com 找今季 Hero Bot「Flop」的砌機圖紙，先看第一頁的零件清單（Bill of Materials），把所需零件全部先揀出來放在一邊。', link: { href: 'https://builds.vex.com/', label: 'builds.vex.com' } },
      { t: '兩人一組：一人讀圖紙、一人砌，每 10 步換位。讀圖的人要講「用甚麼零件、插哪個孔、方向」。' },
      { t: '砌到底盤完成（通常是圖紙的前半，到摩打和輪都裝好為止）。每完成一個部件就和圖紙比對一次。' },
      { t: '檢查對稱：左右兩邊的樑、孔位、摩打方向是否一樣；放在桌上四輪是否同時著地。' },
      { t: '接線：摩打線插入主腦的 Smart Port，記下左邊摩打用哪個埠、右邊用哪個埠（用膠紙寫在摩打上）。' },
      { t: '開機：裝電池，長按主腦電源鍵。看到螢幕後到「Devices」看是否偵測到兩個摩打。' }
    ],
    deliver: ['底盤完成相片（俯視 + 側面）。', '摩打埠號記錄。', '一句話：圖紙最難看懂的一步。'],
    template: null,
    teacher: ['四輪是否同時著地。', '主腦是否偵測到摩打。', '是否按圖紙零件清單先揀件（桌面不是一堆零件）。'],
    tips: ['圖紙上的灰色零件是「已砌好的部分」，彩色才是這一步要加的。', '砌錯了不要硬拆整部，用拆銷器逐個拆回上一步。'],
    links: [{ href: 'https://education.vex.com/stemlabs/iq/competition-101-vex-iq-level-up', label: 'Competition 101 第 2 節（英文）' }]
  },
  {
    id: 'p3', track: 'prep', phase: 'P', phaseName: '新生前置', title: '砌第一部機（下）：完成與開機設定', time: '約 90 分鐘',
    goal: ['完成整部 Hero Bot，控制器配對，韌體更新。', '第一次用控制器駕駛。'],
    steps: [
      { t: '完成圖紙餘下部分（取物和升降機構）。每個機構裝好後先用手轉一轉，看會不會卡。' },
      { t: '控制器配對：用 Smart Port 線連接主腦和控制器，在主腦選 Link（或照主腦螢幕指示），完成後拔線，控制器燈會變綠。', link: { href: 'https://kb.vex.com/', label: 'VEX Library（搜 pair controller）' } },
      { t: '更新韌體：用 USB 接電腦，開 VEXcode IQ，按提示更新 VEXos。比賽規定要用最低版本以上，所以每學期做一次。', link: { href: 'https://codeiq.vex.com/', label: 'VEXcode IQ' } },
      { t: '不用寫程式先試駕：主腦內置的 Driver Control 程式可以直接用控制器駕駛，試 1 分鐘感受轉向和速度。' },
      { t: '用計時器跑一次 60 秒，試拾一個豆袋放入最近的 Floor Goal。', link: { href: 'tools.html', label: '計時器' } },
      { t: '記錄：整部機的闊 × 長 × 高（mm）和重量，對照術語表的尺寸上限看是否合格。' }
    ],
    deliver: ['整部機相片。', '尺寸和重量記錄。', '第一次駕駛的感想：哪個動作最難控制。'],
    template: null,
    teacher: ['控制器是否已配對（燈綠）。', 'VEXos 是否已更新。', '尺寸是否在 279 × 508 × 381 mm 內。'],
    tips: ['電池電量低時摩打會變慢甚至重啟，試駕前先充滿。', '圖紙砌出來的機只是起點，之後比賽課程會教你改。'],
    links: []
  },
  {
    id: 'p4', track: 'prep', phase: 'P', phaseName: '新生前置', title: 'VEXcode 與駕駛程式', time: '約 90 分鐘',
    goal: ['會在 VEXcode IQ（繁中介面）設定 Drivetrain 和寫駕駛程式。', '能選出自己順手的搖桿模式。'],
    steps: [
      { t: '開 VEXcode IQ，右上角把語言改成繁體中文。新建專案，選 Blocks。', link: { href: 'https://codeiq.vex.com/', label: 'VEXcode IQ' } },
      { t: '裝置設定：加入 Drivetrain（2 摩打），填左右摩打的埠號、輪周長（看輪上的數字，常見 200 mm）、齒比（直驅填 1:1）。' },
      { t: '加入控制器，設定左搖桿控制 Drivetrain（先用「雙搖桿／tank」）。下載到主腦，用控制器試駕。' },
      { t: '改成「單搖桿／arcade」再試。兩種各跑 8 字 3 次計時，選快而穩的那種。' },
      { t: '加入取物和升降摩打的按鍵（例如 L 上／L 下控制升降，R 上／R 下控制取物），把升降速度設為 50%。' },
      { t: '寫一個 3 步自動程式：前進 500 mm → 右轉 90° → 前進 300 mm。每句都要選單位（mm、degrees）。放在場地跑 3 次，量終點偏差。' }
    ],
    deliver: ['駕駛程式截圖（Blocks）。', '8 字計時表和選定的搖桿模式。', '自動程式 3 次終點偏差（cm）。'],
    template: 'test',
    teacher: ['Drivetrain 設定的輪周長和埠號是否正確。', '兩種搖桿模式是否都試過並有計時。', '自動程式是否能重複跑。'],
    tips: ['Drivetrain 設定錯了輪周長，「前進 500 mm」就會變 400 或 600，自動程式永遠不準。', 'VEXcode 的繁中翻譯偶然會怪，看不懂看英文原字。'],
    links: [{ href: 'https://kb.vex.com/hc/en-us/articles/360035953031-How-to-Configure-a-Drivetrain-VEXcode-IQ-Blocks', label: '官方：Drivetrain 設定（英文）' }]
  },
  {
    id: 'p5', track: 'prep', phase: 'P', phaseName: '新生前置', title: '齒輪、齒比與機構', time: '約 90 分鐘',
    goal: ['明白齒比如何換速度和力，會算齒比。', '砌過一個升降或手臂機構的原型。'],
    steps: [
      { t: '數一數隊裡有的齒輪齒數（VEX IQ 常見 12、36、60 齒）。用計算器試：12 → 60 和 60 → 12 的速度差幾多倍。', link: { href: 'calc.html', label: '設計計算器' } },
      { t: '拔河實驗：兩部底盤（或同一部換齒比）用繩連住互拉，一邊直驅、一邊 12→36 減速，看哪邊贏；再比直線 2 米誰快。' },
      { t: '砌一個單摩打的四連桿手臂（兩條平行樑 + 兩個轉軸），末端放一個豆袋，看它能升到幾高、會不會自己跌下。' },
      { t: '把手臂摩打改成 12→60 減速再試：升得慢但停得住。記錄兩次的最高高度和「鬆手後會不會跌」。' },
      { t: '試一次用橡筋輔助：在手臂加橡筋抵消重量，看摩打是否更輕鬆。' },
      { t: '寫下一句結論：速度和力是交換的，比賽機哪裡要快、哪裡要力。' }
    ],
    deliver: ['拔河和直線比賽結果。', '手臂原型相片 + 兩種齒比的測試記錄。', '一句結論。'],
    template: 'test',
    teacher: ['學生能否用自己的話講齒比的效果。', '手臂有沒有用減速齒比令它停得住。', '測試有沒有數字。'],
    tips: ['齒輪咬合要留一點空隙，太緊會發熱、太鬆會跳齒。', '升降類機構幾乎一定要減速，比賽課程第 6 節會再用到。'],
    links: [{ href: 'https://education.vex.com/stemlabs/zh-hant/iq', label: '官方 STEM Lab「拔河」（繁中機器翻譯）' }]
  },
  {
    id: 'p6', track: 'prep', phase: 'P', phaseName: '新生前置', title: '感應器與自動路線', time: '約 90 分鐘',
    goal: ['會用陀螺／慣性感應器轉準角度，會用距離感應器停車。', '完成一條能重複的 4 步自動路線，之後進入比賽課程。'],
    steps: [
      { t: '在 Drivetrain 設定加入陀螺／慣性感應器（第二代主腦內置）。把「轉 90°」改成「轉到 90° 方向（turn to heading）」，跑 5 次比較偏差。' },
      { t: '裝一個距離感應器在機前，寫「前進直到距離 < 150 mm 就停」，對住牆試 5 次，量停車距離是否一致。' },
      { t: '裝一個按鈕感應器（Bumper），寫「按一下才開始自動程式」——Skills 自動賽規定要用主腦按鍵或感應器啟動，不可用控制器。' },
      { t: '組合成 4 步路線：起步 → 前進到某點 → 轉向 → 前進到 Floor Goal 前停 → 放下預載黃袋。在實場跑 5 次，用膠紙記終點。' },
      { t: '在模擬器把同一條路線跑一次，比較模擬和實機的差別，寫下原因（打滑？電量？輪周長？）。', link: { href: 'sim.html', label: '比賽模擬器' } },
      { t: '前置課完成！到課程頁開始比賽課程第 1 節。', link: { href: 'lesson.html?id=1', label: '比賽課程第 1 節' } }
    ],
    deliver: ['5 次自動路線的終點記錄。', '感應器程式截圖。', '模擬 vs 實機差別的分析。'],
    template: 'test',
    teacher: ['自動路線 5 次中至少 4 次入到 Floor Goal。', '是否用感應器啟動而不是控制器。', '學生能否講出一個實機偏差的原因。'],
    tips: ['陀螺開機時要靜止幾秒校正，程式開頭加「等待 2 秒」。', '距離感應器對軟物件（豆袋）讀數不穩，對牆最準。'],
    links: []
  }
];

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

window.PHASES.P = { name: '新生前置', desc: '從零開始：零件、第一部機、駕駛、齒輪、感應器。完成後才進入比賽課程。' };
window.PHASES.T = { name: '老師路徑', desc: '帶隊不需要識砌機，但要識規則、賽制、評核、零件和安全。' };
window.ALL_LESSONS = window.PREP.concat(window.LESSONS, window.TEACHER);
