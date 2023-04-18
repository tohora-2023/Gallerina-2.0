import request from 'superagent'
import { CollectionItem, AddNote } from '../../models/collectionContent'

const rootUrl = '/api/v1'

export async function getAllCollectionItems(
  id: number
): Promise<CollectionItem[]> {
  const response = await request.get(`${rootUrl}/collections/${id}`)
  return response.body
}

export async function deleteCollectionItem(
  collectionId: number,
  artId: string
): Promise<CollectionItem[]> {
  const response = await request.delete(
    `${rootUrl}/collections/${collectionId}/${artId}`
  )
  return response.body
}

export async function addNote(
  collectionId: number,
  note: AddNote,
  artId: string
) {
  await request
    .post(`${rootUrl}/collections/${collectionId}/${artId}`)
    .send(note)
}
