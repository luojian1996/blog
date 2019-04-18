'use strict'
const db = require('./db')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
// const path = require('path')

function checkToken (req, res) {
  db.User.find({name: req.query.name, token: req.query.token}, (err, docs) => {
    if (err) {
      res.send(err)
      return
    }
    if (docs.length > 0) {
      let token = req.query.token
      let secretOrPrivateKey = 'secret'
      jwt.verify(token, secretOrPrivateKey, function (err, docode) {
        if (err) {
          res.send({'status': 0, 'msg': 'token无效!'})
        } else {
          res.send({ 'status': 1, 'type': docs[0]['type'], 'user_name': docs[0]['name'], 'avatar': docs[0]['avatar'], 'nickName': docs[0]['nickName'] })
        }
      })
    } else {
      res.send({'status': 0, 'msg': 'token无效!'})
    }
  })
}

// 注册账号
router.post('/api/regist', (req, res) => {
  db.User.find({name: req.query.name}, (err, docs) => {
    if (err) {
      res.send(err)
      return
    }
    if (docs.length > 0) {
      res.send({ 'status': 0, 'msg': '用户已注册!' })
    } else {
      db.User.find({nickName: req.query.nickName}, (err, docs) => {
        if (err) {
          res.send(err)
          return
        }
        if (docs.length > 0) {
          res.send({'status': 0, 'msg': '昵称已注册!'})
        } else {
          let newUser = new db.User({
            name: req.query.name,
            password: req.query.password,
            nickName: req.query.nickName,
            avatar: null,
            type: 2
          })
          newUser.save(function (err) {
            if (err) {
              res.send(err)
            } else {
              res.send({'status': 1, 'msg': '注册成功!'})
            }
          })
        }
      })
    }
  })
})

// 登录
router.post('/api/signIn', (req, res) => {
  db.User.find({name: req.query.name, password: req.query.password}, (err, docs) => {
    if (err) {
      res.send(err)
      return
    }
    if (docs.length > 0) {
      let content = { name: req.query.name }
      let secretOrPrivateKey = 'secret'
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60 // 24小时过期
      })
      docs[0].token = token
      db.User(docs[0]).save(function (err) {
        if (err) {
          res.status(500).send()
          return
        }
        res.send({'status': 1, 'msg': '登录成功!', 'token': docs[0].token, 'user_name': docs[0]['name'], 'type': docs[0]['type'], 'nickName': docs[0]['nickName'], 'avator': docs[0]['avatar']})
      })
    } else {
      res.send({'status': 0, 'msg': '账户或密码有误!'})
    }
  })
})

router.post('/api/test', (req, res) => {
  checkToken(req, res)
})

module.exports = router
