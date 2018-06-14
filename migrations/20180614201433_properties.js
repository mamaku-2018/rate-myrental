exports.up = function (knex, Promise) {
  return knex.schema.createTable('properties', function (table) {
    table.increments('id').primary()
    table.string('street')
    table.string('suburb')
    table.string('city')
    table.string('postcode')
    table.string('bedroom')
    table.string('bathroom')
    table.string('image')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('properties')
}
