/**
 *
 * router for /api
 *
 */

const express = require('express')
const router = express.Router()
const questionController = require('../../controllers/questionController')
const answerController = require('../../controllers/answerController')

router.get('/questions/:id', questionController.doGetQuestionById)
router.get('/questionsList', questionController.doGetQuestionsList)
router.post('/createQuestion', questionController.doPostQuestion)
router.post('/questions/:id/answers', answerController.doPostAnswer)
router.get('/questions/:id/answers/all', answerController.doGetAnswersAll)


module.exports = router

