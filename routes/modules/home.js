const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const sortData = require('../../config/sortData.json')

/////根目錄//////////
router.get('/', (req, res) => {
  const currentSortOption = req.query.sortOption
  const sortMongoose = {
    nameEnAsc: { name_en: 'asc' },
    nameEnDesc: { name_en: 'desc' },
    category: { category: 'asc' },
    location: { location: 'asc' }
  }
  Restaurant.find()
    .lean()
    .sort(sortMongoose[currentSortOption])
    .then(restaurant => res.render('index', { restaurant, sortData, sortData, currentSortOption }))
    .catch(error => console.log(error))
})

module.exports = router