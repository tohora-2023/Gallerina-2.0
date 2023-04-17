import request from 'superagent'

import { ArtworkApi } from '../../models/externalArtwork'

export async function getArtwork(id: string): Promise<ArtworkApi> {
  const response = await request.get(`/api/v1/artworks/${id}`)
  return response.body
}
