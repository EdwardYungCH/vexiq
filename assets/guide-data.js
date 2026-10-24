/* 圖文自學課：階段 0–5（小白 → 砌好 Flop → 改裝）。
   每節：sections（圖＋≤3 句＋動手＋檢查點＋做錯了）→ 卡住了 → 舊生驗收碼解鎖下一節。
   砌法只用官方 Flop 圖紙（連結），自畫圖只用來解釋概念。
   硬件操作依 VEX Library（kb.vex.com）核實；標「待核實」的要實機試。
   實物相：放 images/<節id>/<img>.jpg 自動顯示。 */
window.FLOP = {
  pdf: 'https://link.vex.com/docs/26-27/viqrc/hero-robot-instructions-pdf',
  online: 'https://instructions.online/?id=4063-2026-2027_viqrc_herobot_flop',
  kit: 'IQ 第二代 Competition Kit'
};

window.STAGES = [
  { id: 0, name: '入門', desc: '知道這是甚麼遊戲，訂隊規。' },
  { id: 1, name: '基本功', desc: '零件、連接、傳動、電子件。' },
  { id: 2, name: '認識比賽', desc: '場地和五條最重要的規則。' },
  { id: 3, name: '照圖砌 Flop', desc: '跟官方圖紙砌今季示範機，砌完能拾袋入 goal。' },
  { id: 4, name: '程式', desc: 'VEXcode 駕駛、按鍵、自動路線。' },
  { id: 5, name: '機構與改裝', desc: '明白 Flop 為何這樣砌，再改它。' },
  { id: 6, name: '比賽設計', desc: '由規格表開始設計自己的比賽機（比賽課程 1–10）。', link: 'lesson.html?id=1' },
  { id: 7, name: '比賽與迭代', desc: '比賽日、檢討、每週改一樣。', link: 'lesson.html?id=10' }
];

