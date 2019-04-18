const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/testdb')

const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))

const userSchena = new mongoose.Schema({
  name: String,
  password: String,
  nickName: String,
  type: String,
  token: String,
  avatar: String
})

const Models = {
  User: mongoose.model('User', userSchena)
}

module.exports = Models
