/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('collections_artworks').del()
  await knex('collections_artworks').insert([
    {
      collection_id: 1,
      artwork_id: '4d8b92eb4eb68a1b2c000968',
    },
    {
      collection_id: 1,
      artwork_id: '4d8b92ee4eb68a1b2c0009ab',
    },
    {
      collection_id: 1,
      artwork_id: '4d8b93394eb68a1b2c0010fa',
    },
    {
      collection_id: 2,
      artwork_id: '4d8b92eb4eb68a1b2c000968',
    },
    {
      collection_id: 2,
      artwork_id: '4d8b92ee4eb68a1b2c0009ab',
    },
    {
      collection_id: 2,
      artwork_id: '4d8b93394eb68a1b2c0010fa',
    },
    {
      collection_id: 3,
      artwork_id: '4d8b92eb4eb68a1b2c000968',
    },
    {
      collection_id: 3,
      artwork_id: '4d8b92ee4eb68a1b2c0009ab',
    },
    {
      collection_id: 3,
      artwork_id: '4d8b93394eb68a1b2c0010fa',
    },
  ])
}
