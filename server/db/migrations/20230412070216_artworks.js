exports.up = function (knex) {
  return knex.schema.createTable('artworks', (table) => {
    table.increments('id')
    table.string('title')
    table.string('image')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('artworks')
}

