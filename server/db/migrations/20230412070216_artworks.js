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

// where('title', 'like', '%'title'%').orWhere('artist', 'like', '%'artist'%')

exports.down = function (knex) {
  return knex.schema.dropTable('artworks')
}
