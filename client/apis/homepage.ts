import request from 'superagent'

import { ArtworkApi } from '../../models/externalArtwork'
import { AddCollection, CollectionDB } from '../../models/collectionArtwork'

export async function getAllArtworks(): Promise<ArtworkApi[]> {
  const response = await request.get('/api/v1/artworks')
  return response.body
}

export async function getAllCollectionsApi(
  token: string
): Promise<CollectionDB[]> {
  const response = await request
    .get('/api/v1/home/user/collections')
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

export async function addArtworkToCollectionApi(
  collectionId: number,
  artworkId: string
) {
  const response = await request
    .post('/api/v1/home/user/collections')
    .send({ collectionId, artworkId })
  return response.body
}

export async function addNewCollectionApi(token: string, newCollection: AddCollection | undefined): Promise<CollectionDB> {
  const response = await request
    .post('/api/v1/home/user/add-collection')
    .set('Authorization', `Bearer ${token}`)
    .send({ newCollection })
  return response.body
}
