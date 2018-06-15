exports.up = function (knex, Promise) {
  return knex.schema.createTable('feedback', function (table) {
    table.increments('id').primary()
    table.integer('property_id')
    table.integer('answer1')
    table.integer('answer2')
    table.integer('answer3')
    table.integer('answer4')
    table.integer('answer5')
    table.datetime('datetime')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('feedback')
}
