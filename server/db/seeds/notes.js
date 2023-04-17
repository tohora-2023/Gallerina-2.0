/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('notes').del()
  await knex('notes').insert([
    {
      id: 1,
      note_name: 'Cool Painting',
      note: 'I need to write about this painting for my essay',
      collection_id: 1,
      date_created: new Date(Date.now()),
      art_id: '4d8b92eb4eb68a1b2c000968',
    },
    {
      id: 2,
      note_name: 'todo',
      note: 'look up artist bio',
      collection_id: 1,
      date_created: new Date(Date.now()),
      art_id: '4d8b92ee4eb68a1b2c0009ab',
    },
    {
      id: 3,
      note_name: 'personal',
      collection_id: 1,
      note: 'I love this one!',
      date_created: new Date(Date.now()),
      art_id: '4d8b93394eb68a1b2c0010fa',
    },
  ])
}
