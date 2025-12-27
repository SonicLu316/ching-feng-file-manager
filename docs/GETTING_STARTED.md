# GETTING_STARTED

## 前置需求
- Node.js (建議 v18 或以上)
- npm (隨 Node.js 安裝)
- Git (可選，用於版本管理)

## 安裝步驟
```bash
# 1. 下載專案
git clone <repository-url>
cd ching-feng-file-manager

# 2. 安裝相依套件
npm install
```

## 開發模式
```bash
npm run dev
```
瀏覽器會自動開啟 `http://localhost:3000`，可即時看到變更。

## 建置與預覽
```bash
# 建置生產版
npm run build

# 本機預覽建置結果
npm run preview
```

## 本機開發環境設定 (Local Environment)

為了連接 API，您可以在根目錄建立 `.env.local` 檔案來覆蓋預設網址：

1. 在專案根目錄建立 `.env.local`。
2. 加入以下內容：
   ```env
   VITE_API_BASE_URL=http://localhost:8080/eip-api/api
   ```
3. 重啟開發伺服器 `npm run dev`。

## 常見問題
- **npm install 卡住**：確認網路連線或使用 `npm ci` 重新安裝。
- **開發伺服器無法啟動**：檢查是否有其他程式佔用 3000 埠，或在 `.env` 中調整 `VITE_PORT`。
