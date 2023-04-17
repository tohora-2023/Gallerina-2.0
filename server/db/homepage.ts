import connection from './connection'
import { TCollection } from '../../models/profile'

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

export function addNewCollection(newCollection: TCollection, db = connection ) {
  return db('collections').insert({...newCollection})
}