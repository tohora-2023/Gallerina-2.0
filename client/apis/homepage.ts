import request from 'superagent'
import { ArtworkCollection } from '../../models/collection-artwork'

import { ArtworkApi } from '../../models/external-Artwork'
import TCollection from '../../models/profile'

export async function getAllArtworks(): Promise<ArtworkApi> {
  const response = await request.get('/api/v1/artworks')
  return response.body
}

export async function getAllCollectionsApi(): Promise<TCollection[]> {
  const response = await request.get('/api/v1/home/user/collections')
  return response.body
}

export async function addArtworkToCollectionApi(
  collectionId: number,
  artworkId: number
) {
  const response = await request
    .post('/api/v1/home/user/collections')
    .send(collectionId, artworkId)
  return response.body
}
