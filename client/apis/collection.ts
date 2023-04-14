import request from 'superagent'
//import model

import Collection from '../../models/collection'
import { AddCollection } from '../../models/collection'

const rootUrl = '/api/v1'

export async function getCollections(): Promise<Collection[]> {
  const response = await request.get(rootUrl + '/collections')
  console.log(response.body)
  return response.body
}

// ADDs a new collection to db
export async function addCollection(newCollection: AddCollection) {
  await request.post(rootUrl + '/newcollection').send(newCollection)
}
