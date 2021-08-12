const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')


router.get('/login', (req, res) => {
  res.render('login')
})

// 加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureMessage: true
}))


router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'Fields are required.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password is not same as confirm password.' })
  }
  if (errors.length) {
    return res.render('register', {
      name, email, errors
    })
  }
  //檢查是否已經有註冊過了
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: 'User exists.' })
      return res.render('register', {
        name, email, errors
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash =>
        User.create({
          name, email, password: hash
        }))
      .then(() => res.redirect('login'))
      .catch(err => console.log(err))

  })
})


router.get('/logout', (req, res) => {
  //req.logout() 是 Passport.js 提供的函式
  req.logOut()
  req.flash('success_msg', 'Logout succeeded')
  res.redirect('/users/login')
})

module.exports = router