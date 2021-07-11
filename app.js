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

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})