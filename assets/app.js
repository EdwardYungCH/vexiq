/* 共用：導航、進度儲存、匯出 */
(function () {
  var KEY = 'vexiq-progress-v1';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; }
  }
  function save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* 私隱模式等情況下忽略 */ }
  }

  var store = {
    get: function (path, dflt) {
      var d = load();
      var parts = path.split('.');
      for (var i = 0; i < parts.length; i++) {
        if (d == null || typeof d !== 'object') return dflt;
        d = d[parts[i]];
      }
      return d === undefined ? dflt : d;
    },
    set: function (path, value) {
      var d = load();
      var parts = path.split('.');
      var cur = d;
      for (var i = 0; i < parts.length - 1; i++) {
        if (cur[parts[i]] == null || typeof cur[parts[i]] !== 'object') cur[parts[i]] = {};
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = value;
      save(d);
    },
    all: load,
    clear: function () { try { localStorage.removeItem(KEY); } catch (e) {} }
  };

  // 課堂進度：步驟剔選比例
  function lessonProgress(lesson) {
    var steps = lesson.steps.length;
    var done = 0;
    for (var i = 0; i < steps; i++) {
      if (store.get('lesson' + lesson.id + '.step' + i, false)) done++;
    }
    return steps ? Math.round(done / steps * 100) : 0;
  }

  // 導航
  var pages = [
    ['index.html', '課程'],
    ['sim.html', '模擬器'],
    ['calc.html', '計算器'],
    ['tools.html', '計分計時'],
    ['resources.html', '資源']
  ];
  function renderNav() {
    var el = document.getElementById('topbar');
    if (!el) return;
    var here = location.pathname.split('/').pop() || 'index.html';
    var html = '<div class="inner"><a class="brand" href="index.html">VEX IQ <span>Level Up</span> 自學</a><nav>';
    pages.forEach(function (p) {
      html += '<a href="' + p[0] + '"' + (here === p[0] ? ' class="active"' : '') + '>' + p[1] + '</a>';
    });
    html += '</nav></div>';
    el.innerHTML = html;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  function copyText(text, btn) {
    function done(ok) {
      if (!btn) return;
      var old = btn.textContent;
      btn.textContent = ok ? '已複製' : '複製失敗，請長按選取';
      setTimeout(function () { btn.textContent = old; }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(true); } catch (e) { done(false); }
      document.body.removeChild(ta);
    }
  }

  window.VQ = { store: store, lessonProgress: lessonProgress, esc: esc, copyText: copyText };
  document.addEventListener('DOMContentLoaded', renderNav);
})();
