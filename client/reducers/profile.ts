import { ProfileCollection }from '../../models/profile'
import {
  CollectionAction,
  SET_PENDING,
  SET_FETCH_COLLECTIONS,
  SET_ERROR,
} from '../actions/collections'

interface CollectionsState {
  data: ProfileCollection[] | undefined
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
    case SET_PENDING:
      return {
        data: undefined,
        error: undefined,
        loading: true,
      }
    case SET_FETCH_COLLECTIONS:
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

export default collectionsReducer
