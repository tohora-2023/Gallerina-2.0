import request from 'superagent'

import { ArtworkApi } from '../../models/externalArtwork'

export async function getArtworksFromSearch(
  search: string
): Promise<ArtworkApi[]> {
  const response = await request.get('/api/v1/search').query({ search: search })
  return response.body
}
