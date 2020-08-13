const mongoose = require('mongoose')
require('dotenv').config()
const connectTo = 'mongodb://' 
+ process.env.MONGO_DOMAIN + ':' 
+ process.env.MONGO_PORT + '/' 
+ process.env.MONGO_DB
mongoose.connect(
  connectTo, 
  {
    "useNewUrlParser" : true,
    "useUnifiedTopology" : true,
    "user" : process.env.MONGO_USER,
    "pass" : process.env.MONGO_PASSWORD,
  }
)

/**
 *  アンケート（質問事項）のデータモデル
 */
const QuestionSchema = new mongoose.Schema(
  {

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

module.exports = mongoose.model("Question", QuestionSchema)

