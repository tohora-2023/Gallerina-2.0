import request from 'superagent'
//import model

import TCollection from '../../models/collection'
import { AddCollection } from '../../models/collection'

const rootUrl = '/api/v1'

export async function getCollections(): Promise<TCollection[]> {
  const response = await request.get(rootUrl + '/profile/collections')
  return response.body
}

// ADDs a new collection to db
export async function addCollection(newCollection: AddCollection) {
  await request.post(rootUrl + '/newcollection').send(newCollection)
}
