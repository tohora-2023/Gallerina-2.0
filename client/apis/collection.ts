import request from 'superagent'
import TCollection from '../../models/collection'
import { AddCollection } from '../../models/collection'

const rootUrl = '/api/v1'

// gets ALL collections - perhaps refactor as CollectionsByUserId?
export async function getCollections(): Promise<TCollection[]> {
  const response = await request.get(rootUrl + '/profile')
  return response.body
}

// ADDs a new collection to db
export async function addCollection(newCollection: AddCollection) {
  await request.post(rootUrl + '/newcollection').send(newCollection)
}