window.GUIDE = [
  /* ---------- 階段 0 ---------- */
  {
    id: 's0-1', stage: 0, title: '歡迎加入', time: '約 30 分鐘', needs: '手機',
    intro: '先知道玩甚麼、點樣得分，再訂隊規。',
    sections: [
      { h: '1. 今季遊戲 Level Up', svg: ['field', { bags: true }], body: ['把豆袋放入 goal 得分，愈高分愈多。', '一次只可以拿一個袋。', '60 秒一局，兩隊合作。'], task: '看官方介紹片（資源頁第一條）。', check: '講得出「點樣得分」。', link: { href: 'https://www.vexrobotics.com/iq/competition/viqc-current-game', label: '官方遊戲頁（有介紹片）' } },
      { h: '2. 分數', svg: ['pyramidSide'], body: ['Floor 1 分，L1 3，L2 6，L3 12，L4 16。', 'L4 只收黃袋。'], task: '用計分器隨便計一局。', check: '計得出。', link: { href: 'tools.html', label: '計分器' } },
      { h: '3. 隊規', body: ['舊生指、新生砌。', '每次只改一樣，改完要測。', '離開前零件歸位、電池充電。'], task: '全隊讀一次隊規。', check: '同意。' },
      { h: '4. 安全', body: ['電池發脹、發熱、冒煙：即停，找老師。', '不用手扯銷、不用鉗夾銷。', '沒有老師或指定職員在場不開工。'], task: '記住三條。', check: '講得出。' }
    ],
    stuck: [['介紹片看不懂英文', '看模擬器跑一局就明。']],
    verify: '舊生問：點樣得分？L4 收甚麼色？'
  },

  /* ---------- 階段 1 ---------- */
  {
    id: 's1-1', stage: 1, title: '零件圖鑑', time: '約 45 分鐘', needs: '零件盤、軟尺',
    intro: '逐件拿上手，對照圖和實物相，讀名字。',
    sections: [
      { h: '1. 樑 Beam', svg: ['beam', 1, 8], img: 'beam',
        body: ['有孔的長條。孔距 12.7 mm = 1 格。', '1×N 一排孔。2×N 兩排外孔，中間多一排錯開的孔——數外排。'],
        task: '找 2×20 樑，數外排 20 孔，量約 254 mm。', check: '量到約 254 mm。', wrong: ['約 127 mm → 拿錯 2×10。', '數到三排孔 → 中間那排不算。'] },
      { h: '2. 板 Plate', svg: ['plate', 4, 4], img: 'plate', body: ['有孔的平板，孔位也是錯開。做底板、固定主腦。'], task: '找最大的板，數外排幾 × 幾。', check: '數到。' },
      { h: '3. 連接銷 Pin', svg: ['pin', '1x1'], svg2: ['pinJoin'], img: 'pin',
        body: ['黑色短銷，扣住樑和板。', '1×1 接兩層；1×2 接三層；2×2 接四層。', '插到底有「咔」聲。'],
        task: '用 2 個銷把一條樑扣在板上，拉一拉。', check: '兩聲「咔」，拉不開。', wrong: ['拉得開 → 未插到底。'] },
      { h: '4. 直角樑、斜樑、Corner Connector', svg: ['corner', 90], svg2: ['corner', 45], img: 'corner',
        body: ['直角樑 Right Angle Beam：L 形平板，同一平面轉 90°。', '斜樑 Angle Beam：30°、45°、60°。', 'Corner Connector：立體的接件，把零件接到另一個方向（例如平放的樑接直立的樑）。看實物相分辨。'],
        task: '找出三種各一件。', check: '分得出平面的和立體的。' },
      { h: '5. 軸 Shaft', svg: ['shaft', 4], img: 'shaft', body: ['方形棒。穿樑圓孔會自轉；穿齒輪方孔會帶齒輪轉。'], task: '軸穿樑孔轉一轉，再穿齒輪轉一轉。', check: '樑孔中自轉；齒輪跟軸轉。' },
      { h: '6. 軸套、墊片、軸環', svg: ['bushing'], svg2: ['spacer'], img: 'spacer',
        body: ['軸套 Bushing：入樑孔，軸轉得順。', '墊片 Spacer：填軸上空位。', '軸環 Collar：夾在軸上，軸不跌出。'],
        task: '各找一件。', check: '認得三種。' },
      { h: '7. 齒輪 Gear', svg: ['gearSet'], img: 'gear', body: ['12、36、60 齒。大帶小快但無力，小帶大慢但有力。'], task: '數每種各幾個，寫低。', check: '寫低三個數。' },
      { h: '8. 車輪 Wheel', svg: ['wheel'], svg2: ['wheel', 'omni'], img: 'wheel', body: ['輪上數字 = 周長 mm。', '全向輪 Omni：邊有小滾輪，轉向順。'], task: '讀出車輪數字。', check: '讀到。' },
      { h: '9. 橡筋、拆銷器', svg: ['rubber'], svg2: ['pinRemover'], img: 'tools', body: ['橡筋：幫手臂托重。', '拆銷器：拆銷專用。先分開兩層，再用它撬或拔銷。不用手扯、不用鉗。'], task: '用拆銷器拆第 3 步的 2 個銷。', check: '銷完整。' },
      { h: '10. 主腦 Brain', svg: ['brain'], img: 'brain', body: ['機器的電腦。上下共 12 個 Port（1–12）。', '只可以有一個。'], task: '找 Port 旁的數字。', check: '見到 1–12。' },
      { h: '11. 摩打 Smart Motor', svg: ['motor'], img: 'motor', body: ['正面方孔接軸，側面接線。', '比賽最多 6 個。'], task: '數隊裡有幾多個，寫低。', check: '寫低。' },
      { h: '12. 電池、控制器、線', svg: ['battery'], svg2: ['controller'], svg3: ['cable'], img: 'electronics', body: ['電池：只用原廠充電器。', '控制器：兩支搖桿、四個肩鍵。', 'Smart 線：兩頭一樣。'], task: '各找一件。', check: '認得。' },
      { h: '13. 感應器 Sensor', svg: ['sensor', 'distance'], svg2: ['sensor', 'bumper'], svg3: ['sensor', 'optical'], img: 'sensors', body: ['距離：量幾遠。', '按鈕 Bumper：碰到就觸發。', '光學／顏色：讀顏色。', '陀螺：主腦內置。'], task: '找隊裡有的。', check: '認得兩種以上。' },
      { h: '14. 還原', body: ['同類放同一格，拍相。'], task: '零件盤還原。', check: '每格一類。' }
    ],
    stuck: [['找不到零件', '問舊生；沒有就記入缺件。'], ['零件名和圖紙不同', '以圖紙英文為準，術語表查。']],
    verify: '舊生隨手拿 10 件問名字，答對 8 件；零件盤還原。'
  },
  {
    id: 's1-2', stage: 1, title: '連接基本功', time: '約 45 分鐘', needs: '樑、板、銷、Corner Connector',
    intro: '砌得穩就三樣：一個銷會轉、兩個銷固定；樑要疊住才接得到；要轉方向用 Corner Connector。',
    sections: [
      { h: '1. 一個銷會轉', svg: ['pinJoin'], img: 'one-pin', body: ['兩條樑只用一個銷扣住：可以轉，這就是轉軸。', '手臂、四連桿都靠這個。'], task: '兩條樑用一個銷扣住，轉一轉。', check: '轉得到。' },
      { h: '2. 兩個銷固定', img: 'two-pins', body: ['加第二個銷：轉不到，固定了。', '框架、摩打座都要兩個以上。'], task: '同一對樑加第二個銷。', check: '轉不到。', wrong: ['仍會晃 → 有一個銷未插到底。'] },
      { h: '3. 疊接', svg: ['step', { w: 14, h: 2, parts: [{ x: 0, y: 0.5, w: 10, h: 1 }, { x: 6, y: 0.5, w: 8, h: 1, new: true }], pins: [[6, 0.5], [9, 0.5]], notes: ['俯視：短樑（紅框）疊在長樑上面，重疊 4 孔，打 2 個銷'] }], img: 'stack',
        body: ['銷只能接「重疊」的孔。兩條樑頭尾相頂是接不到的。', '要接長，就把第二條疊在上面，重疊至少 2 孔。'], task: '兩條短樑疊接成一條長樑。', check: '不晃。' },
      { h: '4. 轉方向', img: 'corner-use', body: ['平放的樑接直立的樑，用 Corner Connector。', '輪軸要穿直立的樑，所以底盤兩側一定有直立樑。'], task: '一條平放樑用 Corner Connector 接一條直立樑。', check: '直立樑不晃。' },
      { h: '5. 方正的框', svg: ['step', { w: 10, h: 8, parts: [{ x: 0, y: 0, w: 10, h: 1 }, { x: 0, y: 7, w: 10, h: 1 }, { x: 0, y: 0, w: 1, h: 8, new: true }, { x: 9, y: 0, w: 1, h: 8, new: true }], pins: [[0, 0], [0, 7], [9, 0], [9, 7]], notes: ['直樑疊在橫樑角上，每角兩個銷'] }], img: 'frame',
        body: ['四條樑疊接成框，每角兩個銷。', '檢查：量兩條對角線，要一樣長。'], task: '砌一個框，量對角線。', check: '差 ≤ 2 mm。', wrong: ['差很多 → 某角只有一個銷或未插到底。'] },
      { h: '6. 軸要兩點支撐', img: 'shaft-support', body: ['軸只穿一條樑會搖。穿兩條平行樑才穩。', '兩端用軸環鎖住。'], task: '軸穿框的兩條直樑，兩端軸環。', check: '軸不搖不跌。' }
    ],
    stuck: [['框總是歪', '每角重插到有「咔」。'], ['Corner Connector 插不入', '方向對準，不要硬插。']],
    verify: '舊生看：一銷轉、二銷固定講得出；框對角線一樣；軸兩點支撐。'
  },
  {
    id: 's1-3', stage: 1, title: '傳動', time: '約 45 分鐘', needs: '齒輪、軸、墊片、軸環、兩條平行樑',
    intro: '齒輪要裝對孔位才咬合；空位要填滿。',
    sections: [
      { h: '1. 中心距', svg: ['gearMesh', 12, 60], img: 'gear-spacing',
        body: ['兩個齒輪中心距 =（齒數A + 齒數B）÷ 24 格。', '12+12 = 1 格；12+36 = 2 格；12+60 = 3 格；36+60 = 4 格。'],
        task: '12 齒和 60 齒裝在相隔 3 格的孔，轉一轉。', check: '順滑，不跳齒。', wrong: ['卡 → 孔位錯，重數。'] },
      { h: '2. 填空位', svg: ['spacer'], img: 'spacer-use', body: ['軸上每個空位填墊片，齒輪才不會走位。', '兩端軸環。'], task: '把齒輪組的空位填滿。', check: '齒輪推不動。', wrong: ['轉不動 → 墊片太多。'] },
      { h: '3. 加速與減速', svg: ['gearMesh', 36, 12, '摩打', '車輪'], body: ['摩打 36 帶 12：快 3 倍，力少 3 倍。', '摩打 12 帶 60：慢 5 倍，力大 5 倍。', '底盤想快用大帶小；升降要力用小帶大。'], task: '用計算器試兩種齒比的速度。', check: '知道哪個快。', link: { href: 'calc.html', label: '設計計算器' } },
      { h: '4. 摩打接軸', img: 'motor-shaft', body: ['軸插入摩打正面方孔。', '軸另一端要穿一條樑支撐，不要只靠摩打。'], task: '摩打接軸，軸穿一條樑，裝一個齒輪。', check: '手轉齒輪，摩打軸跟轉。' }
    ],
    stuck: [['齒輪跳齒', '中心距太遠；或兩齒輪不在同一層。']],
    verify: '舊生看 12:60 齒輪組：孔位對、不跳齒、無空位。'
  },
  {
    id: 's1-4', stage: 1, title: '電子件', time: '約 45 分鐘', needs: '主腦、電池、2 個摩打、2 條線、控制器、電腦',
    intro: '開機、接線、配對、更新。方法依官方 VEX Library。',
    sections: [
      { h: '1. 開機、關機', svg: ['brain'], img: 'power',
        body: ['電池推入主腦底部。', '開機：按主腦的 ✓ 鍵。', '關機：按住 X 鍵直到螢幕熄。'],
        task: '開一次、關一次。', check: '見到主畫面，再關到。', wrong: ['開不到 → 電池沒電，充 30 分鐘。'], link: { href: 'https://kb.vex.com/hc/en-us/articles/360035952571-Powering-On-Off-IQ-Brain-2nd-gen', label: '官方：開關機' } },
      { h: '2. 接摩打', svg: ['wiring'], img: 'wiring',
        body: ['線兩頭一樣，一頭插摩打側面，一頭插主腦 Port。', '記住埠號，之後程式要用。'],
        task: '兩個摩打接 Port 1 和 Port 6。', check: '主腦 Devices 畫面見到兩個摩打。', wrong: ['見不到 → 線未插到底。'] },
      { h: '3. 配對控制器', svg: ['controller'], img: 'pairing',
        body: ['主腦：Settings → Link。', '控制器：按住 L 上 + L 下，再按兩下電源鍵，跟主腦螢幕指示。', '完成後控制器燈**閃綠** = 已連線。長亮綠只代表開了機。'],
        task: '配對一次。', check: '控制器燈閃綠。', wrong: ['長亮不閃 → 未連線，重做。'], link: { href: 'https://kb.vex.com/hc/en-us/articles/4406901409428', label: '官方：配對' } },
      { h: '4. 試轉摩打', body: ['主腦 Devices 畫面選摩打，可以直接試轉（待實機核實）。'], task: '試轉 Port 1。', check: '摩打轉。' },
      { h: '5. 更新韌體', body: ['Chrome 開 codeiq.vex.com，USB-C 線接主腦，彈出更新就按。', '比賽規定要用規定版本以上（R8）。每學期做一次。'], task: '更新一次。', check: 'VEXcode 右上角不再提示更新。', wrong: ['電腦見不到主腦 → 換線或 USB 口。'], link: { href: 'https://codeiq.vex.com/', label: 'VEXcode IQ' } },
      { h: '6. 電池安全', svg: ['battery'], body: ['只用原廠充電器。發脹、發熱、充不入：停用，告訴老師。'], task: '電池放回充電器。', check: '充電燈亮。' }
    ],
    stuck: [['摩打不轉', '線插到底？電池有電？'], ['配對失敗', '兩邊關機重開再配。']],
    verify: '舊生看：開關機、配對閃綠、韌體已更新。'
  },

  /* ---------- 階段 2 ---------- */
  {
    id: 's2-1', stage: 2, title: '場地', time: '約 45 分鐘', needs: '場地、軟尺、豆袋',
    intro: '走一圈場地，每個位置摸一摸、量一量。',
    sections: [
      { h: '1. 全場', svg: ['field', { bags: true, note: '方格 = 豆袋；角 = 金字塔；兩端 = Floor Goal' }], img: 'field',
        body: ['6 × 8 呎。', '兩角是金字塔 goal（L1–L3），兩端是 Floor Goal，中間兩支 L4 柱。', 'Teamwork 是紅隊和藍隊**合作**，不是對打。'], task: '站在場邊指出 5 種 goal。', check: '指得出。' },
      { h: '2. 金字塔 L1–L3', svg: ['pyramidSide'], img: 'pyramid', body: ['三層，3／6／12 分。紅金字塔只收紅袋和黃袋。'], task: '量 L1、L2、L3 表面離地（約 64／127／203 mm）。', check: '三個數寫低。' },
      { h: '3. L4', img: 'l4', body: ['最高的杯，約 610 mm。只收黃袋，16 分。全場只有 6 個黃袋。'], task: '量 L4 杯口高度。', check: '寫低。' },
      { h: '4. Floor Goal', img: 'floor', body: ['地面方格，1 分。袋要完全在格內。'], task: '放一個袋壓線試。', check: '明白要完全入格。' },
      { h: '5. 橫樑和柱', svg: ['lowVsNarrow'], img: 'beam-post', body: ['中場兩條黃色橫樑離地約 147 mm：矮機可以鑽過。', '橫樑支架和支柱之間有空隙：窄機可以穿過。'], task: '量橫樑底離地高度；量支架到支柱的空隙。', check: '兩個數寫低。' },
      { h: '6. 入袋區 Load Zone', img: 'loadzone', body: ['紅袋從紅區入，藍袋從藍區入，一次一個。區內有袋不可以再放。'], task: '找出紅、藍入袋區。', check: '指得出。' },
      { h: '7. 起點', svg: ['field', { route: [[48.5, 10], [48.5, 24], [70, 24], [86, 12]], note: '虛線：起點繞過支柱去紅金字塔' }], body: ['Teamwork：紅隊起點在藍金字塔那邊，藍隊相反。Skills：紅金字塔那邊。'], task: '模擬器由起點走到金字塔。', check: '走到。', link: { href: 'sim.html', label: '模擬器' } }
    ],
    stuck: [['沒有場地元件', '先用模擬器看，之後補量。']],
    verify: '舊生問：L2 幾高？橫樑幾高？黃袋入哪裡最多分？'
  },
  {
    id: 's2-2', stage: 2, title: '規則', time: '約 30 分鐘', needs: '手機',
    intro: '五條最重要的規則，記住就可以上場。詳細看規則頁。',
    sections: [
      { h: '1. 一次一個袋（SG6）', body: ['拿住或推住最多 1 個。碰到不算。'], task: '模擬器：手上有袋時再按「拾」，會放下而不是拾第二個。', check: '明白。', link: { href: 'sim.html', label: '模擬器' } },
      { h: '2. 顏色（SC3–SC5）', svg: ['pyramidSide'], body: ['紅入紅，藍入藍。黃百搭，但 L4 只收黃。'], task: '模擬器把藍袋放入紅金字塔。', check: '見到「顏色不對」。' },
      { h: '3. 換手（GG11）', svg: ['timeline'], body: ['60 秒一局。餘 35→25 秒之間兩位駕駛員換控制器。'], task: '計時器聽一次換手聲。', check: '聽到兩聲。', link: { href: 'tools.html', label: '計時器' } },
      { h: '4. 尺寸（R3、SG2）', body: ['開賽時：闊 279 × 長 508 × 高 381 mm。', '開賽後：高度無限；腳印最大 279 × 610 mm。'], task: '把一部機放入尺寸框。', check: '放得入。' },
      { h: '5. 摩打和零件（R9、R12–R14）', body: ['最多 6 個摩打。', '不可以 3D 打印件、其他牌子零件。', '膠紙只准用來標記摩打、主腦、控制器。'], task: '數機上摩打。', check: '≤ 6。' },
      { h: '6. 成年人（G2、SC2）', body: ['成年人不可以入駕駛區、不可以代你同裁判講。'], task: '記住。', check: '明白。' }
    ],
    stuck: [['其他規則', '規則頁搜條號。']],
    verify: '舊生問五條：持有？顏色？換手時間？尺寸？摩打數？'
  },

  /* ---------- 階段 3：Flop ---------- */
  {
    id: 's3-1', stage: 3, title: '砌 Flop（一）底盤', time: '約 90 分鐘', needs: 'IQ 第二代 Competition Kit；圖紙開在平板或電腦',
    intro: '照官方圖紙砌。網頁只告訴你每段學到甚麼、怎樣檢查。',
    official: { label: 'Flop 官方圖紙', pdf: 'https://link.vex.com/docs/26-27/viqrc/hero-robot-instructions-pdf', online: 'https://instructions.online/?id=4063-2026-2027_viqrc_herobot_flop', range: '底盤部分（步數由舊生試砌後填）' },
    sections: [
      { h: '1. 揀件', img: 'bom', body: ['圖紙第一頁是零件清單。先把底盤要用的零件全部揀出來。', '兩人一組：一人讀圖，一人砌，每 10 步換位。'], task: '揀齊底盤零件。', check: '桌面只有要用的零件。', wrong: ['缺件 → 記入缺件清單，問舊生替代。'] },
      { h: '2. 直立側樑', img: 'side-rails', body: ['留意：輪軸穿的是直立的樑。這就是 1.2 節「轉方向」。', '左右兩邊要完全一樣。'], task: '砌到兩邊側樑完成。', check: '左右對稱，每個銷「咔」。' },
      { h: '3. 摩打', img: 'motors', body: ['摩打夾在直立樑之間，方孔向外。', '每個摩打用圖紙指定的全部銷固定。'], task: '裝好底盤摩打。', check: '不晃。', wrong: ['少用銷 → 行車時鬆。'] },
      { h: '4. 輪和軸', img: 'wheels', body: ['軸穿摩打方孔和直立樑，輪在外側。', '輪和樑之間放墊片，兩端軸環。這是 1.2 節「軸兩點支撐」。'], task: '裝好全部輪。', check: '手轉輪，摩打軸跟轉；輪不磨樑。' },
      { h: '5. 底盤完成', img: 'chassis-done', body: ['放桌上四輪著地。手推直線 1 米。'], task: '推一推。', check: '不偏。', wrong: ['偏 → 某邊軸環太緊或輪磨樑。'] }
    ],
    stuck: [['圖紙某步看不懂', '用 3D 版可以旋轉看；再問舊生。'], ['零件不夠', '看缺件替代表。']],
    verify: '舊生看：對照圖紙每步一樣；推直線不偏；對稱。'
  },
  {
    id: 's3-2', stage: 3, title: '砌 Flop（二）取物', time: '約 60 分鐘', needs: '同上',
    intro: '照圖紙砌取物機構。',
    official: { label: 'Flop 官方圖紙', pdf: 'https://link.vex.com/docs/26-27/viqrc/hero-robot-instructions-pdf', online: 'https://instructions.online/?id=4063-2026-2027_viqrc_herobot_flop', range: '取物部分（步數由舊生試砌後填）' },
    sections: [
      { h: '1. 揀件', body: ['揀齊取物部分零件。'], task: '揀件。', check: '齊。' },
      { h: '2. 砌取物', img: 'intake', body: ['留意摩打怎樣帶動、用甚麼齒輪或輪。', '這是一個摩打帶動整個機構的例子。'], task: '砌到取物完成。', check: '手轉機構，順滑。' },
      { h: '3. 試夾袋', img: 'intake-test', body: ['未接電，手轉機構試夾一個豆袋。'], task: '試 5 次。', check: '夾得住、放得出。' }
    ],
    stuck: [['機構卡', '檢查齒輪中心距和空位（1.3 節）。']],
    verify: '舊生看：機構和圖紙一樣；手轉順滑。'
  },
  {
    id: 's3-3', stage: 3, title: '砌 Flop（三）升降', time: '約 60 分鐘', needs: '同上',
    intro: '照圖紙砌升降手臂。',
    official: { label: 'Flop 官方圖紙', pdf: 'https://link.vex.com/docs/26-27/viqrc/hero-robot-instructions-pdf', online: 'https://instructions.online/?id=4063-2026-2027_viqrc_herobot_flop', range: '升降部分（步數由舊生試砌後填）' },
    sections: [
      { h: '1. 揀件', body: ['揀齊升降部分零件。'], task: '揀件。', check: '齊。' },
      { h: '2. 砌升降', img: 'arm', body: ['留意：轉軸是一個銷還是軸？減速齒輪是哪兩個？', '這是 1.2 節「一個銷會轉」和 1.3 節「減速」的例子。'], task: '砌到升降完成。', check: '手動升到頂。' },
      { h: '3. 試升', img: 'arm-test', body: ['手動升到頂，鬆手。'], task: '試 3 次。', check: '不會自己跌（或跌得慢）。' }
    ],
    stuck: [['升不起', '減速齒輪裝錯；或橡筋位置不對。']],
    verify: '舊生看：和圖紙一樣；升到頂不跌。'
  },
  {
    id: 's3-4', stage: 3, title: '砌 Flop（四）接線、開車', time: '約 60 分鐘', needs: 'Flop、控制器、電腦',
    intro: '接線、配對，用主腦內置程式開車，不用寫程式。',
    sections: [
      { h: '1. 接線', svg: ['wiring'], img: 'flop-wiring', body: ['照圖紙的埠號接。寫在下面（舊生核對後填）：底盤左 ___、右 ___、取物 ___、升降 ___。', '線沿樑走，用線夾固定，不碰輪和齒輪。'], task: '接好固定。', check: 'Devices 畫面見到全部摩打。' },
      { h: '2. 檢錄模擬', body: ['放入尺寸框（279 × 508 × 381）。數摩打 ≤ 6。'], task: '放入尺寸框。', check: '放得入。' },
      { h: '3. 內置 Drive 程式', body: ['主腦內置「Drive」程式可以直接用控制器駕駛，不用寫程式。', '預設埠號和 Flop 圖紙的埠號是否一樣：待實機核實；不一樣就等 4.1 節寫程式。'], task: '開內置程式試駕。', check: '控制得到。', link: { href: 'https://kb.vex.com/hc/en-us/articles/4407010512276', label: '官方：內置 Drive 程式' } },
      { h: '4. 第一次拾放', img: 'first-score', body: ['由入袋區拾一個袋放入 Floor Goal。'], task: '做 5 次，計時。', check: '5 次中 3 次成功。' },
      { h: '5. Flop 完成', body: ['拍一張全車相。這部車已經可以出預賽。'], task: '拍相。', check: '相片。' }
    ],
    stuck: [['下載／連線失敗', '換 USB 線；主腦要開機。'], ['一邊輪反轉', '檢查該邊摩打方向是否和圖紙一樣。']],
    verify: '舊生試駕；看線不碰輪、尺寸合格、5 次拾放 3 次成功。'
  },

  /* ---------- 階段 4：程式 ---------- */
  {
    id: 's4-1', stage: 4, title: 'VEXcode 駕駛程式', time: '約 60 分鐘', needs: 'Flop、電腦（Chrome）、USB-C 線',
    intro: '自己寫駕駛程式。每步有截圖（舊生在學校電腦截）。',
    sections: [
      { h: '1. 開 VEXcode', img: 'vexcode-open', body: ['Chrome 開 codeiq.vex.com。右上角語言改繁體中文。', '新建專案 → Blocks → 選第二代主腦。'], task: '開到空白專案。', check: '見到積木。', link: { href: 'https://codeiq.vex.com/', label: 'VEXcode IQ' } },
      { h: '2. 加 Drivetrain', img: 'vexcode-drivetrain', body: ['裝置 → 加入 Drivetrain（2 或 4 摩打，照 Flop）。', '填埠號、輪周長（看輪上數字）、齒比、陀螺選 Brain Inertial。', '輪周長填錯，「前進 500 mm」永遠不準。'], task: '設定好。', check: '裝置列表見到 Drivetrain。', link: { href: 'https://kb.vex.com/hc/en-us/articles/4406843427220', label: '官方：Drivetrain 設定' } },
      { h: '3. 加控制器', img: 'vexcode-controller', body: ['裝置 → 加入 Controller。', '選 Left Arcade（左搖桿控制），或 Tank（雙搖桿）。'], task: '設定好，下載到主腦。', check: '主腦見到程式。' },
      { h: '4. 試駕', body: ['開程式，跑直線、轉圈、8 字。', '兩種搖桿模式各試，選順手的。'], task: '跑 8 字計時 3 次。', check: '控制得到。', wrong: ['整車前後反轉 → Drivetrain 設定的方向箭頭反轉。'] }
    ],
    stuck: [['下載失敗', '換線、換 USB 口、主腦要開機。'], ['學校電腦開不到網站', '告訴老師請 IT 開放。']],
    verify: '舊生看：Drivetrain 設定正確；學生自己程式開到車。'
  },
  {
    id: 's4-2', stage: 4, title: '按鍵與摩打', time: '約 45 分鐘', needs: '同上',
    intro: '把取物和升降接上控制器按鍵。',
    sections: [
      { h: '1. 加摩打', img: 'vexcode-motor', body: ['裝置 → 加入 Motor，選取物摩打埠號；再加升降摩打。'], task: '加兩個摩打。', check: '裝置列表見到。' },
      { h: '2. 按鍵', img: 'vexcode-buttons', body: ['R 上／R 下：取物正轉／反轉。', 'L 上／L 下：升降上／下。', '升降速度設 50%，容易對準。'], task: '寫好下載。', check: '按掣有反應。' },
      { h: '3. Hold', img: 'vexcode-hold', body: ['升降摩打停止模式設 Hold：鬆手手臂不跌。'], task: '設 Hold。', check: '升到頂鬆手不跌。' },
      { h: '4. 完整循環', body: ['拾袋 → 運 → 放入 Floor Goal，計時 5 次。'], task: '5 次。', check: '平均秒數寫低。' }
    ],
    stuck: [['摩打轉錯方向', '按鍵的正反轉對調。']],
    verify: '舊生看：按鍵控制取物和升降；Hold 有效。'
  },
  {
    id: 's4-3', stage: 4, title: '自動程式', time: '約 60 分鐘', needs: 'Flop、距離感應器、按鈕感應器',
    intro: '寫一條可重複的自動路線，Skills 自動賽用。',
    sections: [
      { h: '1. 直線和轉向', img: 'vexcode-auto1', body: ['前進 500 mm → 轉到 90° 方向（turn to heading）→ 前進 300 mm。', '每句寫單位（mm、degrees）。', '程式開頭等 2 秒讓陀螺校正。'], task: '實場跑 3 次，用膠紙標終點。', check: '3 次終點相差 < 5 cm。' },
      { h: '2. 距離停車', img: 'vexcode-auto2', body: ['前裝距離感應器。「前進直到距離 < 150 mm」。'], task: '對牆試 5 次。', check: '停車距離一致。' },
      { h: '3. 按鈕啟動', body: ['Skills 自動賽規定用主腦按鍵或感應器啟動，不可用控制器（RSC6）。', '程式開頭：等到 Bumper 被按。'], task: '加按鈕啟動。', check: '按一下才開始。' },
      { h: '4. 完整路線', body: ['起點 → 走到 Floor Goal 前 → 放下預載黃袋 → 停。'], task: '實場跑 5 次。', check: '5 次中 4 次入 goal。' },
      { h: '5. 模擬器對比', body: ['模擬器用路線記錄跑同一條，比較差別（打滑、電量、輪周長）。'], task: '寫一個原因。', check: '寫低。', link: { href: 'sim.html', label: '模擬器' } }
    ],
    stuck: [['每次停位不同', '減速；用 turn to heading；用牆靠位。'], ['陀螺亂轉', '開頭等 2 秒；機器靜止時啟動。']],
    verify: '舊生看 5 次自動路線 4 次入 goal；用按鈕啟動。'
  },

  /* ---------- 階段 5：機構與改裝 ---------- */
  {
    id: 's5-1', stage: 5, title: '機構原理', time: '約 45 分鐘', needs: 'Flop',
    intro: '在 Flop 上找例子，明白它為何這樣砌。',
    sections: [
      { h: '1. 齒比', svg: ['gearMesh', 12, 60, '摩打', '手臂'], body: ['Flop 升降用減速：慢但有力，停得住。', '底盤直驅或接近 1:1：夠快又夠力。'], task: '找出 Flop 升降和底盤各用甚麼齒比。', check: '寫低兩個齒比。' },
      { h: '2. 連桿與轉軸', svg: ['fourBar'], body: ['四連桿：兩條平行樑、四個轉軸，末端保持水平。', '轉軸 = 一個銷或一條軸穿圓孔。'], task: '數 Flop 手臂有幾個轉軸。', check: '指得出。' },
      { h: '3. 重心', svg: ['cog'], body: ['重的放低放中。手臂伸出時車會前傾——電池在後面抵消。'], task: '伸出手臂看會否前傾。', check: '知道電池在哪。' },
      { h: '4. 橡筋', svg: ['rubber'], body: ['拉住手臂抵消重量，摩打省力。'], task: '找 Flop 有沒有用橡筋；試加一條。', check: '鬆手手臂不跌。' },
      { h: '5. 對位', svg: ['alignBar'], body: ['放袋最慢的是對準。加一條杆頂住 goal 邊，一頂就準。'], task: '在 Flop 前加一條對位杆試放 L1。', check: '放袋時間減少。' }
    ],
    stuck: [['四連桿卡', '兩條樑要一樣長、孔位對稱。']],
    verify: '舊生問：Flop 升降用甚麼齒比？為何？'
  },
  {
    id: 's5-2', stage: 5, title: '改裝一：取物', time: '約 60 分鐘', needs: 'Flop、散件、橡筋',
    intro: '以 Flop 取物為基準，試一個改動，比較前後成功率。',
    sections: [
      { h: '1. 基準', body: ['先用原裝取物拾袋 10 次，記成功次數和秒數。'], task: '10 次。', check: '寫低。' },
      { h: '2. 選一個改動', svg: ['claw'], svg2: ['roller'], body: ['加闊入口；加橡筋增加摩擦；換較軟的輪；改成滾筒。', '一次只改一樣。'], task: '選一個，寫在測試表。', check: '寫低。' },
      { h: '3. 改完再測', body: ['同一個測試再做 10 次。'], task: '10 次。', check: '前後數字都有。' },
      { h: '4. 保留或還原', body: ['好就保留，記入筆記；差就還原，也記入筆記（評審看的就是這個）。'], task: '決定。', check: '寫低原因。' }
    ],
    stuck: [['改完更差', '正常，還原並記下，試下一個。']],
    verify: '舊生看測試表有前後數據。'
  },
  {
    id: 's5-3', stage: 5, title: '改裝二：升降', time: '約 90 分鐘', needs: 'Flop、散件、12 和 60 齒齒輪、紙皮',
    intro: '把 Flop 改到穩定入 L2。先用紙皮試高度。',
    sections: [
      { h: '1. 要幾高', svg: ['pyramidSide'], body: ['L2 約 127 mm + 50 mm 餘量 = 180 mm。', '收合時全車 ≤ 381 mm；伸出長度 ≤ 610 mm。'], task: '量 Flop 現在升到幾高。', check: '寫低。' },
      { h: '2. 四種方法', svg: ['fourBar'], svg2: ['elevator'], svg3: ['scissor'], body: ['四連桿：易，向前伸。', '直升導軌：準，難砌。', '剪叉：重。', '投擲：L4 專用，進階。'], task: '看 Flop 用哪一種。', check: '認得。' },
      { h: '3. 紙皮原型', body: ['用紙皮剪 1:1 加長的手臂放在車上，伸到 L2 旁試。'], task: '試一次。', check: '夠高，長度合規。' },
      { h: '4. 改手臂', svg: ['gearMesh', 12, 60, '摩打', '手臂'], body: ['加長樑或改轉軸位置。減速用 12 → 60。加橡筋。'], task: '改好。', check: '升到 180 mm，鬆手不跌。', wrong: ['升不起 → 減速不夠或橡筋不夠。', '車前傾 → 後面加配重。'] },
      { h: '5. 測試', body: ['拾袋 → 升 → 入 L2，5 次計時。'], task: '5 次。', check: '4 次成功。' }
    ],
    stuck: [['伸出超過 610 mm', '改向上多過向前。']],
    verify: '舊生看 5 次入 L2 4 次成功；收合放入尺寸框。'
  },
  {
    id: 's5-4', stage: 5, title: '進階機構圖鑑', time: '自定', needs: '模擬器',
    intro: '比賽隊常用的進階選擇。看優缺點，想適不適合自己隊。',
    sections: [
      { h: '1. 矮機 vs 窄機', svg: ['lowVsNarrow'], body: ['矮機（< 橫樑高）鑽底走捷徑，升降要收很低。', '窄機（< 柱距）穿空隙，不穩。', '繞長路最穩最慢。'], task: '模擬器各跑一局。', check: '三局分數寫低。', link: { href: 'sim.html', label: '模擬器' } },
      { h: '2. 直升導軌', svg: ['elevator'], body: ['齒條或鏈帶帶滑架垂直升。到 L3 約 250 mm 行程。'], task: '看官方 builds 有沒有類似機構。', check: '找到一個。', link: { href: 'https://www.vexrobotics.com/iq/downloads/build-instructions', label: '官方 IQ 圖紙庫' } },
      { h: '3. 投擲 L4', svg: ['catapult'], body: ['橡筋儲力拋黃袋上 L4（約 610 mm）。16 分但只有 6 個黃袋。'], task: '想是否值得。', check: '一句看法。' },
      { h: '4. 4 摩打底盤', svg: ['gearMesh', 36, 12, '摩打', '車輪'], body: ['4 摩打快很多，但只剩 2 個給機構。', '加速齒比超過 2 倍，IQ 摩打易過熱，第一版不建議。'], task: '計算器試。', check: '知道速度。', link: { href: 'calc.html', label: '計算器' } },
      { h: '5. 下一步', body: ['去比賽課程，由規格表開始設計自己的機。'], task: '開始比賽課程第 1 節。', check: '出發。', link: { href: 'lesson.html?id=1', label: '比賽課程第 1 節' } }
    ],
    stuck: [['不知選哪種', '先用 Flop 出賽，比賽看其他隊再決定。']],
    verify: '舊生和學生討論：我們隊走哪條路線。'
  }
];

