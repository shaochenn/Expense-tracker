const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

const usePassport = require('./config/passport')
const routes = require('./routes')

require('./config/mongoose')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const app = express()

const port = process.env.PORT


app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers:{
    fomattedDate: function(date) {
      const dateObj = new Date(date)

      const year = dateObj.getFullYear()
      const month = String(dateObj.getMonth() + 1).padStart(2, "0")
      const day = String(dateObj.getDate()).padStart(2, "0")

      return `${year}/${month}/${day}`
    },
    getImg: function(id) {
      const CATEGORY = {
        家居物業: "fa-solid fa-house",
        交通出行: "fa-solid fa-van-shuttle",
        休閒娛樂: "fa-solid fa-face-grin-beam",
        餐飲食品: "fa-solid fa-utensils",
        其他: "fa-solid fa-pen"
      }
      if (id === 1) {
        return CATEGORY.家居物業
      } else if (id === 2) {
        return CATEGORY.交通出行
      } else if (id === 3) {
        return CATEGORY.休閒娛樂
      } else if (id === 4) {
        return CATEGORY.餐飲食品
      } else if (id === 5) {
        return CATEGORY.其他
      }
    },
    cutDate: function(date) {
      if (!date) return ""
      return date.toISOString().substring(0, 10)
    },
    eq: (a, b) => a === b
  }
}))

app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg') 
  next()
})
app.use(routes)


app.listen(port, () => {
  console.log('Express is running on http://localhost:port')
})