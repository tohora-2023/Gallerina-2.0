import request from 'superagent'
import { AddCollection } from '../../models/collectionArtwork'
import { ProfileCollection } from '../../models/profile'

const rootUrl = '/api/v1'

export async function getCollectionDBsByUserId(
  id: number,
  token: string
): Promise<ProfileCollection[]> {
  const response = await request
    .get(rootUrl + `/profile/`)
    .query({ id })
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

// Adds a new collection to db
export async function addCollection(newCollection: AddCollection) {
  await request.post(rootUrl + '/newcollection').send(newCollection)
}

export async function collectionDelete(
  id: number,
  token: string
): Promise<request.Response> {
  return request
    .delete(rootUrl + `/profile/${id}`)
    .set('Authorization', `Bearer ${token}`)
}
