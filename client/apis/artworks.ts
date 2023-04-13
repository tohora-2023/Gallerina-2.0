import request from 'superagent'

import { ArtworkApi } from '../../models/external-Artwork'

export async function getAllArtworks(): Promise<ArtworkApi> {
  const response = await request.get('/api/v1/artworks')
  return response.body
}