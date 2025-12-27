# Ching Feng File Manager

這是一個基於 React、TypeScript 和 Vite 的檔案管理系統前端專案。

## 專案設定

### 必要條件

- Node.js (建議 v18 或更高版本)
- npm (Node.js 內建)

### 安裝依賴

首次下載專案後，請執行以下指令安裝所有依賴套件：

```bash
npm install
```

## 開發

### 啟動開發伺服器

```bash
npm run dev
```

伺服器預設會在 `http://localhost:3000` 啟動 (或依據終端機顯示的埠號)。

### 建置生產版本

```bash
npm run build
```

建置後的檔案位於 `dist` 資料夾。

### 預覽生產版本

```bash
npm run preview
```

## 專案結構

- `src/`: 原始碼
  - `components/`: React 元件
  - `index.tsx`: 應用程式進入點
  - `App.tsx`: 主應用程式元件
- `public/`: 靜態資源
- `index.html`: 指定的 HTML 模板

## 文件

- [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [PROCESS.md](docs/PROCESS.md)
- [GETTING_STARTED.md](docs/GETTING_STARTED.md)
- [CONTRIBUTING.md](docs/CONTRIBUTING.md)


## 技術棧

- React 19
- TypeScript
- Vite
- Tailwind CSS (樣式處理)
- Lucide React (圖示庫)
