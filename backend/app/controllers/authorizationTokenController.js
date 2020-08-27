const QuestionModel = require('../models/question.js')
const jwt = require('jsonwebtoken')



module.exports =  {

  // 指定のアンケートIDに対するアクセストークンを付与しレスポンスに設定する
  createToken: (req, res, next) => {

    const isPublicAnswer = req.body.isPublicAnswer
    const questionId = req.questionId

    let token 
    if(isPublicAnswer){
      token = ""
    } else {
      token = jwt.sign({"questionId": questionId } , process.env.JWT_SECRET)
    }
    res.json({"token": token, "questionId": questionId})
  },
  
  // トークンの再発行　（忘れたとき用）
  recreateToken: (req, res, next) => {

    QuestionModel.findOne( 
      { _id : req.params.id }, 
      (err, result) =>{
        if(err){
          console.log(err)
          return res.status(500).send('get question by id faild.')
        }

        if(result.isPublicAnswer){
          // トークンは不要
          return res.status(200).json({token: "", questionId: req.params.id, message: 'this question is PublicAnswer'})
        } else {
          // トークンの作成
          req.body.isPublicAnswer = false
          req.questionId = req.params.id 
          next()
        }
      }
    ) 
  },

  //  指定のアンケートIDに対する正当なトークンかをチェックする
  //  - 指定のアンケートIDの回答データは非公開か 
  //  - シークレットが同一
  //  - トークン内のアンケートIDとリクエストのアンケートIDが同一
  checkToken: (req, res, next) => {

    QuestionModel.findOne( 
      { _id : req.params.id }, 
      (err, result) =>{
        if(err){
          console.log(err)
          return res.status(500).send('get question by id faild.')
        }

        if(result.isPublicAnswer){
          // トークンは不要
          next()
        } else {

        // トークンの正当性チェック
        const { authorization } = req.headers
        const [, token]  = authorization.split(' ')
        try{
          const decoded = jwt.verify(token, process.env.JWT_SECRET)
          if(decoded.questionId == req.params.id){
            next()
          } else {
            throw new Error('invalid access token')
          }
        } catch (err){
          res.status(401)
          return res.json({ error : err})
        }
        }
      }
    )
  },


}