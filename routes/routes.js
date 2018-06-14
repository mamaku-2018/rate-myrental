const express = require('express')

const db = require('../db')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  res.render('home')
})

router.get('/properties', (req, res) => {
  db.getProperties()
    .then(properties => {
      res.render('properties', {properties: properties})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/property/:id', (req, res) => {
  db.getProperty()
    .then(property => {
      res.render('property', property)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.messagegi)
    })
})
