const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  //檢查是否已經有註冊過了
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User exists.')
      res.render('register', {
        name, email
      })
    } else {
      return User.create({
        name, email, password
      })
        .then(() => res.redirect('login'))
        .catch(err => console.log(err))
    }
  })
})


module.exports = router