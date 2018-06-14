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
    .select()
}

function getPropertyFeedback (id, conn = connection) {
  return conn('properties')
    .join('feedback', 'properties.id', 'feedback.property_id')
    .select()
    .where('properties.id', id)
}

function getFeedback (id, conn = connection) {
  return conn('feedback')
    .select()
    .where('feedback.id', id)
}

function addFeedback (feedback, conn = connection) {
  return conn('feedback').insert([
    {}
  ])
}
