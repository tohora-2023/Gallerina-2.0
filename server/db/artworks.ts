import connection from './connection'

export function getAllArt(db = connection) {
  return db('artworks')
}

export function getCollections(db = connection) {
  return db('collections').select()
}

export function getCollectionsByUserId(auth0Id: string, db = connection) {
  return db('collections').join('users', 'collections.user_id', 'users.id').where('auth0id', auth0Id).select('collections.title', 'collections.id')
}









// export function addToCollection(artwork: ArtworkDatabase, collectionId: number, db = connection) {
//   return db('collection').insert(artwork).where(id: collectionId)
// }

// export function addArtworkToDB(artwork: ArtworkDatabase[], db = connection) {
//   return db('artworks').insert(artwork).onConflict('id').ignore()
// }
