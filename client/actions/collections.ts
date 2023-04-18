//  PROFILE RELATED COLLECTION FUNCTIONS -- API + REDUCER CALLED PROFILE.TS
import type { ThunkAction } from '../store'
import { ProfileCollection } from '../../models/profile'
import { AddCollection } from '../../models/collectionArtwork'
import { getCollectionDBsByUserId, collectionDelete } from '../apis/profile'

// SET profile pending & error states
export const SET_PENDING = 'SET_PENDING'
export const SET_ERROR = 'SET_ERROR'

// set profile actions success
export const SET_FETCH_COLLECTIONS = 'SET_FETCH_COLLECTIONS'
export const SET_ADD_COLLECTION = 'SET_ADD_COLLECTION'
export const SET_DELETE_COLLECTION = 'SET_DELETE_COLLECTION'

export type CollectionAction =
  | {
      type: typeof SET_ERROR
      payload: string
    }
  | {
      type: typeof SET_PENDING
      payload: void
    }
  | {
      type: typeof SET_FETCH_COLLECTIONS
      payload: ProfileCollection[]
    }
  | {
      type: typeof SET_ADD_COLLECTION
      payload: AddCollection
    }
  | {
      type: typeof SET_PENDING
      payload: void
    }
  | {
      type: typeof SET_DELETE_COLLECTION
      payload: number
    }

export function setPending(): CollectionAction {
  return {
    type: SET_PENDING,
  } as CollectionAction
}

export function setError(errMessage: string): CollectionAction {
  return {
    type: SET_ERROR,
    payload: errMessage,
  }
}

export function fetchCollectionsFullfilied(
  collections: ProfileCollection[]
): CollectionAction {
  return {
    type: SET_FETCH_COLLECTIONS,
    payload: collections,
  }
}

export function deleteCollectionFulfilled(
  collectionId: number
): CollectionAction {
  return {
    type: SET_DELETE_COLLECTION,
    payload: collectionId,
  }
}

export function fetchCollections(userId: number, token: string): ThunkAction {
  return (dispatch) => {
    dispatch(setPending())
    return getCollectionDBsByUserId(userId, token)
      .then((collections) => {
        dispatch(fetchCollectionsFullfilied(collections))
      })
      .catch((err) => {
        dispatch(setError(err.message))
      })
  }
}

export function deleteCollection(id: number, token: string): ThunkAction {
  return (dispatch) => {
    dispatch(setPending())

    return collectionDelete(id, token)
      .then(() => {
        dispatch(deleteCollectionFulfilled(id))
      })
      .catch((error) => {
        dispatch(setError(error.message))
      })
  }
}
