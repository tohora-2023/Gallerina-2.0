import request from 'superagent'
import { TCollection } from '../../models/profile'
import ProfileCollection from '../../models/profile'
import { AddCollection } from '../../models/profile'

const rootUrl = '/api/v1'

export async function getCollectionsByUserId(
  id: number,
  token: string
): Promise<ProfileCollection[]> {
  const response = await request
    .get(rootUrl + `/profile/`)
    .query({ id })
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

// ADDs a new collection to db
export async function addCollection(newCollection: AddCollection) {
  await request.post(rootUrl + '/newcollection').send(newCollection)
}
