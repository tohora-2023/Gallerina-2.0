import request from 'superagent'

import { Artworks } from '../../models/artwork'

export async function getAllArtworks(): Promise<Artworks> {
  const response = await request.get('/api/v1/artworks')
  return response.body
}