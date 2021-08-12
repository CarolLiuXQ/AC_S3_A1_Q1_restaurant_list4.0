//專門用來管理 middleware 元件，而和「使用者認證 (user authentication)」有關的 middleware
module.exports = {
  authenticator: (req, res, next) => {
    //req.isAuthenticated() 是 Passport.js 提供的函式
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'Please Login first.')
    res.redirect('/users/login')
  }
}