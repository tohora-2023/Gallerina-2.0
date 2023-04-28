import connection from './connection'
import { AddCollection } from '../../models/collectionArtwork'

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

export function getCollectionDBsById(id: number, db = connection) {
  return db('collections')
    .join('users', 'users.id', 'collections.user_id')
    .where('collections.id', id)
}

export async function addCollection(
  newCollection: AddCollection,
  db = connection
): Promise<{ id: number; title: string; coverImg: string }[]> {
  return db('collections')
    .insert(newCollection)
    .returning(['id', 'title', 'cover_img as coverImg'])
}

export function getCollections(db = connection) {
  return db('collections').select()
}

export function getCollectionsById(id: number, db = connection) {
  return db('collections')
    .join('users', 'users.id', 'collections.user_id')
    .where('collections.id', id)
}

export async function getUserByAuth(auth: string, db = connection) {
  return db('users').where({ auth0id: auth }).first()
}

export async function deleteCollection(id: number, db = connection) {
  await db('collections').where({ id }).del()
  return getCollections()
}

export async function updateCollection(
  id: number,
  title: string,
  db = connection
) {
  await db('collections').where({ id }).update({ title })
}

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
