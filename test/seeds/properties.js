exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('properties').del()
    .then(function () {
      // Inserts seed entries
      return knex('properties').insert([
        {id: 1, street: '14 Sussex Street', suburb: 'Grey Lynn', city: 'Auckland', postcode: '2346', bedroom: '3', bathroom: '1', image: 'http://thetalentcatalyst.com/wp-content/uploads/2016/05/Mansion-640x360.jpg'},
        {id: 2, street: '8 Packabs Avenue', suburb: 'Avondale', city: 'Wellington', postcode: '4235', bedroom: '8', bathroom: '2', image: 'https://circaoldhouses.com/wp-content/uploads/2017/10/key-hole-house-1.jpg'},
        {id: 3, street: '3 Skid Row', suburb: 'Manukau', city: 'Hamilton', postcode: '4747', bedroom: '1', bathroom: '3', image: 'https://images1.laweekly.com/imager/dont-let-the-bed-bugs-bite/u/original/4233805/skid_row_trash_street.jpg'}
      ])
    })
}
