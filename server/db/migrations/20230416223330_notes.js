/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('notes', (table) => {
    table.increments('id').primary()
    table.string('note_name')
    table.string('note')
    table.integer('collection_id')
    table.datetime('date_created', true)
    table.string('art_id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('notes')
}
