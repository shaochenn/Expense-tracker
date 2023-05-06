const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


const routes = require('./routes')

const Record = require('./models/record')
const mongoose = require('mongoose')


if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const app = express()

const port = process.env.PORT

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

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
app.use(routes)

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


// app.get('/', (req, res) => {
//   let totalAmount = 0

//   Record.find()
//     .lean()
//     .then(records => {
//       records.forEach(record => totalAmount = totalAmount + record.amount)
//       res.render('index', { records, totalAmount })
//     })
//     .catch(error => console.log(error))
// })

// //create
// app.get('/records/new', (req, res) => {
//   res.render('new')
// })

// app.post('/records', (req, res) => {
//   const { name, date, categoryId, amount } = req.body
  
//   return Record.create({ name, date, categoryId, amount })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })


// //update
// app.get('/records/:id/edit', (req, res) => {

//   const _id = req.params.id
//   return Record.findOne({ _id })
//     .lean()
//     .then(record => res.render('edit', { record }))
//     .catch(error => console.log(error))
// })

// app.put('/records/:id', (req, res) => {
  
//   const _id = req.params.id
//   const { name, date, categoryId, amount } = req.body

//   return Record.findOne({ _id })
//     .then(record => {
//       record.name = name
//       record.date = date
//       record.categoryId = categoryId
//       record.amount = amount
//       return record.save()
//     })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// //delete
// app.delete('/records/:id', (req, res) => {

//   const _id = req.params.id
//   return Record.findOne({ _id })
//     .then(record => record.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })




app.listen(port, () => {
  console.log('Express is running on http://localhost:port')
})