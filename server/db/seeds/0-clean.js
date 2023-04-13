exports.seed = async function(knex) {
  await knex('users').del()
  await knex('collections').del()
  await knex('collections_artworks').del()
  await knex('artworks').del()
};
