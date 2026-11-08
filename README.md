# 英語階梯 English Path

分級英語學習網站：六個階段（國小低/中/高年級、國中、高中、托福）的單字卡、詞庫搜尋、動態單字/文法測驗。

## 專案結構

```
src/
  data/
    vocab/
      elem1.js      國小低年級單字（98 字）
      elem2.js      國小中年級單字（114 字）
      elem3.js      國小高年級單字（112 字）
      middle.js     國中單字（1200 字）
      high.js       高中單字（1614 字，持續擴充中）
      toefl.js      托福單字（12 字）
      index.js      彙整所有單字 + LEVELS 定義
    quiz.js         文法測驗題庫（含中文翻譯）
  components/       共用元件（SpeakButton、SpeedControl、LevelPath、LevelTabs）
  pages/            四個主要頁面（Home、Learn、Bank、Quiz）
  utils/speech.js   語音播放 + 動態單字測驗出題邏輯
  theme.js          顏色設計變數
  App.jsx           主要框架（導覽列、語速控制列）
  main.jsx          React 進入點
```

## 本機開發

```bash
npm install
npm run dev
```

會啟動本機開發伺服器（通常是 http://localhost:5173），存檔會自動重整畫面。

## 建置正式版本

```bash
npm run build
```

輸出會在 `dist/` 資料夾，這就是要上傳到 GitHub Pages 的內容。

## 部署到 GitHub Pages

### 方法一：自動部署（建議）

專案已包含 `.github/workflows/deploy.yml`。步驟：

1. 把整個專案 push 到 GitHub 的 `main` 分支。
2. 到 repo 的 **Settings → Pages**，把 **Source** 設定為 **GitHub Actions**。
3. 之後每次 push 到 `main`，GitHub Actions 就會自動建置並更新網站。

### 方法二：手動部署

```bash
npm run build
# 把 dist/ 資料夾的內容推到 gh-pages 分支或設定的發布目錄
```

## 注意事項

- **`vite.config.js` 的 `base` 設定**：目前設為 `'./'`（相對路徑），適用於大多數 GitHub Pages 專案網站（`username.github.io/repo-name/`）。如果部署到自訂網域，通常也可以保持不變。
- **新增單字**：只要編輯對應階段的檔案，例如要擴充高中單字就編輯 `src/data/vocab/high.js`，格式為：
  ```js
  { word: "example", phon: "ig-ZAM-puhl", pos: "n.", meaning: "例子", example: "This is an example." }
  ```
- **單字測驗是動態出題**：不需要另外維護測驗題庫，會自動從對應階段的單字庫隨機抽題（每次 8 題），選項的中文意思會自動當作干擾項。
- **文法測驗**：題庫在 `src/data/quiz.js`，每題都有 `zh` 欄位存放完整句子的中文翻譯，答題後會顯示。
