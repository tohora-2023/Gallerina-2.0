import connection from './connection'
import { ArtworkDatabase } from '../../models/artwork'

export function addArtworkToDB(artwork: ArtworkDatabase[], db = connection) {
  return db('artworks').insert(artwork).onConflict('id').ignore()
}
