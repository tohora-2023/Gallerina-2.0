import connection from './connection'
import AddCollection from '../../models/collection'

// profile
export function getCollections(db = connection) {
  return db('collections').select()
}

export async function deleteCollection(id: number, db = connection) {
  await db('collections').where({ id }).del()
  return getCollections()
}

export async function addCollection(
  newCollection: AddCollection,
  db = connection
) {
  await db('collections').insert(newCollection)
  return getCollections()
}

//collection-list
// export function getCollectionById(id: number, db = connection) {
//   // NEED TO JOIN COLLECTIONS TABLE W ARTWORKS TABLE - MANY TO MANY
//   return db('collections').where({ id: id }).select()
// }

// GET A COLLECTION AND ARTWORKS BY ID
export function getArtCollectionById(collectionId: number, db = connection) {
  return db('collections')
    .join(
      'collections_artworks',
      'collections.id',
      'collections_artworks.collection_id'
    )
    .join('artworks', 'artworks.id', 'collections_artworks.artwork_id')
    .where('collection_id', collectionId)
    .select(
      'artwork_id as artworkId',
      'collection_id as collectionId',
      'collections.user_id as collectionOwnerId',
      'collections.title as collectionTitle',
      'artworks.title as artTitle',
      'artworks.imageLink as artImageLink'
    )
}
