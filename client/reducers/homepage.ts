import { ArtworkApi } from '../../models/externalArtwork'

import {
  ArtAction,
  FETCH_ARTWORKS_PENDING,
  FETCH_ARTWORKS_FULFILLED,
  FETCH_ARTWORKS_REJECTED,
} from '../actions/homepage'

interface ArtworkState {
  data: ArtworkApi[] | undefined
  error: string | undefined
  loading: boolean
}

const initialState: ArtworkState = {
  data: undefined,
  error: undefined,
  loading: false,
}

const artworkReducer = (
  state = initialState,
  action: ArtAction
): ArtworkState => {
  const { type, payload } = action

  switch (type) {
    case FETCH_ARTWORKS_PENDING:
      return {
        data: undefined,
        error: undefined,
        loading: true,
      }
    case FETCH_ARTWORKS_FULFILLED:
      return {
        data: payload,
        error: undefined,
        loading: false,
      }
    case FETCH_ARTWORKS_REJECTED:
      return {
        data: undefined,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default artworkReducer
