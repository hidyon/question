// express
const express = require('express')
const app = express()


// アクセスログは access.log へ出力
const fs = require('fs')
const logger = require('morgan')

const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(logger('combined', {stream: accessLogStream}))


// body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// CROS
const cors = require('cors')
app.use(cors())


// router /api
const apiRoutes = require('./routes/api/index')
app.use('/api', apiRoutes)

// start server
require('dotenv').config()
app.listen(process.env.BACKEND_PORT || 3000)


