import Collection from '../../models/collection'
import {
  CollectionAction,
  FETCH_COLLECTIONS_PENDING,
  FETCH_COLLECTIONS_FULFILLED,
  FETCH_COLLECTIONS_REJECTED,
  ADD_COLLECTION_REJECTED,
} from '../actions/collections'

interface CollectionsState {
  data: Collection[] | undefined
  error: string | undefined
  loading: boolean
}

const initialState: CollectionsState = {
  data: undefined,
  error: undefined,
  loading: false,
}

const collectionsReducer = (
  state = initialState,
  action: CollectionAction
): CollectionsState => {
  const { type, payload } = action
  switch (type) {
    case FETCH_COLLECTIONS_PENDING:
      return {
        data: undefined,
        error: undefined,
        loading: true,
      }
    case FETCH_COLLECTIONS_FULFILLED:
      return {
        data: payload,
        error: undefined,
        loading: false,
      }
    case FETCH_COLLECTIONS_REJECTED:
      return {
        data: undefined,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default collectionsReducer
