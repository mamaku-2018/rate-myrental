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
          propertyList.p.push({
            id: obj.id,
            street: obj.street,
            city: obj.city,
            postcode: obj.postcode,
            image: obj.image,
            datetime: obj.datetime,
            percentage: Math.floor(((obj.answer1 + obj.answer2 + obj.answer3 + obj.answer4 + obj.answer5) / 25) * 100) + '%'
          })
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
          percentage: Math.floor(((feedback.answer1 + feedback.answer2 + feedback.answer3 + feedback.answer4 + feedback.answer5) / 25) * 100) + '%'
        })
      })
      // console.log(feedbackList)
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
      let feedbackData = {
        f: []
      }
      feedback.forEach(fb => {
        feedbackData.f.push({
          feedbackId: fb.f_id,
          propertyId: fb.f_pid,
          street: fb.street,
          suburb: fb.suburb,
          city: fb.city,
          postcode: fb.postcode,
          datetime: fb.date,
          percentage: Math.floor(((fb.a1 + fb.a2 + fb.a3 + fb.a4 + fb.a5) / 25) * 100) + '%'
        })
      })
      // console.log(feedback)
      res.render('feedback', {feedbackData: feedbackData})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/form', (req, res) => {
  db.getProperties()
    .then(properties => {
      res.render('form', {properties: properties})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/form', (req, res) => {
  const feedback = req.body
  console.log(feedback)
  const id = 1
  db.addFeedback(feedback)
    // .then((userid) => {
    //   return db.addProfile(userid, url, picture)
    //     .catch(err => {
    //       res.status(500).send('DATABASE ERROR: ' + err.message)
    //     })
    // })
    .then(() => {
      res.redirect('/property/' + id)
    })
})

module.exports = router
