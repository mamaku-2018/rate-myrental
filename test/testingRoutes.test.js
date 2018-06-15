const db = require('../db')
const request = require('supertest')
const cheerio = require('cheerio')
const server = require('../server')
const testEnv = require('./test-environment')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

test('home page ', (done) => {
  return request(server)
    .get('/')
    .expect(200)
    .end((err, res) => {
      // console.log('res-text: ', res.text)
      const $ = cheerio.load(res.text)
      const paragraph = $('h1').text()
      expect(paragraph).toMatch('HOME')
      done(err)
    })
})

test('properties page has 3 properties', () => {
  return db.getProperties(testDb)
    .then(properties => {
      expect(properties.length).toBe(3)
    })
})

test('test property has 1 feedback', () => {
  const id = 2
  return db.getPropertyFeedback(id, testDb)
    .then(property => {
      expect(property.length).toBe(1)
      expect(property[0].type).toBe('')
    })
})
