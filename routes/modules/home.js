const express = require('express')
const router = express.Router()
const numeral = require('numeral')
const Record = require('../../models/record')

router.get('/', (req, res) => {
  return Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      totalAmount = numeral(totalAmount).format('0,0')

      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

module.exports = router