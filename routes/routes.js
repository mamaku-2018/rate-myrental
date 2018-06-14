const express = require('express')

const db = require('../db')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  res.render('home')
  // res.send('I need a actual page')
})

router.get('/properties', (req, res) => {
  db.getProperties()
    .then(properties => {
      res.render('index', {properties: properties})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})
