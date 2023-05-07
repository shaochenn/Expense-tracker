const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')


//create
router.get('/new', (req, res) => {
  const categoryMap = {}
  Category.find()
    .lean()
    .then(categorys => {
      categorys.forEach(category => {
        categoryMap[category.name] = category._id
      })
    })
    .then(() => res.render('new', { categoryMap }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, categoryId, amount } = req.body
  
  return Record.create({ name, date, categoryId, amount, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//update
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const categoryMap = {}
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      Category.find()
      .lean()
      .then(categorys => {
        categorys.forEach(category => {
          categoryMap[category.name] = category._id
        })
      })
      .then(() => res.render('edit', { record, categoryMap }))
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, categoryId, amount } = req.body

  return Record.findOne({ _id, userId })
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
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router