/* VEX IQ 零件示意圖（SVG 線圖）。所有尺寸按 1 格 = 12.7 mm 的格線畫，單位 px，1 格 = 24 px。
   這些是示意圖，不是官方圖像；用來認零件和看步驟，實物以零件盤為準。 */
(function () {
  var U = 24; // 一格
  var C = { body: '#2f6fb5', body2: '#5b8fd1', hole: '#ffffff', line: '#1b2b44', metal: '#9aa3ad', metalD: '#5f6a75', green: '#2e9e5b', grey: '#c8ccd2', dark: '#2b2f36', yellow: '#f2c200', red: '#d7263d', black: '#222' };

  function svg(w, h, inner, vb) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + (vb || '0 0 ' + w + ' ' + h) + '" width="100%" style="max-width:' + w + 'px;display:block;margin:auto" role="img">' + inner + '</svg>';
  }
  function holes(x0, y0, nx, ny, r) {
    var s = '';
    for (var i = 0; i < nx; i++) for (var j = 0; j < ny; j++)
      s += '<circle cx="' + (x0 + U / 2 + i * U) + '" cy="' + (y0 + U / 2 + j * U) + '" r="' + (r || 6.5) + '" fill="' + C.hole + '" stroke="' + C.line + '" stroke-width="1.2"/>';
    return s;
  }
  function label(x, y, t, size) { return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 13) + '" fill="' + C.line + '" font-family="sans-serif" text-anchor="middle">' + t + '</text>'; }
  function dim(x1, y1, x2, y2, t) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + C.red + '" stroke-width="1" marker-start="url(#a)" marker-end="url(#a)"/>' + label((x1 + x2) / 2, y1 - 5, t, 11);
  }
  var defs = '<defs><marker id="a" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><circle cx="3" cy="3" r="2" fill="' + C.red + '"/></marker></defs>';

  // 樑：w 格闊、n 格長
  function beam(w, n, color) {
    var W = n * U, H = w * U, pad = 20;
    var inner = defs + '<rect x="' + pad + '" y="' + pad + '" width="' + W + '" height="' + H + '" rx="8" fill="' + (color || C.body) + '" stroke="' + C.line + '" stroke-width="1.5"/>' + holes(pad, pad, n, w) +
      dim(pad, pad + H + 18, pad + U, pad + H + 18, '12.7 mm') + label(pad + W / 2, pad + H + 40, w + ' × ' + n + ' 樑（' + n + ' 孔）');
    return svg(W + pad * 2, H + pad * 2 + 30, inner);
  }
  function plate(nx, ny) {
    var W = nx * U, H = ny * U, pad = 20;
    return svg(W + pad * 2, H + pad * 2 + 10, '<rect x="' + pad + '" y="' + pad + '" width="' + W + '" height="' + H + '" rx="6" fill="' + C.body2 + '" stroke="' + C.line + '" stroke-width="1.5"/>' + holes(pad, pad, nx, ny) + label(pad + W / 2, pad + H + 22, nx + ' × ' + ny + ' 板'));
  }
  function pin(kind) {
    // 側視：連接銷 1×1 / 1×2 / 2×2
    var s = defs;
    var shapes = {
      '1x1': '<rect x="40" y="30" width="14" height="40" rx="3" fill="' + C.dark + '"/><rect x="36" y="46" width="22" height="8" rx="2" fill="' + C.dark + '"/><path d="M40 30 l7 -8 l7 8z" fill="' + C.dark + '"/><path d="M40 70 l7 8 l7 -8z" fill="' + C.dark + '"/>' + label(47, 100, '1×1 連接銷', 12) + label(47, 116, '接兩層', 11),
      '1x2': '<rect x="40" y="18" width="14" height="64" rx="3" fill="' + C.dark + '"/><rect x="36" y="46" width="22" height="8" rx="2" fill="' + C.dark + '"/><path d="M40 18 l7 -8 l7 8z" fill="' + C.dark + '"/><path d="M40 82 l7 8 l7 -8z" fill="' + C.dark + '"/>' + label(47, 112, '1×2 連接銷', 12) + label(47, 128, '一邊長，接三層', 11),
      '2x2': '<rect x="40" y="10" width="14" height="80" rx="3" fill="' + C.dark + '"/><rect x="36" y="46" width="22" height="8" rx="2" fill="' + C.dark + '"/><path d="M40 10 l7 -8 l7 8z" fill="' + C.dark + '"/><path d="M40 90 l7 8 l7 -8z" fill="' + C.dark + '"/>' + label(47, 120, '2×2 連接銷', 12) + label(47, 136, '兩邊長，接四層', 11)
    };
    return svg(95, 140, s + shapes[kind || '1x1']);
  }
  function pinJoin() {
    // 剖面：兩條樑被銷扣住
    var s = '<rect x="20" y="40" width="160" height="24" rx="4" fill="' + C.body + '" stroke="' + C.line + '"/><rect x="20" y="64" width="160" height="24" rx="4" fill="' + C.body2 + '" stroke="' + C.line + '"/>' +
      '<rect x="93" y="30" width="14" height="68" rx="3" fill="' + C.dark + '"/><rect x="89" y="60" width="22" height="8" rx="2" fill="' + C.dark + '"/>' +
      '<path d="M93 30 l7 -8 l7 8z" fill="' + C.dark + '"/><path d="M93 98 l7 8 l7 -8z" fill="' + C.dark + '"/>' +
      label(100, 20, '剖面：銷把兩條樑扣住', 12) + label(100, 125, '中間的圓環卡在兩樑之間，插到底會「咔」一聲', 11);
    return svg(200, 135, s);
  }
  function corner(angle) {
    var s = defs;
    if (angle === 90) {
      s += '<path d="M20 20 h24 v72 h72 v24 h-96z" fill="' + C.body + '" stroke="' + C.line + '" stroke-width="1.5"/>' + holes(20, 20, 1, 4) + holes(44, 92, 3, 1) + label(70, 140, '直角角接件（90°）', 12);
    } else {
      s += '<path d="M20 20 h24 v60 l50 36 l-14 18 l-60 -42z" fill="' + C.body + '" stroke="' + C.line + '" stroke-width="1.5"/>' + holes(20, 20, 1, 3) + label(70, 150, '斜角角接件（' + angle + '°）', 12);
    }
    return svg(140, 160, s);
  }
  function shaft(n) {
    var L = n * U;
    return svg(L + 60, 70, '<rect x="20" y="28" width="' + L + '" height="10" fill="' + C.metal + '" stroke="' + C.metalD + '"/>' +
      '<rect x="' + (L + 30) + '" y="20" width="12" height="12" fill="' + C.metal + '" stroke="' + C.metalD + '" transform="rotate(45 ' + (L + 36) + ' 26)"/>' + label(L + 36, 50, '方形截面', 10) + label(L / 2 + 20, 60, n + ' 格長軸（' + (n * 12.7).toFixed(0) + ' mm）', 12));
  }
  function bushing() {
    return svg(120, 110, '<circle cx="60" cy="45" r="26" fill="' + C.grey + '" stroke="' + C.line + '"/><rect x="51" y="36" width="18" height="18" fill="#fff" stroke="' + C.line + '"/>' + label(60, 95, '軸套：裝在樑孔，軸穿過順滑轉', 11));
  }
  function spacer() {
    return svg(200, 110, '<circle cx="50" cy="45" r="18" fill="' + C.grey + '" stroke="' + C.line + '"/><rect x="43" y="38" width="14" height="14" fill="#fff" stroke="' + C.line + '"/>' + label(50, 80, '薄墊片', 11) +
      '<circle cx="110" cy="45" r="18" fill="' + C.grey + '" stroke="' + C.line + '"/><rect x="103" y="38" width="14" height="14" fill="#fff" stroke="' + C.line + '"/><rect x="92" y="60" width="36" height="8" fill="' + C.grey + '" stroke="' + C.line + '"/>' + label(110, 80, '厚墊片', 11) +
      '<circle cx="165" cy="45" r="14" fill="' + C.dark + '"/><rect x="159" y="39" width="12" height="12" fill="#fff" stroke="' + C.line + '"/>' + label(165, 80, '橡膠軸環', 11) + label(100, 100, '填空位、固定齒輪位置', 11));
  }
  function gear(teeth, cx, cy, r) {
    var p = '';
    var n = teeth, ro = r, ri = r - 5;
    for (var i = 0; i < n; i++) {
      var a0 = (i / n) * Math.PI * 2, a1 = ((i + .5) / n) * Math.PI * 2;
      var x0 = cx + ro * Math.cos(a0), y0 = cy + ro * Math.sin(a0), x1 = cx + ri * Math.cos(a1), y1 = cy + ri * Math.sin(a1);
      p += (i ? 'L' : 'M') + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' L' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' ';
    }
    return '<path d="' + p + 'Z" fill="' + C.green + '" stroke="' + C.line + '" stroke-width="1.2"/><rect x="' + (cx - 6) + '" y="' + (cy - 6) + '" width="12" height="12" fill="#fff" stroke="' + C.line + '"/>';
  }
  function gearSet() {
    return svg(300, 150, gear(12, 45, 70, 18) + label(45, 115, '12 齒', 12) + gear(36, 135, 70, 42) + label(135, 135, '36 齒', 12) + gear(60, 255, 70, 60) + label(255, 145, '60 齒', 12));
  }
  function gearMesh(a, b) {
    var ra = a === 12 ? 18 : a === 36 ? 42 : 60, rb = b === 12 ? 18 : b === 36 ? 42 : 60;
    var cx1 = 30 + ra, cx2 = cx1 + ra + rb - 4, cy = 80;
    return svg(cx2 + rb + 30, 170, gear(a, cx1, cy, ra) + gear(b, cx2, cy, rb) +
      '<path d="M' + (cx1 - 8) + ' ' + (cy - ra - 12) + ' a12 12 0 0 1 16 0" fill="none" stroke="' + C.red + '" stroke-width="2" marker-end="url(#a)"/>' + defs +
      label(cx1, cy + ra + 18, '摩打 ' + a + ' 齒', 12) + label(cx2, cy + rb + 18, '車輪 ' + b + ' 齒', 12) +
      label((cx1 + cx2) / 2, 160, '齒比 ' + a + ':' + b + ' → 輪速 = 摩打 × ' + (a / b).toFixed(2), 12));
  }
  function wheel(kind) {
    var s = '<circle cx="60" cy="60" r="50" fill="' + C.dark + '" stroke="' + C.line + '"/><circle cx="60" cy="60" r="34" fill="' + C.grey + '" stroke="' + C.line + '"/><rect x="54" y="54" width="12" height="12" fill="#fff" stroke="' + C.line + '"/>';
    if (kind === 'omni') {
      for (var i = 0; i < 12; i++) { var a = i / 12 * Math.PI * 2; s += '<ellipse cx="' + (60 + 50 * Math.cos(a)) + '" cy="' + (60 + 50 * Math.sin(a)) + '" rx="5" ry="9" transform="rotate(' + (a * 180 / Math.PI) + ' ' + (60 + 50 * Math.cos(a)) + ' ' + (60 + 50 * Math.sin(a)) + ')" fill="' + C.grey + '" stroke="' + C.line + '"/>'; }
    }
    return svg(120, 140, s + label(60, 130, kind === 'omni' ? '全向輪：輪邊有小滾輪' : '普通輪：輪上數字 = 周長 mm', 11));
  }
  function rubber() { return svg(120, 90, '<ellipse cx="60" cy="40" rx="45" ry="18" fill="none" stroke="#c0392b" stroke-width="5"/>' + label(60, 80, '橡筋', 12)); }
  function pinRemover() {
    return svg(160, 80, '<rect x="20" y="30" width="80" height="18" rx="6" fill="' + C.dark + '"/><rect x="100" y="35" width="40" height="8" fill="' + C.metal + '"/>' + label(80, 70, '拆銷器：頂住銷尾推出', 11));
  }
  function brain() {
    var s = '<rect x="20" y="20" width="200" height="130" rx="12" fill="#f4f4f4" stroke="' + C.line + '" stroke-width="2"/><rect x="60" y="40" width="120" height="60" rx="4" fill="#1b2b44"/>' + label(120, 75, '螢幕', 12).replace(C.line, '#fff') +
      '<circle cx="200" cy="120" r="8" fill="' + C.green + '"/>' + label(200, 142, '電源', 10);
    for (var i = 0; i < 6; i++) s += '<rect x="' + (28 + i * 16) + '" y="8" width="12" height="10" fill="' + C.dark + '"/><rect x="' + (28 + i * 16) + '" y="152" width="12" height="10" fill="' + C.dark + '"/>';
    return svg(240, 185, s + label(120, 180, '主腦：上下共 12 個 Smart Port（1–12）', 11));
  }
  function motor() {
    return svg(200, 130, '<rect x="30" y="30" width="110" height="70" rx="10" fill="#2b2f36" stroke="' + C.line + '"/><circle cx="150" cy="65" r="10" fill="' + C.metal + '"/><rect x="146" y="61" width="8" height="8" fill="#fff"/>' + label(85, 70, 'Smart Motor', 12).replace(C.line, '#fff') + '<rect x="10" y="55" width="20" height="20" fill="' + C.dark + '"/>' + label(100, 120, '約 120 rpm；方孔接軸；側面接線', 11));
  }
  function battery() { return svg(160, 110, '<rect x="20" y="30" width="110" height="50" rx="8" fill="#e8e8e8" stroke="' + C.line + '"/><rect x="130" y="45" width="12" height="20" fill="' + C.dark + '"/>' + label(75, 60, '電池', 12) + label(80, 100, '第二代電池；只用原廠充電器', 11)); }
  function controller() {
    return svg(220, 140, '<path d="M30 40 h160 a20 20 0 0 1 20 20 v40 a20 20 0 0 1 -20 20 h-160 a20 20 0 0 1 -20 -20 v-40 a20 20 0 0 1 20 -20z" fill="#2b2f36"/><circle cx="60" cy="80" r="16" fill="' + C.grey + '"/><circle cx="160" cy="80" r="16" fill="' + C.grey + '"/>' +
      '<rect x="40" y="22" width="30" height="14" rx="4" fill="' + C.grey + '"/><rect x="150" y="22" width="30" height="14" rx="4" fill="' + C.grey + '"/>' + label(55, 18, 'L 上／下', 10) + label(165, 18, 'R 上／下', 10) + label(110, 135, '控制器：兩支搖桿、四個肩鍵', 11));
  }
  function sensor(kind) {
    var names = { distance: '距離感應器', bumper: '按鈕感應器', optical: '光學／顏色感應器', gyro: '慣性感應器（第二代主腦內置）' };
    var extra = kind === 'bumper' ? '<rect x="40" y="18" width="40" height="12" rx="3" fill="' + C.red + '"/>' : kind === 'distance' ? '<circle cx="48" cy="55" r="8" fill="#000"/><circle cx="72" cy="55" r="8" fill="#000"/>' : '<circle cx="60" cy="55" r="10" fill="#555"/>';
    return svg(120, 110, '<rect x="30" y="30" width="60" height="50" rx="8" fill="#2b2f36"/>' + extra + label(60, 100, names[kind] || kind, 11));
  }
  function cable() { return svg(200, 70, '<rect x="10" y="25" width="26" height="20" fill="' + C.dark + '"/><path d="M36 35 q60 -25 128 0" fill="none" stroke="#333" stroke-width="5"/><rect x="164" y="25" width="26" height="20" fill="' + C.dark + '"/>' + label(100, 65, 'Smart Port 線：兩頭一樣', 11)); }

  // 砌機步驟：俯視圖（格線 + 零件矩形 + 標註）
  function step(opts) {
    // opts: {w,h (格), parts:[{x,y,w,h,color,label,hole:true}], circles:[{x,y,r,color,label}], notes:[...], highlight:[idx]}
    var pad = 24, W = opts.w * U, H = opts.h * U;
    var s = defs + '<rect x="' + pad + '" y="' + pad + '" width="' + W + '" height="' + H + '" fill="#f7f8fa" stroke="#dde1e7"/>';
    for (var i = 0; i <= opts.w; i++) s += '<line x1="' + (pad + i * U) + '" y1="' + pad + '" x2="' + (pad + i * U) + '" y2="' + (pad + H) + '" stroke="#e6e9ee"/>';
    for (var j = 0; j <= opts.h; j++) s += '<line x1="' + pad + '" y1="' + (pad + j * U) + '" x2="' + (pad + W) + '" y2="' + (pad + j * U) + '" stroke="#e6e9ee"/>';
    (opts.parts || []).forEach(function (p, idx) {
      var x = pad + p.x * U, y = pad + p.y * U, w = p.w * U, h = p.h * U;
      var hi = p.new ? ' stroke="' + C.red + '" stroke-width="3"' : ' stroke="' + C.line + '" stroke-width="1.2"';
      s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" fill="' + (p.color || (p.new ? C.body : '#b9c7dc')) + '"' + hi + ' opacity="' + (p.new ? 1 : .85) + '"/>';
      if (p.hole !== false && p.w >= 1 && p.h >= 1 && (p.w <= 2 || p.h <= 2)) s += holes(x, y, p.w, p.h, 5);
      if (p.label) s += label(x + w / 2, y + h / 2 + 4, p.label, 11).replace('fill="' + C.line + '"', 'fill="' + (p.color === '#2b2f36' ? '#fff' : C.line) + '"');
    });
    (opts.circles || []).forEach(function (c) {
      var x = pad + c.x * U, y = pad + c.y * U;
      s += '<circle cx="' + x + '" cy="' + y + '" r="' + c.r * U + '" fill="' + (c.color || C.dark) + '" stroke="' + (c.new ? C.red : C.line) + '" stroke-width="' + (c.new ? 3 : 1.2) + '"/>';
      if (c.label) s += label(x, y + c.r * U + 14, c.label, 11);
    });
    (opts.pins || []).forEach(function (p) {
      s += '<circle cx="' + (pad + p[0] * U + U / 2) + '" cy="' + (pad + p[1] * U + U / 2) + '" r="5" fill="' + C.dark + '" stroke="' + C.red + '" stroke-width="2"/>';
    });
    var ny = pad + H + 18;
    (opts.notes || []).forEach(function (t) { s += label(pad + W / 2, ny, t, 12); ny += 16; });
    return svg(W + pad * 2, H + pad * 2 + 16 * (opts.notes || []).length + 4, s);
  }

  // 四連桿動畫示意、重心示意
  function fourBar() {
    return svg(260, 170, defs +
      '<rect x="20" y="120" width="60" height="30" rx="4" fill="' + C.body + '"/>' +
      '<g><line x1="40" y1="120" x2="140" y2="60" stroke="' + C.green + '" stroke-width="8" stroke-linecap="round"/><line x1="70" y1="120" x2="170" y2="60" stroke="' + C.green + '" stroke-width="8" stroke-linecap="round"/>' +
      '<rect x="135" y="40" width="50" height="30" rx="4" fill="' + C.yellow + '"/>' +
      '<animateTransform attributeName="transform" type="rotate" values="0 40 120; -25 40 120; 0 40 120" dur="3s" repeatCount="indefinite"/></g>' +
      label(130, 165, '四連桿：兩條平行樑，末端（黃）升降時保持水平', 11));
  }
  function cog() {
    return svg(260, 160, '<rect x="30" y="100" width="90" height="30" rx="4" fill="' + C.body + '"/><rect x="60" y="80" width="30" height="20" fill="' + C.dark + '"/><circle cx="75" cy="105" r="5" fill="' + C.red + '"/>' + label(75, 150, '電池放低放中：穩', 11) +
      '<rect x="150" y="100" width="90" height="30" rx="4" fill="' + C.body + '"/><rect x="200" y="30" width="30" height="70" fill="' + C.dark + '"/><circle cx="205" cy="70" r="5" fill="' + C.red + '"/>' + label(195, 150, '重物放高放前：轉彎易翻', 11) + label(130, 20, '紅點 = 重心', 11));
  }


  // 場地俯視（簡化，與模擬器同比例）
  function field(opts) {
    opts = opts || {};
    var k = 3, W = 97 * k, H = 73 * k, p = 14;
    function X(x) { return p + x * k; } function Y(y) { return p + (73 - y) * k; }
    function r(x1, y1, x2, y2, f, st) { return '<rect x="' + X(x1) + '" y="' + Y(y2) + '" width="' + ((x2 - x1) * k) + '" height="' + ((y2 - y1) * k) + '" fill="' + f + '" stroke="' + (st || C.line) + '"/>'; }
    var s = '<rect x="' + p + '" y="' + p + '" width="' + W + '" height="' + H + '" fill="#d9dde3" stroke="' + C.line + '" stroke-width="2"/>';
    s += r(90, 18.5, 97, 54.5, 'rgba(215,38,61,.3)', C.red) + r(0, 18.5, 7, 54.5, 'rgba(42,111,219,.3)', C.blue);
    s += r(0, 0, 7, 18.5, 'rgba(215,38,61,.12)', C.red) + r(90, 54.5, 97, 73, 'rgba(42,111,219,.12)', C.blue);
    [[19.25, .35], [14.5, .55], [8.5, .8]].forEach(function (l) { s += r(97 - l[0], 0, 97, l[0], 'rgba(215,38,61,' + l[1] + ')', '#fff') + r(0, 73 - l[0], l[0], 73, 'rgba(42,111,219,' + l[1] + ')', '#fff'); });
    s += r(60, 0.5, 61, 26.5, C.yellow) + r(36, 46.5, 37, 72.5, C.yellow) + r(60, 26.5, 61, 39, '#8e949e') + r(36, 34, 37, 46.5, '#8e949e');
    [[60.5, 42.5], [36.5, 30.5]].forEach(function (c) { s += '<circle cx="' + X(c[0]) + '" cy="' + Y(c[1]) + '" r="' + 3.5 * k + '" fill="' + C.yellow + '" stroke="' + C.line + '"/>' + label(X(c[0]), Y(c[1]) + 4, 'L4', 10); });
    [[60.5, 30.5], [36.5, 42.5]].forEach(function (c) { s += '<circle cx="' + X(c[0]) + '" cy="' + Y(c[1]) + '" r="' + 2 * k + '" fill="#555"/>'; });
    if (opts.labels !== false) {
      s += label(X(93.5), Y(36), '紅', 11) + label(X(3.5), Y(36), '藍', 11) + label(X(3.5), Y(9), '紅入袋', 9) + label(X(93.5), Y(63), '藍入袋', 9) + label(X(88), Y(8), 'L1-3', 10) + label(X(9), Y(65), 'L1-3', 10) + label(X(48.5), Y(8), '起點', 10) + label(X(48.5), Y(13), '橫樑', 9).replace('x="' + X(48.5) + '"', 'x="' + X(66) + '"');
    }
    if (opts.bags) {
      var B = { blue: [[84.5, 48.5], [84.5, 36.5], [84.5, 24.5], [78.5, 66.5], [66.5, 66.5], [66.5, 36.5], [66.5, 6.5], [48.5, 30.5]], red: [[48.5, 42.5], [30.5, 66.5], [30.5, 36.5], [30.5, 6.5], [18.5, 6.5], [12.5, 48.5], [12.5, 36.5], [12.5, 24.5]], yellow: [[42.5, 30.5], [42.5, 42.5], [54.5, 30.5], [54.5, 42.5]] };
      Object.keys(B).forEach(function (c) { B[c].forEach(function (b) { s += '<rect x="' + (X(b[0]) - 2 * k) + '" y="' + (Y(b[1]) - 1.5 * k) + '" width="' + 4 * k + '" height="' + 3 * k + '" fill="' + C[c] + '" stroke="#333"/>'; }); });
    }
    if (opts.route) s += '<path d="' + opts.route.map(function (pt, i) { return (i ? 'L' : 'M') + X(pt[0]) + ' ' + Y(pt[1]); }).join(' ') + '" fill="none" stroke="' + C.line + '" stroke-width="3" stroke-dasharray="6 4"/>';
    if (opts.note) s += label(p + W / 2, H + p + 18, opts.note, 11);
    return svg(W + p * 2, H + p * 2 + (opts.note ? 14 : 0), s);
  }
  // 金字塔側視（分數）
  function pyramidSide() {
    var s = '';
    [[20, 2.5, 'L1 3分'], [14.5, 5, 'L2 6分'], [8.5, 8, 'L3 12分']].forEach(function (l, i) {
      var w = l[0] * 10, h = l[1] * 10; s += '<rect x="' + (20) + '" y="' + (150 - h) + '" width="' + w + '" height="' + (h - (i ? [2.5, 5][i - 1] * 10 : 0)) + '" fill="rgba(215,38,61,' + (.35 + i * .2) + ')" stroke="#fff"/>' + label(20 + w - 22, 150 - h + 14, l[2], 10);
    });
    s += '<rect x="250" y="150" width="60" height="4" fill="#999"/>' + label(280, 170, 'Floor 1分', 10);
    s += '<line x1="330" y1="150" x2="330" y2="-90" stroke="#555" stroke-width="3"/><ellipse cx="330" cy="-90" rx="20" ry="8" fill="' + C.yellow + '" stroke="' + C.line + '"/>' + label(330, -100, 'L4 16分 只收黃', 10);
    return svg(380, 180, '<g transform="translate(0 100)">' + s + '</g>' + label(190, 15, '愈高分愈多', 12), '0 -10 380 190');
  }
  function timeline() {
    var s = '<rect x="20" y="40" width="300" height="20" fill="#e6e9ef" stroke="' + C.line + '"/>';
    s += '<rect x="' + (20 + 300 * 25 / 60) + '" y="40" width="' + (300 * 10 / 60) + '" height="20" fill="' + C.yellow + '"/>';
    s += label(20, 80, '60', 11) + label(320, 80, '0', 11) + label(20 + 300 * 25 / 60, 30, '35', 11) + label(20 + 300 * 35 / 60, 30, '25', 11) + label(170, 100, '黃色時段換手（餘 35→25 秒）', 11);
    return svg(340, 110, s);
  }
  // 機構示意
  function claw() {
    return svg(220, 150, '<rect x="90" y="20" width="40" height="30" fill="#2b2f36"/><circle cx="110" cy="35" r="5" fill="' + C.metal + '"/>' +
      '<g><path d="M110 50 L60 110" stroke="' + C.green + '" stroke-width="8" stroke-linecap="round"/><animateTransform attributeName="transform" type="rotate" values="0 110 50;20 110 50;0 110 50" dur="2s" repeatCount="indefinite"/></g>' +
      '<g><path d="M110 50 L160 110" stroke="' + C.green + '" stroke-width="8" stroke-linecap="round"/><animateTransform attributeName="transform" type="rotate" values="0 110 50;-20 110 50;0 110 50" dur="2s" repeatCount="indefinite"/></g>' +
      '<rect x="90" y="95" width="40" height="30" fill="' + C.yellow + '" stroke="#333"/>' + label(110, 145, '夾爪：一個摩打開合', 11));
  }
  function roller() {
    return svg(220, 150, '<rect x="20" y="90" width="120" height="30" rx="4" fill="' + C.body + '"/>' +
      '<g><circle cx="150" cy="70" r="22" fill="#444"/><line x1="150" y1="48" x2="150" y2="92" stroke="#888" stroke-width="3"/><line x1="128" y1="70" x2="172" y2="70" stroke="#888" stroke-width="3"/><animateTransform attributeName="transform" type="rotate" values="0 150 70;-360 150 70" dur="1.5s" repeatCount="indefinite"/></g>' +
      '<rect x="175" y="100" width="36" height="22" fill="' + C.yellow + '" stroke="#333"><animate attributeName="x" values="185;120;185" dur="1.5s" repeatCount="indefinite"/></rect>' + label(110, 145, '滾筒：轉動把袋捲入', 11));
  }
  function scissor() {
    return svg(220, 170, '<rect x="60" y="130" width="100" height="20" rx="4" fill="' + C.body + '"/>' +
      '<g><line x1="70" y1="130" x2="150" y2="70" stroke="' + C.green + '" stroke-width="6"/><line x1="150" y1="130" x2="70" y2="70" stroke="' + C.green + '" stroke-width="6"/><line x1="70" y1="70" x2="150" y2="10" stroke="' + C.green + '" stroke-width="6"/><line x1="150" y1="70" x2="70" y2="10" stroke="' + C.green + '" stroke-width="6"/><rect x="80" y="0" width="60" height="12" fill="' + C.yellow + '"/>' +
      '<animateTransform attributeName="transform" type="scale" values="1 1;1 0.6;1 1" additive="sum" dur="3s" repeatCount="indefinite" /></g>' + label(110, 165, '剪叉：垂直升，較重', 11));
  }
  function elevator() {
    return svg(220, 170, '<rect x="60" y="130" width="100" height="20" rx="4" fill="' + C.body + '"/><rect x="100" y="10" width="20" height="120" fill="' + C.metalD + '"/>' +
      '<rect x="80" y="100" width="60" height="14" fill="' + C.yellow + '"><animate attributeName="y" values="100;20;100" dur="3s" repeatCount="indefinite"/></rect>' + label(110, 165, '直升導軌：準，要齒條或鏈', 11));
  }
  function catapult() {
    return svg(240, 170, '<rect x="20" y="130" width="120" height="20" rx="4" fill="' + C.body + '"/>' +
      '<g><line x1="60" y1="130" x2="150" y2="110" stroke="' + C.green + '" stroke-width="8" stroke-linecap="round"/><rect x="140" y="95" width="24" height="16" fill="' + C.yellow + '"/><animateTransform attributeName="transform" type="rotate" values="0 60 130;-50 60 130;-50 60 130;0 60 130" dur="2.5s" repeatCount="indefinite"/></g>' + label(120, 165, '投擲：橡筋儲力，黃袋上 L4', 11));
  }
  function lowVsNarrow() {
    return svg(300, 150, '<line x1="20" y1="60" x2="140" y2="60" stroke="' + C.yellow + '" stroke-width="6"/><rect x="40" y="70" width="80" height="40" fill="' + C.body + '"/>' + label(80, 130, '矮機：高 < 橫樑，鑽底', 11) +
      '<rect x="180" y="30" width="12" height="90" fill="#555"/><rect x="270" y="30" width="12" height="90" fill="#555"/><rect x="205" y="40" width="50" height="70" fill="' + C.body + '"/>' + label(230, 130, '窄機：闊 < 柱距，穿過', 11));
  }
  function alignBar() {
    return svg(240, 130, '<rect x="20" y="40" width="100" height="50" fill="' + C.body + '"/><rect x="120" y="55" width="40" height="8" fill="' + C.green + '"/><rect x="120" y="75" width="40" height="8" fill="' + C.green + '"/><rect x="165" y="20" width="12" height="90" fill="#888"/>' + label(120, 120, '對位杆：頂住 goal 邊就對準', 11));
  }
  function wiring() {
    var s = brain().replace(/<\/svg>$/, '');
    s += '<path d="M44 170 q-30 40 -20 60" fill="none" stroke="#333" stroke-width="3"/><path d="M60 170 q10 40 40 60" fill="none" stroke="#333" stroke-width="3"/>' + label(30, 240, '左摩打 Port 1', 10) + label(110, 240, '右摩打 Port 6', 10) + '</svg>';
    return s.replace('viewBox="0 0 240 185"', 'viewBox="0 0 240 250"');
  }
  window.PSVG = window.PSVG || {};
  window.PSVG.field = field; window.PSVG.pyramidSide = pyramidSide; window.PSVG.timeline = timeline; window.PSVG.claw = claw; window.PSVG.roller = roller; window.PSVG.scissor = scissor; window.PSVG.elevator = elevator; window.PSVG.catapult = catapult; window.PSVG.lowVsNarrow = lowVsNarrow; window.PSVG.alignBar = alignBar; window.PSVG.wiring = wiring;

  window.PSVG = window.PSVG || {};
  var _P = { beam: beam, plate: plate, pin: pin, pinJoin: pinJoin, corner: corner, shaft: shaft, bushing: bushing, spacer: spacer, gearSet: gearSet, gearMesh: gearMesh, wheel: wheel, rubber: rubber, pinRemover: pinRemover, brain: brain, motor: motor, battery: battery, controller: controller, sensor: sensor, cable: cable, step: step, fourBar: fourBar, cog: cog };
  Object.keys(_P).forEach(function (k) { window.PSVG[k] = _P[k]; });
})();
