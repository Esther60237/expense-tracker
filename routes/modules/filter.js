const express = require('express')
const router = express.Router()
const numeral = require('numeral')
const helper = require('../../helper')

const Record = require('../../models/record')

router.get('/', (req, res) => {
  const filter = req.query.filter
  console.log(filter)
  if (filter === 'ALL') {
    res.redirect('/')
  } else {
    Record.find({ category: `${filter}` })
      .lean()
      .then(records => {
        let totalAmount = 0
        for (let i = 0; i < records.length; i++) {
          totalAmount += records[i].amount
        }
        totalAmount = numeral(totalAmount).format('0,0')
        res.render('index', { records, totalAmount, filter })
      })
      .catch(error => console.log(error))
  }

})

module.exports = router