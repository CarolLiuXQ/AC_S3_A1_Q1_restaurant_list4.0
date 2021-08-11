const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

const routes = require('./routes')
require('./config/mongoose')

// set view templates
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: require('./controller/handlebarsHelpers')
}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})