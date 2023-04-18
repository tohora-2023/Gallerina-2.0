exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('username')
    table.string('auth0id').unique()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
