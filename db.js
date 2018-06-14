const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getProperties
}

function getProperties (conn = connection) {
  return conn('properties')
    .select()
}
