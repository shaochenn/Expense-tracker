const express = require('express')
const router = express.Router()

const Record = require('../../models/record')


//create
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name, date, categoryId, amount } = req.body
  
  return Record.create({ name, date, categoryId, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//update
router.get('/:id/edit', (req, res) => {

  const _id = req.params.id
  return Record.findOne({ _id })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  
  const _id = req.params.id
  const { name, date, categoryId, amount } = req.body

  return Record.findOne({ _id })
    .then(record => {
      record.name = name
      record.date = date
      record.categoryId = categoryId
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//delete
router.delete('/:id', (req, res) => {

  const _id = req.params.id
  return Record.findOne({ _id })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router