const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')

const records = [
  {
    name: '午餐',
    category: '餐飲食品',
    date: '2020/08/01',
    amount: '180',
  },
  {
    name: '加油',
    category: '交通出行',
    date: '2020/08/01',
    amount: '90',
  },
  {
    name: '電影票',
    category: '休閒娛樂',
    date: '2020/08/03',
    amount: '300',
  },
  {
    name: '買樂透',
    category: '其他',
    date: '2020/08/03',
    amount: '50',
  },
  {
    name: '停車費',
    category: '家居物業',
    date: '2020/08/01',
    amount: '3000',
  },
]

db.once('open', () => {
  for (let i = 0; i < records.length; i++) {
    Category.find({ categoryName: `${records[i].category}` })
      .then(categories =>
        Record.create({
          name: `${records[i].name}`,
          category: `${records[i].category}`,
          categoryIcon: `${categories[0].categoryIcon}`,
          date: `${records[i].date}`,
          amount: `${records[i].amount}`,
        })
      )
      .catch(error => console.log(error))
  }
  console.log('done')
})