/* 缺件替代表 */
window.SUBS = [
  ['2×20 樑', '兩條 2×12 疊接（重疊 4 孔）', '較重，接口要兩個銷'],
  ['2×12 樑', '2×10 + 1×4 疊接', '同上'],
  ['全向輪', '普通輪', '轉向較鈍，程式可用'],
  ['200 mm 輪', '160 或 250 mm 輪（前後要一樣）', 'VEXcode 周長要改'],
  ['60 齒齒輪', '36 齒 + 再加一級減速', '多一條軸'],
  ['Corner Connector', '直角樑 + 板轉方向', '較大較重'],
  ['橡筋', '規則列明型號才可比賽用', '練習可用任何'],
  ['距離感應器', '省略，自動程式用計時前進', '準度差'],
  ['第二粒電池', '一粒輪流充', '練習時間減半']
];

window.GUIDE_CODES = {
  's0-1': '7142', 's1-1': '3958', 's1-2': '6201', 's1-3': '8475', 's1-4': '2319',
  's2-1': '5064', 's2-2': '9187',
  's3-1': '4726', 's3-2': '1593', 's3-3': '8340', 's3-4': '6752',
  's4-1': '2908', 's4-2': '5531', 's4-3': '7764',
  's5-1': '3307', 's5-2': '9120', 's5-3': '4489', 's5-4': '6016'
};
