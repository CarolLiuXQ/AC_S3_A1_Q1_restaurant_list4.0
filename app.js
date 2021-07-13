const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})