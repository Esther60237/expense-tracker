const db = require('../../config/mongoose')
const Category = require('../category')

const categories = [
  {
    categoryName: '家居物業',
    categoryIcon: 'fas fa-home',
  },
  {
    categoryName: '交通出行',
    categoryIcon: 'fas fa-shuttle-van',
  },
  {
    categoryName: '休閒娛樂',
    categoryIcon: 'fas fa-grin-beam',
  },
  {
    categoryName: '餐飲食品',
    categoryIcon: 'fas fa-utensils',
  },
  {
    categoryName: '其他',
    categoryIcon: 'fas fa-pen',
  },
]



db.once('open', () => {
  for (let i = 0; i < categories.length; i++) {
    Category.create({
      categoryName: `${categories[i].categoryName}`,
      categoryIcon: `${categories[i].categoryIcon}`,
    })
  }
  console.log('category done!')
})