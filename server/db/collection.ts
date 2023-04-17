import connection from './connection'
import { AddCollection } from '../../models/profile'
import { AddNote } from '../../models/CollectionItems'

export function getCollections(db = connection) {
  return db('collections').select()
}

export function getCollectionsById(id: number, db = connection) {
  return db("collections").join("users", "users.id", "collections.user_id")
  .where('collections.id', id )
}
// collections = { id, title, cover_img, user_id}
// users = { id, username, auth0id } 
// { id, title, cover_img, user_id, id, username, auth0id }

// finds user by auth0id
export async function getUserByAuth(auth: string, db = connection) {
  return db('users').where({ auth0id: auth }).first()
}

// gets user profile info
export async function getUserInfoAndCollections(user: number, db = connection) {
  return db('users')
    .join('collections', 'users.id', 'collections.user_id')
    .where('users.id', user)
    .select(
      'collections.id as collectionId',
      'collections.cover_img as collectionCoverImg',
      'collections.user_id as userId',
      'collections.title',
      'users.username',
      'users.auth0id'
    )
}

// Deletes a collection
export async function deleteCollection(id: number, db = connection) {
  await db('collections').where({ id }).del()
  return getCollections()
}

// Creates a new collection
export async function addCollection(
  newCollection: AddCollection,
  db = connection
) {
  await db('collections').insert(newCollection)
  return getCollections()
}

// GET A COLLECTION AND ARTWORKS BY ID + notes?
export function getArtCollectionAndNotesById(
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
    .where('collection_id', collectionId)
    .leftOuterJoin('notes', function () {
      this.on('artworks.id', '=', 'notes.artId').andOn(
        'collections.id',
        '=',
        'notes.collectionId'
      )
    })
    .select(
      'artwork_id as artworkId',
      'collection_id as collectionId',
      'collections.user_id as collectionOwnerId',
      'collections.title as collectionTitle',
      'artworks.title as artTitle',
      'artworks.imageLink as artImageLink',
      'notes.noteName as noteName',
      'notes.note as note',
      'notes.dateCreated as noteDateCreated',
      'notes.id as noteId'
    )
}

// delete a collection item by ID
export async function deleteCollectionItemById(
  collectionId: number,
  artId: string,
  db = connection
) {
  await db('collections_artworks')
    .where({ artwork_id: artId, collection_id: collectionId })
    .del()
  return getArtCollectionAndNotesById(collectionId)
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
