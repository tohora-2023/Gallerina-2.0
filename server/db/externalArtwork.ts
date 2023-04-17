import connection from './connection'
import { ArtworkDatabase } from '../../models/artwork'

export function getArtworkById(id: string, db = connection) {
  return db('artworks').where({ id: id })
}

// adds artworks array from api call to DB
export function addArtworksToDB(artworks: ArtworkDatabase[], db = connection) {
  return db('artworks').insert(artworks).onConflict('id').ignore()
}
