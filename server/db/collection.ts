import connection from './connection'
import AddCollection from '../../models/profile'

export function getCollections(db = connection) {
  return db('collections').select()
}

// finds user by auth0id
export async function getUserByAuth(auth: string, db = connection) {
  return db('users').where({ auth0id: auth }).first()
}

// gets user profile info
export async function getUserInfoAndCollections(user: number, db = connection) {
  return db('users')
    .join('collections', 'users.id', 'collections.user_id')
    .where('users.id', user)
    .select(
      'collections.id as collectionId',
      'collections.cover_img as collectionCoverImg',
      'collections.user_id as userId',
      'collections.title',
      'users.username',
      'users.auth0id'
    )
}

// Deletes a collection
export async function deleteCollection(id: number, db = connection) {
  await db('collections').where({ id }).del()
  return getCollections()
}

// Creates a new collection
export async function addCollection(
  newCollection: AddCollection,
  db = connection
) {
  await db('collections').insert(newCollection)
  return getCollections()
}

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

// delete a collection item by ID
export async function deleteCollectionItemById(
  collectionId: number,
  artId: string,
  db = connection
) {
  await db('collections_artworks')
    .where({ artwork_id: artId, collection_id: collectionId })
    .del()
  return getArtCollectionById(collectionId)
}
