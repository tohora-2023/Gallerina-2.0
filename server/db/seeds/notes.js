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
      noteName: 'Cool Painting',
      note: 'I need to write about this painting for my essay',
      collectionId: 1,
      dateCreated: new Date(Date.now()),
      artId: '4d8b92eb4eb68a1b2c000968',
    },
    {
      id: 2,
      noteName: 'todo',
      note: 'look up artist bio',
      collectionId: 1,
      dateCreated: new Date(Date.now()),
      artId: '4d8b92ee4eb68a1b2c0009ab',
    },
    {
      id: 3,
      noteName: 'personal',
      collectionId: 1,
      note: 'I love this one!',
      dateCreated: new Date(Date.now()),
      artId: '4d8b93394eb68a1b2c0010fa',
    },
  ])
}
