const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router