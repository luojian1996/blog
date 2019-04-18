// 模块引入
// const fs = require('fs')
// const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const api = require('./api')
const app = express()
// const session = require('express-session')

// 跨域
app.use(cors())

app.use(express.json({limit: '5mb'}))

app.unsubscribe(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))

app.use(api)

app.listen(8081)
console.log('success listen...')
