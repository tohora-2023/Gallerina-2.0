exports.up = function (knex) {
  return knex.schema.createTable('collections_artworks', (table) => {
    table.unique(['collection_id', 'artwork_id'])
    table.integer('collection_id')
    table.string('artwork_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('collections_artworks')
}
