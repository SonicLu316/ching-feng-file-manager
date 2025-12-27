# PROCESS

### 1. 檔案上傳 (File Upload)
使用者點擊「新增檔案」進入 `/add` 頁面。

- **資料輸入**：主題、會議時間、地點 (API 下拉選單)、成員、檔案 (.mp3/.wav)。
- **資料送出**：
  - 使用 `FormData` 格式封裝所有欄位。
  - 自動計算 `到期時間` (上傳時間 + 14 天)。
  - 加入 `建立者` (當前登入 Email)。
  - 呼叫 `/add_meetingrecords_with_file` API。
- **結果處理**：
  - **成功 (status: 1)**：顯示「上傳成功」，導回列表頁。
  - **失敗 (status: 0)**：顯示後端回傳的錯誤訊息。
  - **例外**：顯示網路錯誤提示。

### 2. 檔案列表 (File List)
`FileList` 元件於 `src/components/FileList.tsx` 從 `src/api/files.ts` 取得檔案清單 (`GET /files`)。
   - 支援分頁與搜尋，使用 `react-query` 快取結果。
3. **檔案預覽與下載**
   - 點擊檔案項目觸發 `GET /files/:id`，取得檔案資訊與下載 URL。
   - 前端使用 `<a href="downloadUrl" download>` 讓使用者下載。
4. **檔案刪除**
   - 在檔案列表中點擊刪除圖示 → 呼叫 `DELETE /files/:id`。
   - 刪除成功後即時從列表中移除。
5. **權限與驗證**
   - 所有 API 請求皆攜帶 JWT Token，前端在 `src/utils/auth.ts` 中統一處理。
   - 若 token 無效或過期，導向登入頁面。

## 資料流向圖
```
User -> UI (React) -> API Service (fetch) -> Backend API -> DB
```

## 關鍵事件
- 檔案上傳成功 → 更新 UI 狀態
- 刪除失敗 → 顯示錯誤提示
- Token 失效 → 重新導向登入
