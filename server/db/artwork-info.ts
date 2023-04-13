import connection from './connection'
import { Artwork } from '../../models/artwork'

export function addArtworkToDB(artwork: Artwork[], db = connection) {
  return db('artworks').insert(artwork).onConflict('id').ignore()
}
