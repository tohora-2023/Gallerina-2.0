import connection from './connection'
import { AddCollection } from '../../models/collectionArtwork'

export function getAllArt(db = connection) {
  return db('artworks')
}

export function getCollectionsByUserId(auth0Id: string, db = connection) {
  return db('collections')
    .join('users', 'collections.user_id', 'users.id')
    .where('users.auth0id', auth0Id)
    .select('collections.title', 'collections.id')
}

export function addArtworkToCollection(
  collection_id: number,
  artwork_id: string,
  db = connection
) {
  return db('collections_artworks').insert({ collection_id, artwork_id })
}

export function getUserId(auth0id: string, db = connection) {
  return db('users').select('id').where('auth0id', auth0id).first()
}

export async function addNewCollection(
  auth0id: string,
  newCollection: AddCollection,
  db = connection
) {
  const { id } = await getUserId(auth0id)
  return db('collections')
    .insert({
      user_id: id,
      cover_img: newCollection.coverImg,
      title: newCollection.title,
    })
    .returning(['id', 'title'])
}
