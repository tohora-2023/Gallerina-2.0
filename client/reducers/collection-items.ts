import CollectionItem from '../../models/CollectionItems'
import {
  CollectionItemsAction,
  FETCH_COLLECTIONITEMS_PENDING,
  FETCH_COLLECTIONITEMS_FULFILLED,
  FETCH_COLLECTIONITEMS_REJECTED,
} from '../actions/collection-items'

interface CollectionItemsState {
  data: CollectionItem[] | undefined
  error: string | undefined
  loading: boolean
}

const initialState: CollectionItemsState = {
  data: undefined,
  error: undefined,
  loading: false,
}

const collectionItemsReducer = (
  state = initialState,
  action: CollectionItemsAction
): CollectionItemsState => {
  const { type, payload } = action
  switch (type) {
    case FETCH_COLLECTIONITEMS_PENDING:
      return {
        data: undefined,
        error: undefined,
        loading: true,
      }
    case FETCH_COLLECTIONITEMS_FULFILLED:
      return {
        data: payload,
        error: undefined,
        loading: false,
      }
    case FETCH_COLLECTIONITEMS_REJECTED:
      return {
        data: undefined,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default collectionItemsReducer
