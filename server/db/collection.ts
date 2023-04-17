import connection from './connection'
import { AddNote } from '../../models/collectionContent'

// gets all collections - regardless of wwho is logged in
export function geCollectionDBs(db = connection) {
  return db('collections').select()
}

// GET A COLLECTION, ARTWORKS AND NOTES BY ID
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

// delete a collection artwork by ID
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

export async function getNotesFromCollection(
  collectionId: number,
  db = connection
) {
  return db('notes').where({ collectionId })
}

// add a note to collection item
export async function addNote(
  collectionId: number,
  addNote: AddNote,
  artId: string,
  db = connection
) {
  const note = {
    ...addNote,
    artId,
    collectionId,
    dateCreated: new Date(Date.now()),
  }
  await db('notes').insert(note)
  return db('notes').where({ collectionId })
}

// delete a note from collection item
export async function deleteNote(noteId: number, db = connection) {
  await db('notes').where({ id: noteId }).delete()
}
