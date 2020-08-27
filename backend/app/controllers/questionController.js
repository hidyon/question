const QuestionModel = require('../models/question.js')


module.exports =  {

  /**
   *
   * 登録されたアンケート(回答事項）の概要情報のリストを返す
   * 概要情報（タイトル等）のみを返すのはサイズ軽減のため
   *
   */
  doGetQuestionsList : (req, res, next) => {

    QuestionModel.find(
      { }, 
      '_id title total status answerCounter isPublicAnswer',
      { sort : { update : -1 }},
      (err, result) => {
        if(!err){
          res.send(result)
        } else {
          console.log(err)
          return res.status(500).send('get questions list faild.')
        }
      }
    )
  },

  /**
   *
   * idで指定されたアンケートを取得
   *
   */
  doGetQuestionById : (req, res, next) => {
    
    QuestionModel.findOne( 
      { _id : req.params.id }, 
      (err, result) =>{
        if(!err){
          res.send(result)
        } else {
          console.log(err)
          return res.status(500).send('get question by id faild.')
        }
      }
    )
  },

  /**
   *
   * 新しいアンケートを登録する
   *
   */
  doPostQuestion : (req, res, next) => {

    let postData = new QuestionModel(req.body)
    //DEBUG console.log("postData:" + req.body.data)
    postData.total = postData.items.length

    postData.save((err, result) => {
      if(!err){
        // res.send(result)
        req.questionId = result._id
        console.log("set req.questionId :"+ req.questionId)
        console.log("req.body.isPublicAnswer :"+ req.body.isPublicAnswer)
        next()
      } else {
        console.log(err)
        return res.status(500).send('post question faild.')
      }
    })
  },

  /**
   *
   * 既存アンケートを更新して投稿する
   * 
   */
  doPutQuestionById : (req, res, next) => {

    let putReqData = req.body
    ExamModel.findOneAndUpdate( 
      { _id : req.params.id }, 
      {$set: putReqData}, 
      (err, result) =>{
        if(!err){
          res.send(result)
        } else {
          console.log(err)
          return res.status(500).send('put question faild.')
        }
      }
    )
  },

}


