const express = require('express')

const db = require('../db')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('home')
})

router.get('/properties', (req, res) => {
  db.getProperties()
    .then(properties => {
      let propertyList = {
        p: []
      }
      properties.forEach(obj => {
        if (!propertyList.p.some(prop => obj.property_id === prop.property_id)) {
          propertyList.p.push(obj)
        }
      })
      // console.log(propertyList)
      res.render('properties', {propertyList: propertyList})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/property/:id', (req, res) => {
  const id = req.params.id
  db.getPropertyFeedback(id)
    .then(propertyFeedback => {
      let feedbackList = {
        f: []
      }
      propertyFeedback.forEach(feedback => {
        feedbackList.f.push({
          id: feedback.id,
          street: feedback.street,
          city: feedback.city,
          postcode: feedback.postcode,
          image: feedback.image,
          datetime: feedback.datetime,
          percentage: Math.floor(((feedback.answer1 + feedback.answer2 + feedback.answer3) / 15) * 100)
        })
      })
      console.log(feedbackList)
      res.render('property', {feedbackList: feedbackList})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
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
      res.redirect('/property' + id)
    })
})

module.exports = router
