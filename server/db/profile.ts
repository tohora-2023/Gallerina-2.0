import connection from './connection'
import { AddCollection } from '../../models/profile'
import { getCollections } from './collection'
// moved user-related info from collection.ts to profile.ts

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

// gets collections by ID -- collection ID? or userId? A collection only has one id?
export function getCollectionsById(id: number, db = connection) {
  return db("collections").join("users", "users.id", "collections.user_id")
  .where('collections.id', id )
}


// Deletes a collection  - by id, getCollections returns ALL collections regardless of who is logged in
export async function deleteCollection(id: number, db = connection) {
  await db('collections').where({ id }).del()
  return getCollections()
}

// Creates a new collection - getCollections returns ALL collections regardless of who is logged into
export async function addCollection(
  newCollection: AddCollection,
  db = connection
) {
  await db('collections').insert(newCollection)
  return getCollections()
}
