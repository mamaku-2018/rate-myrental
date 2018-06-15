const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getProperties,
  getPropertyFeedback,
  getFeedback,
  addFeedback
}

function getProperties (conn = connection) {
  return conn('properties')
    .join('feedback', 'properties.id', 'feedback.property_id')
    .select()
    .orderBy('feedback.datetime', 'desc')
}

function getPropertyFeedback (id, conn = connection) {
  return conn('properties')
    .join('feedback', 'properties.id', 'feedback.property_id')
    .select()
    .where('properties.id', id)
}

function getFeedback (id, conn = connection) {
  return conn('feedback')
    .join('properties', 'properties.id', 'feedback.property_id')
    .select('feedback.id as f_id', 'feedback.property_id as f_pid', 'feedback.answer1 as a1', 'feedback.answer2 as a2', 'feedback.answer3 as a3', 'feedback.datetime as date', 'properties.id as p_id', 'properties.street', 'properties.suburb', 'properties.city', 'properties.postcode', 'properties.image')
    .where('feedback.id', id)
}

function addFeedback (feedback, conn = connection) {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()
  const newDate = year + '-' + month + '-' + day
  return conn('feedback').insert([
    {
      property_id: feedback.properties,
      answer1: feedback.question1,
      answer2: feedback.question2,
      answer3: feedback.question3,
      answer4: feedback.question4,
      answer5: feedback.question5,
      datetime: newDate
    }
  ])
}
