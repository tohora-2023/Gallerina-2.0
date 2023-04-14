import request from 'superagent'

import { ArtworkApi } from '../../models/external-Artwork'
import Collection from '../../models/collection'

export async function getAllArtworks(): Promise<ArtworkApi> {
  const response = await request.get('/api/v1/artworks')
  return response.body
}

export async function getAllCollectionsApi(token: string): Promise<Collection[]> {
  const response = await request.get('/api/v1/home/user/collections').set('Authorization', `Bearer ${token}`)
  return response.body
}
