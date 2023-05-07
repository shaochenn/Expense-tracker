const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  const categoryMap = {}
  const categoryNameToId = {}
  Category.find()
    .lean()
    .then(categorys => {
      categorys.forEach(category => {
        categoryMap[category._id] = category.icon
        categoryNameToId[category.name] = category._id
      })
    })
    .then(() => {
      Record.find({ userId })
        .lean()
        .then(records => {
          records.forEach(record => totalAmount = totalAmount + record.amount)
          res.render('index', { records, totalAmount, categoryMap, categoryNameToId })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  
})

router.get('/search/categoryId/:cateId', (req, res) => {
  const userId = req.user._id
  const categoryId = req.params.cateId
  let totalAmount = 0
  const categoryMap = {}
  const categoryNameToId = {}

  Category.find()
    .lean()
    .then(categorys => {
      categorys.forEach(category => {
        categoryMap[category._id] = category.icon
        categoryNameToId[category.name] = category._id
      })
    })
    .then(() => {
      Record.find({ userId, categoryId })
        .lean()
        .then(records => {
          records.forEach(record => totalAmount = totalAmount + record.amount)
          res.render('index', { records, totalAmount, categoryMap, categoryNameToId })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router