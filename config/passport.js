const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

//直接匯出一個 function
module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  // 設定序列化與反序列化
  passport.use(new LocalStrategy(
    //把驗證項目從預設的 username 改成 email
    {
      usernameField: 'email',
      passReqToCallback: true,
      session: false
    }, (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, req.flash('warning_msg', 'This email is not registered.'))
          }
          if (user.password !== password) {
            return done(null, false, req.flash('warning_msg', 'Incorrect password.'))
          }
          return done(null, user)
        })
        .catch(err => done(err, false))
    }
  ))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}