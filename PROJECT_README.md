# Ching Feng File Manager (慶風檔案管理系統)

這是一個基於 **React** 和 **TypeScript** 的檔案管理系統前端專案，使用 **Vite** 作為建置工具，並搭配 **Tailwind CSS** 進行樣式設計。

## 技術棧 (Tech Stack)

*   **框架**: [React 19](https://react.dev/)
*   **語言**: [TypeScript](https://www.typescriptlang.org/)
*   **建置工具**: [Vite](https://vitejs.dev/)
*   **樣式**: [Tailwind CSS](https://tailwindcss.com/) + PostCSS
*   **路由**: [React Router DOM](https://reactrouter.com/)
*   **圖標**: [Lucide React](https://lucide.dev/)

## 專案結構 (Project Structure)

```
ching-feng-file-manager/
├── public/                 # 靜態資源
├── src/
│   ├── api/                # API 請求模組
│   │   ├── auth.ts         # 登入相關 API
│   │   ├── files.ts        # 檔案列表與下載 API
│   │   ├── locations.ts    #地點相關 API
│   │   ├── upload.ts       # 上傳相關 API
│   │   └── index.ts        # API 基礎設定 (Axios instance)
│   ├── components/         # 共用元件
│   │   ├── CustomDialog.tsx # 自定義對話框 (Alert/Confirm)
│   │   ├── FormGroup.tsx   # 表單群組元件
│   │   └── LogoIcon.tsx    # Logo 圖示
│   ├── context/            #全域狀態 Context
│   │   └── DialogContext.tsx # 對話框 Context
│   ├── layouts/            # 頁面佈局
│   │   └── MainLayout.tsx  # 主版面配置 (含側邊欄/導航)
│   ├── pages/              # 頁面元件
│   │   ├── LoginPage.tsx   # 登入頁
│   │   ├── FilesPage.tsx   # 檔案列表/查詢/下載頁
│   │   └── AddFilePage.tsx # 新增檔案/上傳頁
│   ├── router/             # 路由設定
│   ├── App.tsx             # 應用程式入口
│   ├── index.css           # 全域樣式 (Tailwind imports)
│   ├── config.ts           # 環境變數與設定
│   ├── constants.ts        # 常數定義
│   └── types.ts            # TypeScript 型別定義
├── .env.*                  #環境變數檔 (development, production, local)
├── index.html              # HTML 入口
├── package.json            # 專案依賴與腳本
├── tailwind.config.cjs     # Tailwind 設定
├── tsconfig.json           # TypeScript 設定
└── vite.config.ts          # Vite 設定
```

## 功能模組 (Features)

### 1. 登入系統 (Authentication)
*   **LoginPage**: 提供使用者登入介面。
*   使用 `api/auth.ts` 進行驗證。

### 2. 檔案管理 (File Management)
*   **FilesPage**:
    *   **搜尋**: 支援依「主題」、「開始時間」、「結束時間」進行篩選。
    *   **列表**: 顯示會議記錄列表，包含狀態圖示 (等待處理、處理中、已完成、失敗)。
    *   **下載**: 支援單檔下載與批次下載 (多選)。
    *   **分頁**: 支援自訂每頁筆數與分頁切換。
    *   **狀態輪詢**: 下載時會輪詢後端狀態，直到檔案生成完畢 (支援 Status: 0=失敗, 1=成功, 2=處理中, 3=等待中)。

### 3. 新增檔案 (Add Record)
*   **AddFilePage**:
    *   填寫會議記錄表單 (主題、時間、地點等)。
    *   上傳相關附件。
    *   送出後進入處理流程。

### 4. 系統提示 (System Feedback)
*   **CustomDialog**: 統一的彈出視窗介面，用於顯示 成功、失敗、警示 或 確認 訊息。

## 可用腳本 (Scripts)

在專案根目錄執行以下指令：

*   `npm run dev`: 啟動開發伺服器 (Development Server)。
*   `npm run build`: 建置生產版本 (Production Build)。
*   `npm run preview`: 預覽生產版本 (Preview Build)。

## 安裝與執行 (Setup)

1.  安裝依賴 (Install dependencies):
    ```bash
    npm install
    ```
2.  啟動開發環境 (Start dev server):
    ```bash
    npm run dev
    ```

## 備註 (Notes)
*   下載功能依賴後端異步處理，前端透過 UUID 輪詢狀態。
*   專案使用 `lucide-react` 作為主要圖標庫。
