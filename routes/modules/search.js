const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

////////搜尋餐廳///////////
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const keywordLowercaseNonSpace = keyword.toLowerCase().split(" ").join("")
  //一次可以搜尋地點,餐廳名,類別
  return Restaurant.find({
    $or: [
      { name: { "$regex": keywordLowercaseNonSpace, "$options": "ix" } },
      { category: { "$regex": keywordLowercaseNonSpace, "$options": "ix" } },
      { location: { "$regex": keywordLowercaseNonSpace, "$options": "ix" } }
    ]
  })
    .lean()
    .then(restaurant => res.render('index', { restaurant, keyword }))
    .catch(error => console.log(error))
})

module.exports = router