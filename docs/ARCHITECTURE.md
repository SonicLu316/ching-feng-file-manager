# ARCHITECTURE

## 專案目錄概覽
```
ching-feng-file-manager/
├─ src/
│  ├─ components/   # React 元件
│  ├─ App.tsx       # 主應用程式元件
│  └─ index.tsx    # 入口點
├─ public/
│  └─ index.html   # HTML 模板
├─ assets/          # 靜態資源
├─ vite.config.ts   # Vite 設定
└─ package.json     # npm 套件資訊
```

## 前端技術棧
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (圖示庫)

## 主要套件說明
| 套件 | 目的 |
|------|------|
| react | UI 框架 |
| react-dom | DOM 渲染 |
| vite | 開發伺服器與建置 |
| tailwindcss | 樣式系統 |
| lucide-react | 圖示 |
| eslint / prettier | 程式碼品質 |

## 環境變數與配置 (Environment Configuration)

本專案使用 Vite 的環境變數管理機制：

- **`.env.development`**: 本機開發連線設定。
- **`.env.production`**: 正式環境連線設定。
- **`.env.local`**: 本機私用設定（建議放入 `VITE_API_BASE_URL` 進行測試）。

### 關鍵變數
- `VITE_API_BASE_URL`: API 的連線基底網址。程式碼中透過 `import.meta.env.VITE_API_BASE_URL` 讀取。

> [!NOTE]
> 只有以 `VITE_` 開頭的變數才會被暴露給前端代碼。

## 後端 / API 互動方式
目前前端專案透過 `src/api/` 目錄下的服務進行資料交換，底層使用 `fetch` 搭配全域 `config.ts` 中的 `API_BASE_URL`。
