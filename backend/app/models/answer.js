const mongoose = require('mongoose')
require('dotenv').config
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

const AnswerSchema = new mongoose.Schema(
 {

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
               // 自由形式回答の時は設定しない要素１つ）
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
)

module.exports = mongoose.model("Answer", AnswerSchema)

