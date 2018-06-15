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
  return conn('feedback').insert([
    {}
  ])
}
