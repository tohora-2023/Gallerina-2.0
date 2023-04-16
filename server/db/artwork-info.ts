import connection from './connection'
import { ArtworkDatabase } from '../../models/artwork'

export function addArtworkToDB(artwork: ArtworkDatabase[], db = connection) {
  return db('artworks').insert(artwork).onConflict('id').ignore()
}
export function getArtworkById(id: string, db = connection) {
  return db('artworks').where({ id: id })
}
