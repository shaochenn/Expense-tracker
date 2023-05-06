const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  let totalAmount = 0

  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => totalAmount = totalAmount + record.amount)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router