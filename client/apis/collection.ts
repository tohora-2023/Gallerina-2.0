import request from 'superagent'
//import model

import Collection from '../../models/collection'

const rootUrl = '/api/v1'

export async function fetchCollections(): Promise<Collection[]> {
  const response = await request.get(rootUrl + '/collections')
  return response.body
}
