import connection from './connection'

export function getAllArt(db = connection) {
  return db('artworks')
}