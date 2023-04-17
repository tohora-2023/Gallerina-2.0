import connection from './connection'
import { ArtworkSnakeCaseDatabase } from '../../models/artwork'

export function getArtworkById(id: string, db = connection) {
  return db('artworks').where({ id: id })
}

// adds artworks array from api call to DB
export function addArtworksToDB(artworks: ArtworkSnakeCaseDatabase[], db = connection) {
  return db('artworks').insert(artworks).onConflict('id').ignore()
}
