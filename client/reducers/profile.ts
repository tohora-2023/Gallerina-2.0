import Collection from '../../models/profile'
import {
  CollectionAction,
  FETCH_COLLECTIONS_PENDING,
  FETCH_COLLECTIONS_FULFILLED,
  FETCH_COLLECTIONS_REJECTED,
  ADD_COLLECTION_REJECTED,
  DELETE_COLLECTION_PENDING,
  DELETE_COLLECTION_REJECTED,
  DELETE_COLLECTION_FULFILLED,
  UPDATE_COLLECTION_PENDING,
  UPDATE_COLLECTION_REJECTED,
  UPDATE_COLLECTION_FULFILLED,
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

  // add DELETE_COLLECTION_PENDING, DELETE_COLLECTION_FULFILLED, DELETE_COLLECTION_REJECTED
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
    case DELETE_COLLECTION_FULFILLED:
      return {
        ...state,
        data: state.data?.filter(
          (collection) => collection.collectionId !== payload
        ),
        loading: false,
      }
    case DELETE_COLLECTION_PENDING:
      return {
        ...state,
        loading: true,
      }
    case DELETE_COLLECTION_REJECTED:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case UPDATE_COLLECTION_PENDING:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_COLLECTION_REJECTED:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case UPDATE_COLLECTION_FULFILLED:
      return {
        ...state,
        data: state.data?.map((collection) => {
          if (collection.collectionId === payload.collectionId) {
            return {
              ...collection,
              title: payload.title,
            }
          }
          return collection
        }),
        loading: false,
      }
    default:
      return state
  }
}

export default collectionsReducer
