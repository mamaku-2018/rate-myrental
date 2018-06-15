const express = require('express')
const hbs = require('express-handlebars')

const routes = require('./routes/routes')

const server = express()

// Middleware

server.engine('hbs', hbs({extname: 'hbs'}))
server.set('view engine', 'hbs')
server.use(express.static('public'))
server.use(express.urlencoded({extended: true}))

server.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main'
}))

// Routes
server.use('/', routes)

module.exports = server
