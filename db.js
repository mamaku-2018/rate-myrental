const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getProperties,
  getProperty
}

function getProperties (conn = connection) {
  return conn('properties')
    .select()
}

function getProperty (id, conn = connection) {
  return conn('properties')
    .join('feedback', 'properties.id', 'feedback.property_id')
    .select()
    .where('properties.id', id)
}
