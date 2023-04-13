import { Artworks } from '../../models/artwork'
import { getAllArtworks } from '../apis/artworks'
import type { ThunkAction } from '../store'

export const FETCH_ARTWORKS_PENDING = 'FETCH_ARTWORKS_PENDING'
export const FETCH_ARTWORKS_FULFILLED = 'FETCH_ARTWORKS_FULFILLED'
export const FETCH_ARTWORKS_REJECTED = 'FETCH_ARTWORKS_REJECTED'

export type ArtAction =
  | { type: typeof FETCH_ARTWORKS_PENDING; payload: void }
  | { type: typeof FETCH_ARTWORKS_FULFILLED; payload: Artworks }
  | { type: typeof FETCH_ARTWORKS_REJECTED; payload: string }

export function fetchArtworksPending(): ArtAction {
  return {
    type: FETCH_ARTWORKS_PENDING,
  } as ArtAction
}

export function fetchArtworksFulfilled(artworks: Artworks): ArtAction {
  return {
    type: FETCH_ARTWORKS_FULFILLED,
    payload: artworks,
  }
}

export function fetchArtworksRejected(errorMessage: string): ArtAction {
  return {
    type: FETCH_ARTWORKS_REJECTED,
    payload: errorMessage,
  }
}

export function fetchArtworkImage(): ThunkAction {
  return (dispatch) => {
    dispatch(fetchArtworksPending())
    return getAllArtworks()
      .then((artworks) => {
        dispatch(fetchArtworksFulfilled(artworks))
      })
      .catch((error) => {
        dispatch(fetchArtworksRejected(error.message))
      })
  }
}