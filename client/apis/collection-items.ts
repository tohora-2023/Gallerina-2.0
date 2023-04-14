import request from 'superagent'
const rootUrl = '/api/v1'
import CollectionItems from '../../models/CollectionItems'

export async function getAllCollectionItems(
  id: number
): Promise<CollectionItems[]> {
  const response = await request.get(rootUrl + `/collections/${id}`)
  return response.body
}
