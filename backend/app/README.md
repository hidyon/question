# Question API backend server 
アンケートアプリケーション用のデータ管理を主目的にしたAPIサーバー

### 用語
- アンケート
  - 複数の質問事項と概要情報（タイトルなど）を合わせたものをアンケートと呼ぶ
  - アンケートは目的や作成者ごとに複数作成される
  - questionと表記する
- 回答
  - 特定のアンケートへの回答内容を回答と呼ぶ
  - ひとつのアンケートに対して複数の回答がある
  - answerと表記する
- 質問事項と回答形式
  - １つの質問事項には１つの回答形式で回答する
  - 回答形式は３つのうちから１つをアンケート作成者が事前に決める
  - 回答形式は、自由回答、単数選択回答、複数選択回答がある

### APIs Summary
提供するAPIは以下の通り
1. GET  /api/questionsList              最新のアンケートリストの取得
1. GET  /api/questions/:id              アンケートの取得
1. GET  /api/questions/:id/answers/all  全ての回答取得
1. POST /api/questions/:id/answers      アンケートへ回答
1. POST /api/createQuestion             アンケートの新規登録

### API Details
#### GET /api/questionsList
アンケート（質問事項）の概要情報のリストを取得
- requestメソッド: GET
- requestパラメータ: 不要
- response形式 : json
- response項目 : questionInfoのリスト
```
questionInfo = {
    "_id"    : String,        // アンケートのid
    "title" : String,         // アンケートのタイトル
    "answerConunter": Number, // アンケート回答数
    "total": Number,          // アンケートの質問事項数
    "status": String,         // アンケートの実施状況 "準備中","実施中", "実施済"
}
```

#### GET /api/questions/:id
アンケート（質問事項）を取得
- requestメソッド: GET
- requestパラメータ: 不要
- response形式 : json
- response項目 : question. see ./models/question.js
```
question = {
   // アンケートのタイトル
   title : String,
   // アンケートの主催者
   owner : String,
   // アンケートの利用目的
   purpose : String,
   // 詳細テキスト　（例　回答期限、回答対象者など
   description : String,
   // タグ
   tags : [ { type : String } ] ,
   // 質問総数
   total : { type : Number, default : 0},
   // アンケートのステータス
   // "準備中"
   // "実施中"
   // "実施済み"
   status : { type : String, default : "実施中" },
   // アンケート（質問事項）の更新日
   update : { type : Date, default : Date.now },
   //質問と回答選択肢
   items : [ 
             {
               // index
               questionIndex : Number,
               // 質問テキスト
               questionText : String,
               // 複数回答か
               isMultipleAnswer : Boolean,
               // 回答の選択肢リスト
               choiceItems : [ 
                               { 
                                 // 回答の選択肢記号　例）"ア", "1"
                                 symbol: String, 
                                 // 回答選択肢テキスト
                                 text: String 
                               } 
                             ], 
               // 自由形式回答か
               isFreeFormAnswer : Boolean
             }
           ],
   //アンケートの回答済みの数
   answerCounter : { type :Number, default : 0 },
  }
)
```
#### GET /api/questions/:id/answers/all
アンケート（質問事項）のすべての回答を取得する
- requestメソッド: GET
- requestパラメータ: 不要
- response形式 : json
- response項目 : answerのリスト
```
answer = {
   // 対応するQuesion._id を設定すること
   questionId : String, 
   // 回答内容
   items : [ 
             {
               // 対応するQuestionと同じものを設定すること
               questionIndex : Number,
               // 対応するQuestionと同じものを設定すること
               questionText : String,
               // 対応するQuestionと同じものを設定すること
               isMultipleAnswer : Boolean,
               // 選択形式の回答結果を設定 
               // 単数選択回答の時は要素１つ設定
               // 複数選択回答の時は選択数分だけ設定
               // 自由形式回答の時は設定しない
               choiceItems : [ 
                               { 
                                 // 回答の選択肢記号　例）"ア", "1"
                                 symbol: String, 
                                 // 回答テキスト
                                 text: String 
                               } 
                             ], 
               // 対応するQuestionと同じものを設定すること
               isFreeFormAnswer : Boolean,
               // 自由形式の回答結果を設定
               // 単数選択回答や複数選択回答では設定しない
               freeFormAnswer : String,
             }
           ],
    // 回答の更新日時
    update : { type : Date, default : Date.now },
 }
```
#### POST /api/questions/:id/answers
アンケート（質問事項）への回答を登録する
- requestメソッド: POST
- requestパラメータ: 必要
- requestパラメータ形式: req.bodyにjsonを設定
- requestパラメータ項目: answer
- response形式 : -
- response項目 : -
```
```
#### POST /api/createQuestion             アンケートの新規登録
アンケート（質問事項）を登録する
- requestメソッド: POST
- requestパラメータ: 必要
- requestパラメータ形式: req.bodyにjsonを設定
- requestパラメータ項目: question
- response形式 : -
- response項目 : -
```
```

### files 

```
.
├── .env
├── Dockerfile
├── README.md
├── access.log
├── controllers
│   ├── answerController.js
│   ├── authorizzationTokenController.js
│   └── questionController.js
├── index.js
├── models
│   ├── answer.js
│   └── question.js
├── package-lock.json
├── package.json
└── routes
    └── api
        └── index.js
```
