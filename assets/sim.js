/* Level Up 2D 比賽模擬器（簡化物理，用來試策略和路線，不是驗證機構）
   場地座標：吋，原點左下，X 0–97（長邊），Y 0–73。 */
(function () {
  var IN = 25.4;
  var FW = 97, FH = 73, PX = 10; // 每吋 10 px

  // ---- 場地（由 Game Manual v2.1 附錄 A 抄錄的參考值）----
  var BEAM_D = 0.84, BEAM_CLEAR = 6.25 - BEAM_D / 2; // 約 5.8 吋
  var BEAMS = [[60.5 - BEAM_D / 2, 0.5, 60.5 + BEAM_D / 2, 26.5], [36.5 - BEAM_D / 2, 46.5, 36.5 + BEAM_D / 2, 72.5]];
  var BRACKETS = [[60.0, 26.5, 61.0, 27.6], [36.0, 45.4, 37.0, 46.5]];
  var STRIPS = [[60.0, 0.5, 61.0, 39.0], [36.0, 34.0, 37.0, 72.5]];
  var PYR = { blue: [0, FH - 19.25, 19.25, FH], red: [FW - 19.25, 0, FW, 19.25] };
  var PYR_CORNER = { blue: [0, FH], red: [FW, 0] };
  var LEVELS = [[8.5, 8.0, 12, 'L3'], [14.5, 5.0, 6, 'L2'], [19.25, 2.5, 3, 'L1']];
  var L4 = [[60.5, 42.5], [36.5, 30.5]];
  var POSTS = [[60.5, 30.5], [36.5, 42.5]];
  var FLOOR = { red: [90, 18.5, FW, 54.5], blue: [0, 18.5, 7, 54.5] };
  var LOAD = { red: [0, 0, 7, 18.5], blue: [90, 54.5, FW, FH] };
  var BAG_START = {
    blue: [[84.5, 48.5], [84.5, 36.5], [84.5, 24.5], [78.5, 66.5], [66.5, 66.5], [66.5, 36.5], [66.5, 6.5], [48.5, 30.5]],
    red: [[48.5, 42.5], [30.5, 66.5], [30.5, 36.5], [30.5, 6.5], [18.5, 6.5], [12.5, 48.5], [12.5, 36.5], [12.5, 24.5]],
    yellow: [[42.5, 30.5], [42.5, 42.5], [54.5, 30.5], [54.5, 42.5]]
  };
  var COLOR = { red: '#d7263d', blue: '#2a6fdb', yellow: '#f2c200' };
  var CNAME = { red: '紅', blue: '藍', yellow: '黃' };

  // ---- 狀態 ----
  var cfg, robot, bags, queue, score, timer, running, ended, log, segs, keys, lastT, stall, pathPts, showPath;
  var canvas = document.getElementById('field'), ctx = canvas.getContext('2d');
  canvas.width = FW * PX; canvas.height = FH * PX;
  var audio = null;

  function beep(freq, ms) {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      var o = audio.createOscillator(), g = audio.createGain();
      o.frequency.value = freq; o.connect(g); g.connect(audio.destination);
      g.gain.value = 0.15; o.start(); o.stop(audio.currentTime + ms / 1000);
    } catch (e) {}
  }

  function readCfg() {
    var g = function (id) { return parseFloat(document.getElementById(id).value) || 0; };
    cfg = {
      mode: document.getElementById('mode').value,
      team: document.getElementById('team').value,
      w: g('cw') / IN, l: g('cl') / IN, h: g('ch') / IN, reach: g('creach') / IN,
      lift: g('clift') / IN, speed: g('cspeed') / IN, turn: g('cturn')
    };
    try { localStorage.setItem('vexiq-sim-cfg', JSON.stringify({ mode: cfg.mode, team: cfg.team, cw: g('cw'), cl: g('cl'), ch: g('ch'), creach: g('creach'), clift: g('clift'), cspeed: g('cspeed'), cturn: g('cturn') })); } catch (e) {}
  }
  function loadCfg() {
    try {
      var s = JSON.parse(localStorage.getItem('vexiq-sim-cfg') || 'null');
      if (!s) return;
      Object.keys(s).forEach(function (k) { var el = document.getElementById(k); if (el) el.value = s[k]; });
    } catch (e) {}
  }

  function reset() {
    readCfg();
    bags = [];
    Object.keys(BAG_START).forEach(function (c) { BAG_START[c].forEach(function (p) { bags.push({ color: c, x: p[0], y: p[1], state: 'field' }); }); });
    if (cfg.mode === 'skills') {
      queue = { red: ['red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue'], blue: [] };
      robot = { x: 48.5, y: 10, th: Math.PI / 2, bag: null };
      cfg.team = 'red';
    } else {
      queue = { red: ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red'], blue: ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'] };
      robot = cfg.team === 'red' ? { x: 48.5, y: 63, th: -Math.PI / 2, bag: null } : { x: 48.5, y: 10, th: Math.PI / 2, bag: null };
    }
    // 預載一個黃袋
    robot.bag = { color: 'yellow', x: 0, y: 0, state: 'carried' };
    score = { floor: 0, L1: 0, L2: 0, L3: 0, L4: 0, total: 0, cycles: 0, last: 0 };
    timer = 60; running = false; ended = false; stall = 0; log = []; segs = []; pathPts = [];
    keys = {}; lastT = null;
    updateHud(); renderActions(); draw();
    document.getElementById('summary').style.display = 'none';
    document.getElementById('log').textContent = '按方向鍵或按鈕開始，計時自動開始。';
  }

  // ---- 幾何 ----
  function corners(r) {
    var c = Math.cos(r.th), s = Math.sin(r.th), hl = cfg.l / 2, hw = cfg.w / 2;
    return [[hl, hw], [hl, -hw], [-hl, -hw], [-hl, hw]].map(function (p) {
      return [r.x + p[0] * c - p[1] * s, r.y + p[0] * s + p[1] * c];
    });
  }
  function inRect(p, R) { return p[0] >= R[0] && p[0] <= R[2] && p[1] >= R[1] && p[1] <= R[3]; }
  function samplePerimeter(r) {
    var cs = corners(r), pts = [];
    for (var i = 0; i < 4; i++) {
      var a = cs[i], b = cs[(i + 1) % 4];
      var n = Math.max(2, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 1.5));
      for (var k = 0; k <= n; k++) pts.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
    }
    return pts;
  }
  function circleHitsRobot(r, cx, cy, rad) {
    var c = Math.cos(-r.th), s = Math.sin(-r.th);
    var dx = cx - r.x, dy = cy - r.y;
    var lx = dx * c - dy * s, ly = dx * s + dy * c;
    var qx = Math.max(Math.abs(lx) - cfg.l / 2, 0), qy = Math.max(Math.abs(ly) - cfg.w / 2, 0);
    return Math.hypot(qx, qy) < rad;
  }
  function collides(r) {
    var pts = samplePerimeter(r);
    var rects = [PYR.red, PYR.blue].concat(BRACKETS);
    if (cfg.h >= BEAM_CLEAR) rects = rects.concat(BEAMS);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      if (p[0] < 0 || p[0] > FW || p[1] < 0 || p[1] > FH) return true;
      for (var j = 0; j < rects.length; j++) if (inRect(p, rects[j])) return true;
    }
    for (var k = 0; k < L4.length; k++) if (circleHitsRobot(r, L4[k][0], L4[k][1], 0.9)) return true;
    for (var m = 0; m < POSTS.length; m++) if (circleHitsRobot(r, POSTS[m][0], POSTS[m][1], 2.0)) return true;
    return false;
  }
  function frontPoint(r, extra) {
    var d = cfg.l / 2 + (extra || 0);
    return [r.x + Math.cos(r.th) * d, r.y + Math.sin(r.th) * d];
  }

  // ---- 動作 ----
  function addLog(t) {
    log.push((60 - timer).toFixed(1) + 's ' + t);
    var el = document.getElementById('log');
    el.textContent = log.join('\n'); el.scrollTop = el.scrollHeight;
  }
  function flushSeg() {
    if (!segs.length) return;
    var s = segs[segs.length - 1];
    if (s.type === 'drive' && !s.done) { s.done = true; addLog((s.v >= 0 ? '前進 ' : '後退 ') + Math.round(Math.abs(s.v) * IN) + ' mm'); }
    if (s.type === 'turn' && !s.done) { s.done = true; addLog((s.v >= 0 ? '左轉 ' : '右轉 ') + Math.round(Math.abs(s.v)) + '°'); }
  }
  function track(type, dv) {
    var s = segs[segs.length - 1];
    if (!s || s.type !== type || s.done) { flushSeg(); s = { type: type, v: 0, done: false }; segs.push(s); }
    s.v += dv;
  }

  function pickOrDrop() {
    if (ended) return;
    start();
    flushSeg();
    if (robot.bag) { drop(); return; }
    var fp = frontPoint(robot, Math.max(2, cfg.reach));
    var best = null, bd = 8;
    bags.forEach(function (b) {
      if (b.state !== 'field') return;
      var d = Math.hypot(b.x - fp[0], b.y - fp[1]);
      if (d < bd) { bd = d; best = b; }
    });
    if (!best) { addLog('拾取失敗：前方 20 cm 內沒有豆袋'); beep(200, 120); return; }
    best.state = 'carried'; robot.bag = best;
    addLog('拾取 ' + CNAME[best.color] + '袋');
  }
  function levelAt(color, p) {
    if (!inRect(p, PYR[color])) return null;
    var c = PYR_CORNER[color], d = Math.max(Math.abs(p[0] - c[0]), Math.abs(p[1] - c[1]));
    for (var i = 0; i < LEVELS.length; i++) if (d <= LEVELS[i][0]) return LEVELS[i];
    return LEVELS[2];
  }
  function drop() {
    var b = robot.bag; var sp = frontPoint(robot, cfg.reach);
    var res = null;
    for (var i = 0; i < L4.length; i++) {
      if (Math.hypot(sp[0] - L4[i][0], sp[1] - L4[i][1]) <= 3.5) {
        if (b.color !== 'yellow') { addLog('L4 只收黃袋，放不入'); beep(200, 120); return; }
        if (cfg.lift < 24) { addLog('升降高度不夠 L4（需 ≥ 610 mm）'); beep(200, 120); return; }
        res = ['L4', 16];
      }
    }
    if (!res) ['red', 'blue'].forEach(function (c) {
      var lv = levelAt(c, sp);
      if (lv) {
        if (b.color !== c && b.color !== 'yellow') { res = ['bad', c]; return; }
        if (cfg.lift < lv[1] + 1) { res = ['low', lv]; return; }
        res = [lv[3], lv[2]];
      }
    });
    if (!res) ['red', 'blue'].forEach(function (c) {
      if (inRect(sp, FLOOR[c])) res = (b.color === c || b.color === 'yellow') ? ['floor', 1] : ['bad', c];
    });
    if (res && res[0] === 'bad') { addLog('顏色不對：' + CNAME[b.color] + '袋不可入' + CNAME[res[1]] + '色 goal'); beep(200, 120); return; }
    if (res && res[0] === 'low') { addLog('升降高度不夠 ' + res[1][3] + '（需 ≥ ' + Math.round((res[1][1] + 1) * IN) + ' mm）'); beep(200, 120); return; }
    robot.bag = null;
    if (res) {
      b.state = 'scored';
      score[res[0]]++; score.total += res[1]; score.cycles++;
      var now = 60 - timer;
      addLog('入 ' + (res[0] === 'floor' ? 'Floor Goal' : res[0]) + ' +' + res[1] + ' 分（此循環 ' + (now - score.last).toFixed(1) + ' 秒）');
      score.last = now; beep(880, 120);
    } else {
      b.state = 'field'; b.x = sp[0]; b.y = sp[1];
      addLog('放在地上（未得分）');
    }
    updateHud();
  }
  function load(zone) {
    if (ended) return;
    start();
    if (!queue[zone].length) { addLog(CNAME[zone] + ' Load Zone 已無豆袋'); return; }
    var Z = LOAD[zone];
    var occupied = bags.some(function (b) { return b.state === 'field' && inRect([b.x, b.y], Z); });
    if (occupied) { addLog('Load Zone 仍有豆袋，要先拿走才可再入'); beep(200, 120); return; }
    var c = queue[zone].shift();
    bags.push({ color: c, x: (Z[0] + Z[2]) / 2, y: (Z[1] + Z[3]) / 2, state: 'field' });
    addLog('入袋：' + CNAME[c] + '袋放入 ' + CNAME[zone] + ' Load Zone');
    renderActions();
  }

  function start() { if (!running && !ended) { running = true; lastT = null; requestAnimationFrame(tick); } }

  function tick(ts) {
    if (!running) return;
    if (lastT == null) lastT = ts;
    var dt = Math.min(0.05, (ts - lastT) / 1000); lastT = ts;
    timer -= dt;
    if (timer <= 25 && timer + dt > 25) beep(660, 300);
    if (timer <= 35 && timer + dt > 35) beep(660, 300);
    if (timer <= 0) { timer = 0; finish(); return; }

    var v = (keys.f ? 1 : 0) - (keys.b ? 1 : 0);
    var w = (keys.l ? 1 : 0) - (keys.r ? 1 : 0);
    if (v) {
      var d = v * cfg.speed * dt;
      var nr = { x: robot.x + Math.cos(robot.th) * d, y: robot.y + Math.sin(robot.th) * d, th: robot.th };
      if (!collides(nr)) { robot.x = nr.x; robot.y = nr.y; track('drive', d); stall = 0; pathPts.push([robot.x, robot.y]); }
      else stall += dt;
    }
    if (w) {
      var dth = w * cfg.turn * Math.PI / 180 * dt;
      var nr2 = { x: robot.x, y: robot.y, th: robot.th + dth };
      if (!collides(nr2)) { robot.th = nr2.th; track('turn', w * cfg.turn * dt); stall = 0; }
      else stall += dt;
    }
    if (!v && !w) flushSeg();
    updateHud(); draw();
    requestAnimationFrame(tick);
  }

  function finish() {
    running = false; ended = true; flushSeg();
    addLog('時間到。總分 ' + score.total);
    beep(440, 600);
    updateHud(); draw();
    var s = document.getElementById('summary');
    var avg = score.cycles ? (60 / score.cycles).toFixed(1) : '—';
    s.style.display = 'block';
    s.innerHTML = '<h3>本局結果</h3><div class="kv">' +
      '<b>總分</b><span>' + score.total + '</span>' +
      '<b>得分次數</b><span>' + score.cycles + '（平均每次 ' + avg + ' 秒）</span>' +
      '<b>Floor／L1／L2／L3／L4</b><span>' + score.floor + '／' + score.L1 + '／' + score.L2 + '／' + score.L3 + '／' + score.L4 + '</span>' +
      '<b>機器</b><span>' + Math.round(cfg.w * IN) + '×' + Math.round(cfg.l * IN) + '×' + Math.round(cfg.h * IN) + ' mm，升降 ' + Math.round(cfg.lift * IN) + ' mm，速度 ' + Math.round(cfg.speed * IN) + ' mm/s' + (cfg.h < BEAM_CLEAR ? '（可鑽橫樑）' : '') + '</span>' +
      '</div><div class="btnrow"><button class="btn yellow" id="copy-res">複製結果和路線記錄</button></div>';
    document.getElementById('copy-res').addEventListener('click', function () {
      var text = 'Level Up 模擬器 ' + new Date().toLocaleString('zh-HK') + '\n模式：' + (cfg.mode === 'skills' ? 'Skills' : 'Teamwork ' + CNAME[cfg.team] + '隊') +
        '\n總分 ' + score.total + '，得分 ' + score.cycles + ' 次，平均 ' + avg + ' 秒/次\nFloor ' + score.floor + ' L1 ' + score.L1 + ' L2 ' + score.L2 + ' L3 ' + score.L3 + ' L4 ' + score.L4 +
        '\n機器 ' + Math.round(cfg.w * IN) + '×' + Math.round(cfg.l * IN) + '×' + Math.round(cfg.h * IN) + ' mm，伸出 ' + Math.round(cfg.reach * IN) + ' mm，升降 ' + Math.round(cfg.lift * IN) + ' mm，速度 ' + Math.round(cfg.speed * IN) + ' mm/s' +
        '\n--- 路線記錄 ---\n' + log.join('\n');
      VQ.copyText(text, this);
    });
  }

  // ---- HUD ----
  function updateHud() {
    document.getElementById('hud-time').textContent = timer.toFixed(1);
    document.getElementById('hud-score').textContent = score.total;
    document.getElementById('hud-cycles').textContent = score.cycles;
    var sw = document.getElementById('hud-switch');
    var inSwitch = running && timer <= 35 && timer >= 25;
    sw.style.display = inSwitch ? 'inline-block' : 'none';
    document.getElementById('hud-bag').textContent = robot.bag ? CNAME[robot.bag.color] + '袋' : '空';
    document.getElementById('hud-stall').style.display = stall > 0.3 ? 'inline-block' : 'none';
    document.getElementById('btn-pick').textContent = robot.bag ? '放' : '拾';
  }
  function renderActions() {
    var el = document.getElementById('loaders');
    if (cfg.mode === 'skills') el.innerHTML = '<button class="load" data-zone="red">入袋 (' + queue.red.length + ')</button>';
    else el.innerHTML = '<button class="load" data-zone="red">紅入袋 (' + queue.red.length + ')</button><button class="load" data-zone="blue">藍入袋 (' + queue.blue.length + ')</button>';
  }

  // ---- 畫圖 ----
  function X(x) { return x * PX; } function Y(y) { return (FH - y) * PX; }
  function rect(R, fill, stroke) {
    ctx.fillStyle = fill; ctx.fillRect(X(R[0]), Y(R[3]), (R[2] - R[0]) * PX, (R[3] - R[1]) * PX);
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.strokeRect(X(R[0]), Y(R[3]), (R[2] - R[0]) * PX, (R[3] - R[1]) * PX); }
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 地墊
    ctx.fillStyle = '#cfd4db'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#b9bfc8'; ctx.lineWidth = 1;
    for (var gx = 6.5; gx < FW; gx += 12) { ctx.beginPath(); ctx.moveTo(X(gx), 0); ctx.lineTo(X(gx), canvas.height); ctx.stroke(); }
    for (var gy = 6.5; gy < FH; gy += 12) { ctx.beginPath(); ctx.moveTo(0, Y(gy)); ctx.lineTo(canvas.width, Y(gy)); ctx.stroke(); }
    // goal 區
    rect(FLOOR.red, 'rgba(215,38,61,.25)', COLOR.red); rect(FLOOR.blue, 'rgba(42,111,219,.25)', COLOR.blue);
    rect(LOAD.red, 'rgba(215,38,61,.12)', COLOR.red); rect(LOAD.blue, 'rgba(42,111,219,.12)', COLOR.blue);
    ctx.font = '12px sans-serif'; ctx.fillStyle = '#333';
    ctx.fillText('紅 Floor', X(90.5), Y(36)); ctx.fillText('藍 Floor', X(0.5), Y(36));
    ctx.fillText('紅 Load', X(0.5), Y(9)); ctx.fillText('藍 Load', X(90.5), Y(63));
    // 金字塔
    ['red', 'blue'].forEach(function (c) {
      var k = PYR_CORNER[c];
      [[19.25, .35], [14.5, .55], [8.5, .8]].forEach(function (lv) {
        var R = c === 'red' ? [k[0] - lv[0], k[1], k[0], k[1] + lv[0]] : [k[0], k[1] - lv[0], k[0] + lv[0], k[1]];
        rect(R, c === 'red' ? 'rgba(215,38,61,' + lv[1] + ')' : 'rgba(42,111,219,' + lv[1] + ')', '#fff');
      });
      ctx.fillStyle = '#fff'; ctx.font = 'bold 11px sans-serif';
      var lx = c === 'red' ? k[0] - 18 : k[0] + 10, ly = c === 'red' ? k[1] + 16 : k[1] - 14;
      ctx.fillText('L1', X(lx), Y(ly));
      ctx.fillText('L2', X(c === 'red' ? k[0] - 13 : k[0] + 9.5), Y(c === 'red' ? k[1] + 11 : k[1] - 10));
      ctx.fillText('L3', X(c === 'red' ? k[0] - 7.5 : k[0] + 4), Y(c === 'red' ? k[1] + 5 : k[1] - 5));
    });
    // 地面斜條、支架、橫樑
    STRIPS.forEach(function (R) { rect(R, '#8e949e'); });
    BRACKETS.forEach(function (R) { rect(R, '#f2c200', '#9a7b00'); });
    BEAMS.forEach(function (R) { rect(R, cfg.h >= BEAM_CLEAR ? '#f2c200' : 'rgba(242,194,0,.45)', '#9a7b00'); });
    ctx.fillStyle = '#6b5300'; ctx.font = '11px sans-serif';
    ctx.fillText(cfg.h >= BEAM_CLEAR ? '橫樑（太高，不可鑽）' : '橫樑（可鑽過）', X(62), Y(14));
    ctx.fillText(cfg.h >= BEAM_CLEAR ? '橫樑（太高，不可鑽）' : '橫樑（可鑽過）', X(14), Y(60));
    // 支柱、L4
    POSTS.forEach(function (p) { ctx.fillStyle = '#555'; ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]), 2 * PX, 0, 7); ctx.fill(); });
    L4.forEach(function (p) {
      ctx.fillStyle = 'rgba(242,194,0,.9)'; ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]), 3.5 * PX, 0, 7); ctx.fill();
      ctx.fillStyle = '#333'; ctx.font = 'bold 12px sans-serif'; ctx.fillText('L4', X(p[0]) - 8, Y(p[1]) + 4);
    });
    // 路線
    if (showPath && pathPts.length > 1) {
      ctx.strokeStyle = 'rgba(20,33,61,.6)'; ctx.lineWidth = 2; ctx.beginPath();
      ctx.moveTo(X(pathPts[0][0]), Y(pathPts[0][1]));
      for (var i = 1; i < pathPts.length; i++) ctx.lineTo(X(pathPts[i][0]), Y(pathPts[i][1]));
      ctx.stroke();
    }
    // 豆袋
    bags.forEach(function (b) {
      if (b.state !== 'field') return;
      ctx.fillStyle = COLOR[b.color]; ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
      ctx.fillRect(X(b.x - 2), Y(b.y + 1.5), 4 * PX, 3 * PX); ctx.strokeRect(X(b.x - 2), Y(b.y + 1.5), 4 * PX, 3 * PX);
    });
    // 機器
    var cs = corners(robot);
    ctx.fillStyle = 'rgba(20,33,61,.85)'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(cs[0][0]), Y(cs[0][1]));
    for (var j = 1; j < 4; j++) ctx.lineTo(X(cs[j][0]), Y(cs[j][1]));
    ctx.closePath(); ctx.fill(); ctx.stroke();
    // 前端標記
    var fp = frontPoint(robot, 0), sp = frontPoint(robot, cfg.reach);
    ctx.strokeStyle = '#fca311'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(fp[0]), Y(fp[1])); ctx.lineTo(X(sp[0]), Y(sp[1])); ctx.stroke();
    ctx.fillStyle = robot.bag ? COLOR[robot.bag.color] : '#fca311';
    ctx.beginPath(); ctx.arc(X(sp[0]), Y(sp[1]), robot.bag ? 1.8 * PX : 1 * PX, 0, 7); ctx.fill();
    if (stall > 0.3) { ctx.fillStyle = '#d7263d'; ctx.font = 'bold 14px sans-serif'; ctx.fillText('卡住', X(robot.x) - 14, Y(robot.y) - 14); }
  }

  // ---- 輸入 ----
  var KEYMAP = { ArrowUp: 'f', KeyW: 'f', ArrowDown: 'b', KeyS: 'b', ArrowLeft: 'l', KeyA: 'l', ArrowRight: 'r', KeyD: 'r' };
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
    var k = KEYMAP[e.code];
    if (k) { keys[k] = true; start(); e.preventDefault(); }
    if (e.code === 'Space') { pickOrDrop(); e.preventDefault(); }
    if (e.code === 'KeyL') { load('red'); e.preventDefault(); }
    if (e.code === 'KeyK' && cfg.mode !== 'skills') { load('blue'); e.preventDefault(); }
  });
  document.addEventListener('keyup', function (e) { var k = KEYMAP[e.code]; if (k) keys[k] = false; });

  document.querySelectorAll('.pad button[data-k]').forEach(function (b) {
    var k = b.getAttribute('data-k');
    var on = function (e) { e.preventDefault(); keys[k] = true; b.classList.add('on'); start(); };
    var off = function (e) { e.preventDefault(); keys[k] = false; b.classList.remove('on'); };
    b.addEventListener('pointerdown', on); b.addEventListener('pointerup', off);
    b.addEventListener('pointercancel', off); b.addEventListener('pointerleave', off);
    b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  });
  document.getElementById('btn-pick').addEventListener('click', pickOrDrop);
  document.getElementById('loaders').addEventListener('click', function (e) {
    var z = e.target.getAttribute('data-zone'); if (z) load(z);
  });
  document.getElementById('btn-reset').addEventListener('click', reset);
  document.getElementById('btn-apply').addEventListener('click', reset);
  document.getElementById('mode').addEventListener('change', function () {
    document.getElementById('team').disabled = this.value === 'skills';
  });
  document.getElementById('show-path').addEventListener('change', function () { showPath = this.checked; draw(); });

  loadCfg();
  document.getElementById('team').disabled = document.getElementById('mode').value === 'skills';
  showPath = document.getElementById('show-path').checked;
  reset();
  window.SIM = { reset: reset, state: function () { return { robot: robot, score: score, timer: timer, bags: bags, cfg: cfg }; }, keys: function (k, v) { keys[k] = v; start(); }, pickOrDrop: pickOrDrop, load: load };
})();
