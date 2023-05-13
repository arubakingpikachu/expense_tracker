# 家計簿

## 功能
1. 在首頁瀏覽所有支出的項目、金額、類別、日期。
2. 使用者可新增支出資料。
3. 使用者可以修改各支出的資訊。
5. 使用者可以利用下拉式選單篩選支出類別。
6. 使用者能刪除任一支出條目。
7. 使用者可註冊帳號。
8. 使用者可登入帳號，瀏覽、新增、刪除、修改帳號中餐廳資料。
9. 使用者可使用facebook第三方登入。

## 安裝步驟
1. 確認已安裝npm、node.js、nodemon 。
2. 在終端機clone本專案。
```
git clone https://github.com/arubakingpikachu/expense_tracker.git
```
3. 透過終端機打開expense_tracker資料夾，輸入：
```
npm install
```
以安裝相關套件
4. 輸入:
```
npm run seed
```
以設定種子資料(示範帳號請參下方)。
5. 以上開發工具安裝完畢後，輸入：
```
npm run dev
```
以開啟伺服器。
6. 若見到以下訊息，即代表執行成功：
```
Express is listening on localhost:3000
mongodb connected!

```

7. 在瀏覽器輸入http://localhost:3000，即可查看網站。
8. 若欲暫停使用，在終端機輸入ctrl+c即可。





## 開發工具
* Node.js v18.15.0
* express v4.16.4
* express-handlebars v3.0.0
* mongoose v5.9.7
* method-override v3.0.0
* Bootstrap v5.1.3
* dotenv v16.0.3
* bcryptjs v2.4.3
* connect-flash v0.1.1
* express-session v1.17.1
* passport v0.4.1
* passport-facebook v3.0.0
* passport-local v1.0.0

## 示範帳號
* user1
email=user1@example.com
password=12345678
    
