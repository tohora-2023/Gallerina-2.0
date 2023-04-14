import connection from './connection'
import { AddCollection } from '../../models/collection'
import { ArtworkDatabase } from '../../models/artwork'

export function getAllArt(db = connection) {
  return db('artworks')
}

export function createCollection(newCollection: AddCollection, db = connection) {
  return db('collection').insert(newCollection)
}

// export function addToCollection(artwork: ArtworkDatabase, collectionId: number, db = connection) {
//   return db('collection').insert(artwork).where(id: collectionId)
// }

export function getCollectionTitles(db = connection) {
  return db('collection').select('title')
}

// export function addArtworkToDB(artwork: ArtworkDatabase[], db = connection) {
//   return db('artworks').insert(artwork).onConflict('id').ignore()
// }
