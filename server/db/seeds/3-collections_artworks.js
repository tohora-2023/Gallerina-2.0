exports.seed = async (knex) => {
  await knex('collections_artworks').insert([
   {collection_id: 1, artwork_id: 2},
   {collection_id: 1, artwork_id: 4},
   {collection_id: 2, artwork_id: 1},
   {collection_id: 2, artwork_id: 2},
   {collection_id: 2, artwork_id: 3},
   {collection_id: 2, artwork_id: 4},
   {collection_id: 3, artwork_id: 2},
   {collection_id: 4, artwork_id: 1},
  ])
}
