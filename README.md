# VEX IQ Level Up 自學課程（2026–27 賽季）

學校 VEX IQ 隊的自學網頁：十節課由規則到比賽，舊生帶、新生做，附比賽模擬器、設計計算器、計分器和計時器。純靜態網頁，手機和電腦都可用，不需要伺服器。

## 頁面

| 頁 | 用途 |
|---|---|
| `index.html` | 課程地圖、隊規、整體進度、進度匯出 |
| `lesson.html?id=1`…`10`、`id=t1`…`t8` | 比賽課程（階段 6–7）和老師路線：目標、做甚麼（剔選）、交甚麼、可填的範本（規則卡／規格表／方案比較表／測試表／迭代表）、反思 |
| `guide.html?id=s0-1`…`s5-4` | 階段 0–5 圖文自學課：示意圖、動手、檢查點、做錯了、卡住了、舊生驗收碼解鎖；階段 3 連官方 Flop 圖紙 |
| `sim.html` | Level Up 2D 比賽模擬器：駕駛、拾放、計分、60 秒計時、換手提示、路線記錄 |
| `calc.html` | 設計計算器：速度（齒比、輪徑）、尺寸檢查、摩打上限、升降高度 |
| `tools.html` | 計分器（1／3／6／12／16）和 60 秒計時器（35／25 秒換手提示） |
| `resources.html` | 官方資源、香港比賽、砌機參考、比賽日清單和流程 |
| `rules.html` | 繁中規則摘要（每條一句＋條號），可搜尋 |
| `glossary.html` | 中英術語表（零件、比賽、砌機） |
| `teacher.html` | 老師區（不在導航出現）：老師路徑 8 節、評核量表、庫存表、時間表、每節檢查重點 |

## 課程結構

階段 0 入門 → 1 基本功 → 2 認識比賽 → 3 照圖砌 Flop → 4 程式 → 5 機構與改裝 → 6 比賽設計（比賽課程 1–9）→ 7 比賽與迭代（比賽課程 10）。老師路線 8 節並行。

階段 0–5 在 `assets/guide-data.js`（含驗收碼和缺件替代表），比賽課程在 `assets/lessons.js`，老師路徑在 `assets/lessons-prep.js`，範本在 `assets/templates.js`，改這兩個檔就可以改課程。

## 實物相

`images/<節id>/<名稱>.jpg` 存在就會自動顯示在示意圖下方（例如 `images/s1-1/beam.jpg`）。名稱見 `assets/guide-data.js` 每節的 `img` 欄。

## 部署

GitHub Pages：Settings → Pages → Source 選 `main` 分支根目錄，網址為 `https://edwardyungch.github.io/vexiq/`。
或接 Cloudflare Pages，Build command 留空，Output directory 填 `/`。

## 規則依據

Level Up Game Manual v2.1（2026-10-08）。場地尺寸參考值由附錄 A 抄錄（參考 [thejake/vexiq-levelup-sim](https://github.com/thejake/vexiq-levelup-sim)，MIT），學生必須到實場核對。Game Manual 更新時：改 `assets/templates.js` 的規則卡答案、`tools.html` 的分數表、`assets/sim.js` 的場地常數。

## 本機測試

直接開 `index.html` 即可；或 `python -m http.server 8000` 後開 `http://localhost:8000`。
