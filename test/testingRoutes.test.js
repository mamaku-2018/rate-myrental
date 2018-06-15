const request = require('supertest')
const cheerio = require('cheerio')

const server = require('../server')

// const testEnv = require('./test-environment')

// beforeEach(() => {
//   const testDb = testEnv.getTestDb()
//   return testEnv.initialise(testDb)
// })

// afterEach(() => testEnv.cleanup(testDb))

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

test('feedback page ', (done) => {
  return request(server)
    .get('/feedback')
    .expect(200)
    .end((err, res) => {
      // console.log('res-text: ', res.text)
      const $ = cheerio.load(res.text)
      const paragraph = $('p').text()
      expect(paragraph).toMatch('feedback')
      done(err)
    })
})
test('properties page ', (done) => {
  return request(server)
    .get('/properties')
    .expect(200)
    .end((err, res) => {
      // console.log('res-text: ', res.text)
      const $ = cheerio.load(res.text)
      const result = $('h1').text()
      expect(result).toMatch('PROPERTIES')
      done(err)
    })
})
test('property page ', (done) => {
  return request(server)
    .get('/property')
    .expect(200)
    .end((err, res) => {
      // console.log('res-text: ', res.text)
      const $ = cheerio.load(res.text)
      const paragraph = $('h1').text()
      expect(paragraph).toMatch('PROPERTY')
      done(err)
    })
})
