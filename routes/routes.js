const express = require('express')

const db = require('../db')

const router = express.Router()

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
  const id = req.params.id
  db.getPropertyFeedback(id)
    .then(propertyFeedback => {
      res.render('property', {propertyFeedback: propertyFeedback})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.messagegi)
    })
})

router.get('/feedback/:id', (req, res) => {
  const id = req.params.id
  db.getFeedback(id)
    .then(feedback => {
      res.render('feedback', {feedback: feedback})
  })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
  })
})

router.get('/feedbackForm', (req, res) => {
  res.render('feedbackForm')
})

router.post('/feedbackForm', (req, res) => {
  const feedback = req.body

  db.addFeedback(feedback)
    // .then((userid) => {
    //   return db.addProfile(userid, url, picture)
    //     .catch(err => {
    //       res.status(500).send('DATABASE ERROR: ' + err.message)
    //     })
    // })
    .then(() => {
      res.redirect('/property'+ id)
    })
})


module.exports = router