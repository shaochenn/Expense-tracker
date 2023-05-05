const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()

const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('new')
})

app.post('/records', (req, res) => {
  console.log(req.body)
})

app.listen(port, () => {
  console.log('Express is running on http://localhost:port')
})