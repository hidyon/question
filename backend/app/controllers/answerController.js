const express = require('express')
const QuestionModel = require('../models/question.js')
const AnswerModel = require('../models/answer.js')


module.exports =  {

  /**
   *
   * idで指定されたアンケートへの回答を全件取得する
   *
   */
  doGetAnswersAll : (req, res, next) => {

    AnswerModel.find(
      { questionId : req.params.id }, 
      (err, result) => {
        if(!err){
          res.send(result)
        } else {
          console.log(err)
          return res.status(500).send('get answers all faild.')
        }
      }
    )
  },

  /**
   * アンケート回答を登録する
   *
   */
  doPostAnswer : (req, res, next) => {
    
    let postData = new AnswerModel(req.body)
    postData.save((err, result) => {
      if(!err){
        QuestionModel.findOneAndUpdate(
          { _id : req.body.questionId },
          { $inc : { answerCounter : 1 } },
          (err, result) =>{
            if(!err){
              res.send(result)
            }else{
              console.log(err)
            }
          }
        )
      } else {
        console.log(err)
        return res.status(500).send('get question faild.')
      }
    }
    )
  },
}

