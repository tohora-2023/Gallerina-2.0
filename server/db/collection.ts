import connection from './connection'

export function getCollections(db = connection) {
  return db('collections')
}
