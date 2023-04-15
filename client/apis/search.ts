import request from 'superagent'
import { ArtworkApi } from '../../models/external-Artwork'

export async function getArtworksFromSearch(): Promise<ArtworkApi> {
  const response = await request.get('/api/v1/search')
  return response.body
}
