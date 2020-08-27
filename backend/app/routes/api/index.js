/**
 *
 * router for /api
 *
 */

const express = require('express')
const router = express.Router()
const questionController = require('../../controllers/questionController')
const answerController = require('../../controllers/answerController')
const authorizationTokenController = require('../../controllers/authorizationTokenController')

router.get('/questions/:id', questionController.doGetQuestionById)
router.get('/questionsList', questionController.doGetQuestionsList)
router.post('/createQuestion', questionController.doPostQuestion, authorizationTokenController.createToken)
router.post('/questions/:id/answers', answerController.doPostAnswer)
router.get('/questions/:id/answers/all', authorizationTokenController.checkToken, answerController.doGetAnswersAll)
router.get('/questions/:id/token', authorizationTokenController.recreateToken, authorizationTokenController.createToken)


module.exports = router

