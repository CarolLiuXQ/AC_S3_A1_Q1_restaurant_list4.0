const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list')
const db = mongoose.connection


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))

db.on('error', () => console.log(error))
db.once('open', () => console.log('mongodb connected'))


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})