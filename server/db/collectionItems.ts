import connection from './connection'
import { AddNoteSnake } from '../../models/collectionContent'

export function geCollectionDBs(db = connection) {
  return db('collections').select()
}

export function getArtCollectionDBAndNotesById(
  collectionId: number,
  db = connection
) {
  return db('collections')
    .join(
      'collections_artworks',
      'collections.id',
      'collections_artworks.collection_id'
    )
    .join('artworks', 'artworks.id', 'collections_artworks.artwork_id')
    .where('collections_artworks.collection_id', collectionId)
    .leftOuterJoin('notes', function () {
      this.on('artworks.id', '=', 'notes.art_id').andOn(
        'collections.id',
        '=',
        'notes.collection_id'
      )
    })
    .select(
      'collections_artworks.artwork_id as artworkId',
      'collections_artworks.collection_id as collectionId',
      'collections.user_id as collectionOwnerId',
      'collections.title as collectionTitle',
      'artworks.title as artTitle',
      'artworks.image_link as artImageLink',
      'notes.note_name as noteName',
      'notes.note as note',
      'notes.date_created as noteDateCreated',
      'notes.id as noteId'
    )
}

export async function deleteCollectionItemById(
  collectionId: number,
  artId: string,
  db = connection
) {
  await db('collections_artworks')
    .where({ artwork_id: artId, collection_id: collectionId })
    .del()
  return getArtCollectionDBAndNotesById(collectionId)
}

export async function addNote(
  collectionId: number,
  addNote: AddNoteSnake,
  artId: string,
  db = connection
) {
  const note = {
    ...addNote,
    art_id: artId,
    collection_id: collectionId,
    date_created: new Date(Date.now()),
  }
  await db('notes').insert(note)
  return db('notes').where({ collection_id: collectionId })
}

export async function deleteNote(noteId: number, db = connection) {
  return await db('notes').where({ id: noteId }).delete()
}
