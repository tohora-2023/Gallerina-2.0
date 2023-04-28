import type { ThunkAction } from '../store'
import { ProfileCollection } from '../../models/profile'
import * as API from '../apis/profile'

export const FETCH_COLLECTIONS_PENDING = 'FETCH_COLLECTIONS_PENDING'
export const FETCH_COLLECTIONS_FULFILLED = 'FETCH_COLLECTIONS_FULFILLED'
export const FETCH_COLLECTIONS_REJECTED = 'FETCH_COLLECTIONS_REJECTED'

export const ADD_COLLECTION_PENDING = 'ADD_COLLECTION_PENDING'
export const ADD_COLLECTION_FULFILLED = 'ADD_COLLECTION_FULFILLED'
export const ADD_COLLECTION_REJECTED = 'ADD_COLLECTION_REJECTED'

export const DELETE_COLLECTION_PENDING = 'DELETE_COLLECTION_PENDING'
export const DELETE_COLLECTION_FULFILLED = 'DELETE_COLLECTION_FULFILLED'
export const DELETE_COLLECTION_REJECTED = 'DELETE_COLLECTION_REJECTED'

export const UPDATE_COLLECTION_PENDING = 'UPDATE_COLLECTION_PENDING'
export const UPDATE_COLLECTION_FULFILLED = 'UPDATE_COLLECTION_FULFILLED'
export const UPDATE_COLLECTION_REJECTED = 'UPDATE_COLLECTION_REJECTED'

export type CollectionAction =
  | {
      type: typeof FETCH_COLLECTIONS_PENDING
      payload: void
    }
  | {
      type: typeof FETCH_COLLECTIONS_FULFILLED
      payload: ProfileCollection[]
    }
  | {
      type: typeof FETCH_COLLECTIONS_REJECTED
      payload: string
    }
  | {
      type: typeof ADD_COLLECTION_PENDING
      payload: void
    }
  | {
      type: typeof ADD_COLLECTION_FULFILLED
      payload: { id: number; title: string }
    }
  | {
      type: typeof ADD_COLLECTION_REJECTED
      payload: string
    }
  | {
      type: typeof DELETE_COLLECTION_PENDING
      payload: void
    }
  | {
      type: typeof DELETE_COLLECTION_FULFILLED
      payload: number
    }
  | {
      type: typeof DELETE_COLLECTION_REJECTED
      payload: string
    }
  | {
      type: typeof UPDATE_COLLECTION_PENDING
      payload: void
    }
  | {
      type: typeof UPDATE_COLLECTION_FULFILLED
      payload: { collectionId: number; title: string }
    }
  | {
      type: typeof UPDATE_COLLECTION_REJECTED
      payload: string
    }

export function fetchCollectionsPending(): CollectionAction {
  return {
    type: FETCH_COLLECTIONS_PENDING,
    payload: undefined,
  }
}

export function fetchCollectionsFullfilled(
  collections: ProfileCollection[]
): CollectionAction {
  return {
    type: FETCH_COLLECTIONS_FULFILLED,
    payload: collections,
  }
}

export function fetchCollectionsRejected(errMessage: string): CollectionAction {
  return {
    type: FETCH_COLLECTIONS_REJECTED,
    payload: errMessage,
  }
}

export function deleteCollectionPending(): CollectionAction {
  return {
    type: DELETE_COLLECTION_PENDING,
    payload: undefined,
  }
}

export function deleteCollectionFulfilled(
  collectionId: number
): CollectionAction {
  return {
    type: DELETE_COLLECTION_FULFILLED,
    payload: collectionId,
  }
}

export function deleteCollectionRejected(error: string): CollectionAction {
  return {
    type: DELETE_COLLECTION_REJECTED,
    payload: error,
  }
}

export function updateCollectionPending(): CollectionAction {
  return {
    type: UPDATE_COLLECTION_PENDING,
    payload: undefined,
  }
}

export function updateCollectionFulfilled(
  collectionId: number,
  title: string
): CollectionAction {
  return {
    type: UPDATE_COLLECTION_FULFILLED,
    payload: { collectionId, title },
  }
}

export function updateCollectionRejected(error: string): CollectionAction {
  return {
    type: UPDATE_COLLECTION_REJECTED,
    payload: error,
  }
}

export function addCollectionPending(): CollectionAction {
  return {
    type: ADD_COLLECTION_PENDING,
    payload: undefined,
  }
}

export function addCollectionFulfilled(
  id: number,
  title: string
): CollectionAction {
  return {
    type: ADD_COLLECTION_FULFILLED,
    payload: { id, title },
  } as CollectionAction
}

export function addCollectionRejected(error: string): CollectionAction {
  return {
    type: ADD_COLLECTION_REJECTED,
    payload: error,
  }
}

export function fetchCollections(userId: number, token: string): ThunkAction {
  return (dispatch) => {
    dispatch(fetchCollectionsPending())
    return API.getCollectionDBsByUserId(userId, token)
      .then((collections) => {
        dispatch(fetchCollectionsFullfilled(collections))
      })
      .catch((err) => {
        dispatch(fetchCollectionsRejected(err.message))
      })
  }
}

export function deleteCollection(id: number, token: string): ThunkAction {
  return (dispatch) => {
    dispatch(deleteCollectionPending())

    return API.collectionDelete(id, token)
      .then(() => {
        dispatch(deleteCollectionFulfilled(id))
      })
      .catch((error) => {
        dispatch(deleteCollectionRejected(error.message))
      })
  }
}

export function updateCollection(
  id: number,
  title: string,
  token: string
): ThunkAction {
  return (dispatch) => {
    dispatch(updateCollectionPending())
    return API.collectionUpdate(id, title, token)
      .then(() => {
        dispatch(updateCollectionFulfilled(id, title))
      })
      .catch((error) => {
        dispatch(updateCollectionRejected(error.message))
      })
  }
}

export function addCollection(title: string, token: string): ThunkAction {
  return (dispatch) => {
    dispatch(addCollectionPending())
    return API.addCollection({ title }, token)
      .then((collections) => {
        dispatch(fetchCollectionsFullfilled(collections))
      })
      .catch((error) => {
        dispatch(updateCollectionRejected(error.message))
      })
  }
}
