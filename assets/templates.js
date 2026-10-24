/* 課堂範本：規則卡、規格表、方案比較表、測試記錄表、迭代表 */
(function () {
  var S = VQ.store, esc = VQ.esc;

  var T = {
    rules: {
      title: '規則卡',
      desc: '上半部由 Game Manual 找數字，填完按「核對」；下半部必須到場地親手量度，括號內只是參考值。',
      sections: [
        { type: 'fields', title: '規則數字（Game Manual v2.1）', items: [
          { k: 'size', label: '機器起始尺寸上限（闊 × 長 × 高）', ans: '11 × 20 × 15 吋（279.4 × 508 × 381 mm）' },
          { k: 'expand', label: '開賽後長度上限／高度上限', ans: '長度 24 吋（609.6 mm），闊度維持 11 吋；高度無上限' },
          { k: 'motors', label: '最多幾多個摩打', ans: '6 個 VEX IQ Smart Motor（多出的即使沒接線也不可以）' },
          { k: 'possess', label: '同一時間最多拿幾多個豆袋', ans: '1 個（拿或推都計）' },
          { k: 'bags', label: '豆袋總數（紅／藍／黃）', ans: '38 個：紅 16、藍 16、黃 6（每隊預載 1 黃，場上 4 黃）' },
          { k: 'match', label: 'Teamwork 一局幾多秒；換手在幾多秒之間', ans: '60 秒；餘下 0:35 至 0:25 之間換手，每位駕駛員最多操作 35 秒' },
          { k: 'score', label: '各 goal 分數：Floor／L1／L2／L3／L4', ans: '1／3／6／12／16 分；L4 只收黃袋；黃袋在其他 goal 百搭' },
          { k: 'ban', label: '三樣不可以用的東西', ans: '3D 打印件（任何用途）、非 VEX IQ 電子件（如 Arduino）、膠紙（標記摩打／主腦／控制器除外）' }
        ] },
        { type: 'fields', title: '場地實測（親手量，單位 mm）', items: [
          { k: 'l1', label: 'L1 表面離地高度', ref: '參考約 64 mm（2.5 吋）' },
          { k: 'l2', label: 'L2 表面離地高度', ref: '參考約 127 mm（5 吋）' },
          { k: 'l3', label: 'L3 表面離地高度', ref: '參考約 203 mm（8 吋）' },
          { k: 'l4', label: 'L4 杯口離地高度', ref: '參考約 610 mm（24 吋）' },
          { k: 'beam', label: '中場橫樑底離地高度（機器要矮過它才可鑽過）', ref: '參考約 147 mm（5.8 吋）' },
          { k: 'gap', label: '橫樑末端支架 → 支柱 → L4 柱之間可以穿過的空隙闊度', ref: '自己量，記最窄一段' },
          { k: 'floor', label: 'Floor Goal 闊度 × 深度', ref: '自己量' },
          { k: 'tol', label: '豆袋放在 L2 時，偏多少 mm 仍算入（容錯）', ref: '自己試' }
        ] }
      ]
    },
    spec: {
      title: '策略表與機器規格表',
      desc: '先填模擬器數據，再填規格表。規格表每格要有數字。',
      sections: [
        { type: 'table', title: '策略表（模擬器）', cols: [
          { k: 'who', label: '誰跑' }, { k: 'plan', label: '策略／路線' }, { k: 'score', label: '分數' }, { k: 'cycles', label: '循環次數' }
        ], rows: 5 },
        { type: 'fields', title: '機器規格表', items: [
          { k: 'goal', label: '主攻 goal', type: 'select', opts: ['Floor Goal', 'L1', 'L2', 'L3', 'L4（黃袋）'] },
          { k: 'route', label: '主路線', type: 'select', opts: ['繞長路', '鑽橫樑底（矮機）', '穿柱間空隙（窄機）', '視情況'] },
          { k: 'w', label: '闊度 mm（≤ 279）', type: 'number' },
          { k: 'l', label: '長度 mm（≤ 508，伸出 ≤ 610）', type: 'number' },
          { k: 'h', label: '收合高度 mm（≤ 381；鑽橫樑要 < 實測橫樑高）', type: 'number' },
          { k: 'reach', label: '放置高度（必須到達）mm', type: 'number' },
          { k: 'md', label: '底盤摩打數', type: 'number' },
          { k: 'mi', label: '取物摩打數', type: 'number' },
          { k: 'ml', label: '升降摩打數', type: 'number' },
          { k: 'speed', label: '預計速度 mm/s（計算器）', type: 'number' },
          { k: 'intake', label: '取物方式', type: 'select', opts: ['滾筒 intake', '夾爪', '鏟／斗', '未定'] },
          { k: 'lift', label: '升降方式', type: 'select', opts: ['四連桿手臂', '剪叉', '直升導軌', '斜拋／投擲', '未定'] },
          { k: 'cyc', label: '一局目標循環次數', type: 'number' },
          { k: 'pred', label: '預計一局得分', type: 'number' }
        ] },
        { type: 'table', title: '草圖評分表（1 至 5 分）', cols: [
          { k: 'name', label: '草圖／作者' }, { k: 's1', label: '得分潛力' }, { k: 's2', label: '零件夠用' }, { k: 's3', label: '容易砌' }, { k: 's4', label: '穩定' }, { k: 'tot', label: '總分' }
        ], rows: 3 }
      ]
    },
    compare: {
      title: '方案比較表與測試表',
      desc: '每個方案都要有原型和 10 次測試的數字，不可以憑感覺填。',
      sections: [
        { type: 'table', title: '方案比較表', cols: [
          { k: 'name', label: '方案' }, { k: 'ok', label: '拾／升成功次數 /10' }, { k: 'rel', label: '放／停穩成功 /10' }, { k: 'm', label: '摩打數' }, { k: 'wt', label: '重量 g' }, { k: 'ease', label: '易砌 1–5' }, { k: 'fit', label: '配合其他模組 1–5' }, { k: 'tot', label: '總評' }
        ], rows: 4 },
        { type: 'fields', title: '決定', items: [
          { k: 'chosen', label: '選定方案' },
          { k: 'why', label: '原因（兩句）', type: 'textarea' },
          { k: 'dim', label: '正式版尺寸 mm、重量 g、摩打埠' }
        ] },
        { type: 'table', title: '正式版測試表', cols: [
          { k: 'item', label: '測試項目' }, { k: 'n', label: '次數／條件' }, { k: 'res', label: '結果' }, { k: 'pass', label: '合格', type: 'select', opts: ['', '✔', '✘'] }, { k: 'note', label: '備註' }
        ], rows: 6 }
      ]
    },
    test: {
      title: '測試記錄表',
      desc: '每行一個測試。結果要有數字（cm、秒、次數）。不合格的項目要寫改了甚麼。',
      sections: [
        { type: 'table', title: '測試', cols: [
          { k: 'item', label: '測試項目' }, { k: 'n', label: '次數／條件' }, { k: 'res', label: '結果（數字）' }, { k: 'pass', label: '合格', type: 'select', opts: ['', '✔', '✘'] }, { k: 'note', label: '備註／改了甚麼' }
        ], rows: 10 },
        { type: 'fields', title: '總結', items: [
          { k: 'worst', label: '最大問題／最慢一步' },
          { k: 'next', label: '下一步改甚麼（只改一樣）' }
        ] }
      ]
    },
    iterate: {
      title: '迭代記錄表',
      desc: '一次改一樣。前後數據要用同一個測試量。',
      sections: [
        { type: 'table', title: '改動記錄', cols: [
          { k: 'date', label: '日期' }, { k: 'prob', label: '問題' }, { k: 'change', label: '改了甚麼' }, { k: 'before', label: '改前數據' }, { k: 'after', label: '改後數據' }, { k: 'keep', label: '保留？', type: 'select', opts: ['', '保留', '還原'] }
        ], rows: 10 },
        { type: 'table', title: 'Skills 分數趨勢', cols: [
          { k: 'date', label: '日期' }, { k: 'drive', label: '駕駛分' }, { k: 'auto', label: '自動分' }, { k: 'note', label: '備註' }
        ], rows: 8 }
      ]
    }
  };

  function inputHtml(key, type, opts, val) {
    if (type === 'select') {
      return '<select data-k="' + key + '">' + opts.map(function (o) { return '<option' + (o === val ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join('') + '</select>';
    }
    if (type === 'textarea') return '<textarea data-k="' + key + '">' + esc(val) + '</textarea>';
    return '<input type="' + (type === 'number' ? 'number' : 'text') + '" data-k="' + key + '" value="' + esc(val) + '">';
  }

  function render(name, prefix) {
    var t = T[name]; var h = '';
    t.sections.forEach(function (sec, si) {
      h += '<h3>' + esc(sec.title) + '</h3>';
      if (sec.type === 'fields') {
        sec.items.forEach(function (it) {
          var key = prefix + si + '.' + it.k;
          h += '<label class="field">' + esc(it.label) + (it.ref ? '<span>' + esc(it.ref) + '</span>' : '') +
            inputHtml(key, it.type || 'text', it.opts || [], S.get(key, '')) +
            (it.ans ? '<span class="ans" data-ans="' + esc(it.ans) + '" style="display:none;color:#1f9d55">答案：' + esc(it.ans) + '</span>' : '') + '</label>';
        });
        if (sec.items.some(function (it) { return it.ans; })) h += '<button class="btn sm ghost" data-reveal>核對答案</button>';
      } else {
        h += '<div class="table-scroll"><table><thead><tr>' + sec.cols.map(function (c) { return '<th>' + esc(c.label) + '</th>'; }).join('') + '</tr></thead><tbody>';
        for (var r = 0; r < sec.rows; r++) {
          h += '<tr>' + sec.cols.map(function (c) {
            var key = prefix + si + '.r' + r + '.' + c.k;
            return '<td>' + inputHtml(key, c.type || 'text', c.opts || [], S.get(key, '')) + '</td>';
          }).join('') + '</tr>';
        }
        h += '</tbody></table></div>';
      }
    });
    return h;
  }

  function bind(container) {
    container.addEventListener('input', function (e) {
      var k = e.target.getAttribute('data-k');
      if (k) S.set(k, e.target.value);
    });
    container.addEventListener('change', function (e) {
      var k = e.target.getAttribute('data-k');
      if (k) S.set(k, e.target.value);
    });
    container.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-reveal')) {
        var shown = e.target.textContent === '收起答案';
        container.querySelectorAll('.ans').forEach(function (a) { a.style.display = shown ? 'none' : 'block'; });
        e.target.textContent = shown ? '核對答案' : '收起答案';
      }
    });
  }

  function toText(name, prefix) {
    var t = T[name]; var out = [];
    t.sections.forEach(function (sec, si) {
      out.push('【' + sec.title + '】');
      if (sec.type === 'fields') {
        sec.items.forEach(function (it) {
          var v = S.get(prefix + si + '.' + it.k, '');
          if (v !== '') out.push(it.label + '：' + v);
        });
      } else {
        for (var r = 0; r < sec.rows; r++) {
          var cells = [];
          var any = false;
          sec.cols.forEach(function (c) {
            var v = S.get(prefix + si + '.r' + r + '.' + c.k, '');
            if (v !== '') any = true;
            cells.push(c.label + '=' + v);
          });
          if (any) out.push((r + 1) + '. ' + cells.join('｜'));
        }
      }
    });
    return out.join('\n');
  }

  T.render = render; T.bind = bind; T.toText = toText;
  window.TEMPLATES = T;
})();
