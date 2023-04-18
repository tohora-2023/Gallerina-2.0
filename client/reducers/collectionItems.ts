import { CollectionItem } from '../../models/collectionContent'
import {
  CollectionItemsAction,
  SET_PENDING,
  FETCH_COLLECTIONITEMS_FULFILLED,
  SET_ERROR,
} from '../actions/collectionItems'

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
    case SET_PENDING:
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
    case SET_ERROR:
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
