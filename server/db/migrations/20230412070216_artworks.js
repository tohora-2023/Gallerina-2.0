exports.up = function (knex) {
  return knex.schema.createTable('notes', (table) => {
    table.string('id').primary()
    table.string('title')
    table.string('imageLink')
    table.string('medium')
    table.string('date')
    table.string('artistLink')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('notes')
}
