import request from 'superagent'

import CollectionItems from '../../models/CollectionItems'
const rootUrl = '/api/v1'

export async function getAllCollectionItems(
  id: number
): Promise<CollectionItems[]> {
  const response = await request.get(rootUrl + `/profile/collections/${id}`)
  console.log('This apiclient fn has been hit! - line 10 collection-items.ts')
  return response.body
}
