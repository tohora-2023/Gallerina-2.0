import { ArtworkDatabase } from '../../models/artwork'
import { ArtworkApi } from '../../models/externalArtwork'

import {
  ArtAction,
  FETCH_ARTWORK_PENDING,
  FETCH_ARTWORK_FULFILLED,
  FETCH_ARTWORK_REJECTED,
} from '../actions/artworkInfo'

interface ArtworkState {
  data: ArtworkApi | ArtworkDatabase | undefined
  error: string | undefined
  loading: boolean
}

const initialState: ArtworkState = {
  data: undefined,
  error: undefined,
  loading: false,
}

const artInfo = (state = initialState, action: ArtAction): ArtworkState => {
  const { type, payload } = action

  switch (type) {
    case FETCH_ARTWORK_PENDING:
      return {
        data: undefined,
        error: undefined,
        loading: true,
      }
    case FETCH_ARTWORK_FULFILLED:
      return {
        data: payload,
        error: undefined,
        loading: false,
      }
    case FETCH_ARTWORK_REJECTED:
      return {
        data: undefined,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default artInfo
