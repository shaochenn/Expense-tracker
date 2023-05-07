# Expense-Tracker

使用 Node.js 以及 Express 所建立的記帳本，提供各種紀帳本功能。

## Features - 功能描述

1. 登入系統，user需登入才能使用，並且記錄個人記帳本
2. user可以新增、瀏覽、修改、刪除記帳本
3. 在首頁看到所有支出清單的總金額
4. 根據「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和

## Environment SetUp - 環境建置

- Node.js
- "bcryptjs": "^2.4.3",
- "body-parser": "^1.20.2",
- "connect-flash": "^0.1.1",
- "dotenv": "^16.0.3",
- "express": "^4.18.2",
- "express-handlebars": "^3.0.0",
- "express-session": "^1.17.1",
- "method-override": "^3.0.0",
- "mongoose": "^5.13.17",
- "passport": "^0.4.1",
- "passport-facebook": "^3.0.0",
- "passport-local": "^1.0.0"

## Installation And Execution - 安裝與執行步驟

`npm run dev` 用此指令來執行程式
`npm run seed` 執行種子程式生成種子資料
.env.example 提供環境變數參考
