exports.up = function (knex, Promise) {
  return knex.schema.createTable('feedback', function (table) {
    table.increments('id').primary()
    table.integer('proprety_id')
    table.integer('answer1')
    table.integer('answer2')
    table.integer('answer3')
    table.datetime('date_time')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('feedback')
}
