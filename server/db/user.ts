import connection from './connection'
import { AddUser } from '../../models/profile'

export async function addUser(user: AddUser, db = connection) {
  return db('users').insert(user).onConflict('auth0id').ignore()
}
