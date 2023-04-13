exports.up = function (knex) {
  return knex.schema.createTable('artworks', (table) => {
    table.string('id').primary()
    table.string('title')
    table.string('imageLink')
    table.string('medium')
    table.string('blurb')
    table.string('date')
    table.string('artistLink')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('artworks')
}
