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

## 常見問題
- **npm install 卡住**：確認網路連線或使用 `npm ci` 重新安裝。
- **開發伺服器無法啟動**：檢查是否有其他程式佔用 3000 埠，或在 `.env` 中調整 `VITE_PORT`。
