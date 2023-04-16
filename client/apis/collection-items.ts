import request from 'superagent'

import CollectionItems from '../../models/CollectionItems'
const rootUrl = '/api/v1'

export async function getAllCollectionItems(
  id: number
): Promise<CollectionItems[]> {
  const response = await request.get(rootUrl + `/collections/${id}`)
  return response.body
}

export async function deleteCollectionItem(
  collectionId: number,
  artId: string
): Promise<CollectionItems[]> {
  const response = await request.delete(
    rootUrl + `/profile/collections/${collectionId}/${artId}`
  )
  return response.body
}
