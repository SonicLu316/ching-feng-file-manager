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

## 後端或 API
目前此前端專案僅與假想的後端 API 互動，主要使用 `fetch` 於 `src/api/*.ts` 中封裝。
