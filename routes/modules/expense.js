const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const helper = require('../../helper')

// Create
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  Category.find({ categoryName: `${req.body.category}` })
    .then(categories =>
      Record.create({
        name: `${req.body.name}`,
        category: `${req.body.category}`,
        categoryIcon: `${categories[0].categoryIcon}`,
        date: `${req.body.date}`,
        amount: `${req.body.amount}`,
      })
    )
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Update
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      res.render('edit', { record })
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => {
      Category.find({ categoryName: `${req.body.category}` })
        .then(categories => {
          record = Object.assign(record, req.body)
          record.categoryIcon = `${categories[0].categoryIcon}`
          return record.save()
        })
        .catch(error => console.log(error))
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router