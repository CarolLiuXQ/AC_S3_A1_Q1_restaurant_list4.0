const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

////showpage詳細介面////////////
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

/////新增餐廳/////////////
router.post('/new', (req, res) => {
  res.render('new')
})
//新增之後導去/restaurants做存進database的動作
router.post('/', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    google_map: req.body.google_map,
    rating: req.body.rating,
    phone: req.body.phone,
    description: req.body.description
  })
  return restaurant.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

/////////編輯 page///////////
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
//把編輯過的內容更新進DB
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.phone = req.body.phone
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

///////刪除餐廳//////////
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router