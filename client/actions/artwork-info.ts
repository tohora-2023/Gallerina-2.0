import { ArtworkApi } from '../../models/external-Artwork'
import { ArtworkDatabase } from '../../models/artwork'
import { getArtwork } from '../apis/artwork-info'
import type { ThunkAction } from '../store'

export const FETCH_ARTWORK_PENDING = 'FETCH_ARTWORK_PENDING'
export const FETCH_ARTWORK_FULFILLED = 'FETCH_ARTWORK_FULFILLED'
export const FETCH_ARTWORK_REJECTED = 'FETCH_ARTWORK_REJECTED'

export type ArtAction =
  | { type: typeof FETCH_ARTWORK_PENDING; payload: void }
  | {
      type: typeof FETCH_ARTWORK_FULFILLED
      payload: ArtworkApi | ArtworkDatabase
    }
  | { type: typeof FETCH_ARTWORK_REJECTED; payload: string }

export function fetchArtworkPending(): ArtAction {
  return {
    type: FETCH_ARTWORK_PENDING,
  } as ArtAction
}

export function fetchArtworkFulfilled(
  artworks: ArtworkApi | ArtworkDatabase
): ArtAction {
  return {
    type: FETCH_ARTWORK_FULFILLED,
    payload: artworks,
  }
}

export function fetchArtworkRejected(errorMessage: string): ArtAction {
  return {
    type: FETCH_ARTWORK_REJECTED,
    payload: errorMessage,
  }
}

export function fetchArtwork(id: string): ThunkAction {
  return (dispatch) => {
    dispatch(fetchArtworkPending())
    return getArtwork(id)
      .then((artwork: ArtworkApi | ArtworkDatabase) => {
        dispatch(fetchArtworkFulfilled(artwork))
      })
      .catch((error) => {
        dispatch(fetchArtworkRejected(error.message))
      })
  }
}
