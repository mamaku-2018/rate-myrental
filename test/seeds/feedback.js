exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('feedback').del()
    .then(function () {
      // Inserts seed entries
      return knex('feedback').insert([
        {id: 1, property_id: 1, answer1: 4, answer2: 5, answer3: 4, answer4: 3, answer5: 5, datetime: '2018-10-20'},
        {id: 2, property_id: 2, answer1: 3, answer2: 5, answer3: 2, answer4: 2, answer5: 2, datetime: '2018-12-13'},
        {id: 3, property_id: 3, answer1: 5, answer2: 5, answer3: 4, answer4: 5, answer5: 5, datetime: '2018-12-12'}
      ])
    })
}
