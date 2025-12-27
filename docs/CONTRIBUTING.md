# CONTRIBUTING

## 目標
讓貢獻者能快速上手本專案，遵守一致的程式碼風格與提交流程。

## 分支策略
- `main`：穩定發佈分支。
- `dev`：日常開發分支，所有新功能應先提交至此。
- 功能分支：`feature/<描述>`，完成後提交 Pull Request 合併至 `dev`。

## 提交訊息規範
```
<type>(<scope>): <subject>

<body>

<footer>
```
- **type**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **scope**: 受影響的模組或檔案
- **subject**: 簡短說明（50 字以內）
- **body**: 必要時提供更詳細說明
- **footer**: 例如 `Closes #123`

## 程式碼風格
- 使用 `eslint` + `prettier`，執行 `npm run lint` 檢查。
- TypeScript 必須開啟 `strict` 模式。

## PR 流程
1. 確保分支基於最新的 `dev`。
2. 執行 `npm run lint`，確保無錯誤。
3. 在 PR 描述中說明變更內容與測試方式。
4. 由至少一位維護者審核通過後合併。
