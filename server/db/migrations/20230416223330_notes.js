/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('notes', (table) => {
    table.increments('id').primary()
    table.string('noteName')
    table.string('note')
    table.integer('collectionId')
    table.datetime('dateCreated', true)
    table.string('artId')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('artworks')
}
