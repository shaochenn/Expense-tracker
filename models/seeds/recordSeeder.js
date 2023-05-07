if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const User = require('../user')
const Record = require('../record')
const Category = require('../category')
const bcrypt = require('bcryptjs')

const SEED_USER = {
  name: 'baba',
  email: 'baba@example.com',
  password: '123'
}

const recordList = 
[
  {
    name: "房租",
    date: "2023/05/01",
    amount: "5000",
    category: "家居物業"
  },
  {
    name: "水費",
    date: "2023/05/01",
    amount: "1200",
    category: "家居物業"
  },
  {
    name: "公車",
    date: "2023/05/02",
    amount: "30",
    category: "交通出行"
  },
  {
    name: "打保齡球",
    date: "2023/05/03",
    amount: "200",
    category: "休閒娛樂"
  },
  {
    name: "拉麵",
    date: "2023/04/05",
    amount: "150",
    category: "餐飲食品"
  },
  {
    name: "鍵盤",
    date: "2023/05/04",
    amount: "2000",
    category: "其他"
  }
]

db.once('open', () => {
    bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(recordList, (record) => {
        return Category.findOne({ name: record.category })
        .then(cate => {
          const categoryId = cate._id
          return Record.create({ ...record, categoryId, userId })
        })
      }))
    })
    .then(() => {
    console.log('done.')
    process.exit()
  })
})