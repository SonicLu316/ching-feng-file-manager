# PROCESS

## 主要功能流程

1. **檔案上傳**
   - 使用者在 `Upload` 頁面選擇檔案 → 前端呼叫 `src/api/upload.ts` 進行 `POST /upload`。
   - 成功回傳檔案 ID，前端更新檔案列表並顯示上傳成功訊息。
2. **檔案列表顯示**
   - `FileList` 元件於 `src/components/FileList.tsx` 從 `src/api/files.ts` 取得檔案清單 (`GET /files`)。
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
