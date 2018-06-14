exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('properties').del()
    .then(function () {
      // Inserts seed entries
      return knex('properties').insert([
        {id: 1, street: 'rowValue1', suburb: 'rowValue1', city: 'rowValue1', postcode: 'rowValue1', bedroom: 'rowValue1', bathroom: 'rowValue1', image: 'rowValue1'},
        {id: 2, street: 'rowValue2', suburb: 'rowValue1', city: 'rowValue1', postcode: 'rowValue1', bedroom: 'rowValue1', bathroom: 'rowValue1', image: 'rowValue1'},
        {id: 3, colName: 'rowValue3', suburb: 'rowValue1', city: 'rowValue1', postcode: 'rowValue1', bedroom: 'rowValue1', bathroom: 'rowValue1', image: 'rowValue1'}
      ])
    })
}
