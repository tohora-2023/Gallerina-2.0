exports.up = function (knex) {
  return knex.schema.createTable('collections', (table) => {
    table.increments('id')
    table.string('title')
    table.string('cover_img')
    table.integer('user_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('collections')
}

