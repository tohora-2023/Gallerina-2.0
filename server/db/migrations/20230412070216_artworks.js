exports.up = function (knex) {
  return knex.schema.createTable('artworks', (table) => {
    table.string('id').primary()
    table.string('title')
    table.string('image_link')
    table.string('medium')
    table.string('date')
    table.string('artist_link')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('artworks')
}
