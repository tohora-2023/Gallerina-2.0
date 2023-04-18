import connection from './connection'
import { AddCollection } from '../../models/collectionArtwork'

export function getAllArt(db = connection) {
  return db('artworks')
}

export function geCollectionDBsByUserId(auth0Id: string, db = connection) {
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

export function addNewCollection(newCollection: AddCollection, db = connection ) {
  return db('collections').insert({...newCollection})
}