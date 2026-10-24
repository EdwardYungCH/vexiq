/* 圖文自學課（新生小白）。每節：sections（圖+說明+檢查點+常見錯誤）→ 舊生驗收碼 → 解鎖下一節。
   圖是本站自畫的示意圖；img 欄位預留實物相（放 images/<id>/<name>.jpg 就會自動顯示）。 */
window.GUIDE = [
  {
    id: 'g1', title: '零件圖鑑', time: '約 45 分鐘', needs: '零件盤、拆銷器、軟尺',
    intro: '逐件拿上手，對照圖，讀名字。做完就認得盤裡每一件。',
    sections: [
      { h: '1. 樑 Beam', svg: ['beam', 1, 8], img: 'beam',
        body: ['有孔的長條。孔距 12.7 mm = 1 格。', '1×N 一排孔，2×N 兩排孔。N = 孔數。'],
        task: '找一條 2×20 樑，量一量：約 254 mm。', check: '量到約 254 mm。', wrong: ['約 127 mm → 拿錯了 2×10。'] },
      { h: '2. 板 Plate', svg: ['plate', 4, 4], img: 'plate',
        body: ['有孔的平板。做底板、固定主腦和電池。'],
        task: '找最大的一塊板，數它幾 × 幾。', check: '數到，例如 4×12。' },
      { h: '3. 連接銷 Pin', svg: ['pin', '1x1'], svg2: ['pinJoin'], img: 'pin',
        body: ['黑色短銷，把樑和板扣住。', '1×1 接兩層；1×2 接三層；2×2 接四層。', '插到底有「咔」聲。'],
        task: '用 2 個銷把一條樑扣在板上，拉一拉。', check: '兩聲「咔」，拉不開。', wrong: ['拉得開 → 未插到底。'] },
      { h: '4. 角接件 Corner Connector', svg: ['corner', 90], img: 'corner',
        body: ['把兩條樑以 90°（或 30°、45°、60°）接住。'],
        task: '兩條樑 + 一個角接件接成 L 形。', check: 'L 形直角，不晃。' },
      { h: '5. 軸 Shaft', svg: ['shaft', 4], img: 'shaft',
        body: ['方形棒。穿樑的圓孔會自轉；穿齒輪的方孔會帶齒輪轉。'],
        task: '軸穿樑孔轉一轉，再穿齒輪轉一轉。', check: '樑孔中軸自轉；齒輪跟軸轉。' },
      { h: '6. 軸套、墊片、軸環', svg: ['bushing'], svg2: ['spacer'], img: 'spacer',
        body: ['軸套 Bushing：入樑孔，軸轉得順。', '墊片 Spacer：填空位，齒輪不會左右滑。', '軸環 Collar：夾在軸上，軸不會跌出。'],
        task: '軸穿兩條樑，中間一個齒輪，兩邊墊片填滿，兩端軸環。', check: '齒輪不滑，軸不跌。', wrong: ['仍滑 → 加墊片。', '轉不動 → 墊片太多。'] },
      { h: '7. 齒輪 Gear', svg: ['gearSet'], img: 'gear',
        body: ['12、36、60 齒。', '大帶小：快但無力。小帶大：慢但有力。'],
        task: '數 12／36／60 齒各有幾個，寫低。', check: '寫低三個數。' },
      { h: '8. 車輪 Wheel', svg: ['wheel'], svg2: ['wheel', 'omni'], img: 'wheel',
        body: ['輪上數字 = 周長 mm（160／200／250）。', '全向輪 Omni：邊有小滾輪，轉向順，拉不到重物。'],
        task: '讀出盤裡車輪的數字。', check: '讀到 160／200／250。' },
      { h: '9. 橡筋、拆銷器', svg: ['rubber'], svg2: ['pinRemover'], img: 'tools',
        body: ['橡筋 Rubber Band：幫手臂托重。', '拆銷器 Pin Remover：從銷尾頂出。不用手扯、不用鉗。'],
        task: '用拆銷器拆第 3 步的 2 個銷。', check: '銷完整拆出。' },
      { h: '10. 主腦 Brain', svg: ['brain'], img: 'brain',
        body: ['機器的電腦。上下共 12 個 Port，編號 1–12。', '只可以有一個。'],
        task: '找出 Port 旁的數字。', check: '見到 1–12。' },
      { h: '11. 摩打 Smart Motor', svg: ['motor'], img: 'motor',
        body: ['約 120 rpm。正面方孔接軸，側面接線。', '比賽最多 6 個。'],
        task: '數隊裡有幾多個，寫低。', check: '寫低數量。' },
      { h: '12. 電池、控制器、線', svg: ['battery'], svg2: ['controller'], svg3: ['cable'], img: 'electronics',
        body: ['電池：只用原廠充電器；發脹發熱即停。', '控制器：兩支搖桿、四個肩鍵。', 'Smart 線：兩頭一樣。'],
        task: '插電池，長按開機，再長按關機。', check: '開到、關到。', wrong: ['開不到 → 先充電。'] },
      { h: '13. 感應器 Sensor', svg: ['sensor', 'distance'], svg2: ['sensor', 'bumper'], svg3: ['sensor', 'optical'], img: 'sensors',
        body: ['距離：量幾遠。', '按鈕 Bumper：碰到就觸發。', '光學：讀顏色。', '陀螺：主腦內置，量角度。'],
        task: '找出隊裡有的感應器。', check: '認得兩種以上。' },
      { h: '14. 還原', body: ['同類放同一格，拍相。'], task: '零件盤還原。', check: '每格一類。' }
    ],
    stuck: [
      ['找不到零件', '問舊生；沒有就記入缺件，跳過。'],
      ['銷插不入', '是圓孔不是方孔？對準再垂直按。'],
      ['主腦開不到', '充電 30 分鐘再試。']
    ],
    verify: '舊生隨手拿 10 件問名字，答對 8 件；零件盤已還原。'
  }
];
window.GUIDE_CODES = { g1: '7142', g2: '3958', g3: '6201', g4: '8475', g5: '2319', g6: '5064', g7: '9187', g8: '4726', g9: '1593', g10: '8340', g11: '6752', g12: '2908' };
