const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

db.on('error', () => console.log(error))
db.once('open', () => console.log('mongodb connected'))

/////根目錄//////////
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

////showpage詳細介面////////////
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

/////新增餐廳/////////////
app.post('/restaurants/new', (req, res) => {
  res.render('new')
})
//新增之後導去/restaurants做存進database的動作
app.post('/restaurants', (req, res) => {
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
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
//把編輯過的內容更新進DB
app.post('/restaurants/:id/edit', (req, res) => {
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
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


////////搜尋餐廳///////////
app.get('/search', (req, res) => {
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

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})