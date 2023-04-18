import type { ThunkAction } from '../store'
import TCollection from '../../models/profile'
import ProfileCollection, { AddCollection } from '../../models/profile'
import {
  getCollectionsByUserId,
  addCollection,
  collectionDelete,
  collectionUpdate
} from '../apis/profile'

// FETCH Collections
export const FETCH_COLLECTIONS_PENDING = 'FETCH_COLLECTIONS_PENDING'
export const FETCH_COLLECTIONS_FULFILLED = 'FETCH_COLLECTIONS_FULFILLED'
export const FETCH_COLLECTIONS_REJECTED = 'FETCH_COLLECTIONS_REJECTED'

// ADD Collection
export const ADD_COLLECTION_PENDING = 'ADD_COLLECTION_PENDING'
export const ADD_COLLECTION_FULFILLED = 'ADD_COLLECTION_FULFILLED'
export const ADD_COLLECTION_REJECTED = 'ADD_COLLECTION_REJECTED'

// DELETE Collection
export const DELETE_COLLECTION_PENDING = 'DELETE_COLLECTION_PENDING'
export const DELETE_COLLECTION_FULFILLED = 'DELETE_COLLECTION_FULFILLED'
export const DELETE_COLLECTION_REJECTED = 'DELETE_COLLECTION_REJECTED'

//UPDATE
export const UPDATE_COLLECTION_PENDING = 'UPDATE_COLLECTION_PENDING'
export const UPDATE_COLLECTION_FULFILLED = 'UPDATE_COLLECTION_FULFILLED'
export const UPDATE_COLLECTION_REJECTED = 'UPDATE_COLLECTION_REJECTED'


export type CollectionAction =
  // FETCH Collection
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
  // ADD Collection
  | {
      type: typeof ADD_COLLECTION_PENDING
      payload: void
    }
  | {
      type: typeof ADD_COLLECTION_FULFILLED
      payload: AddCollection
    }
  | {
      type: typeof ADD_COLLECTION_REJECTED
      payload: string
    }
  //DELETE Collection
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
    //UPDATE
    | {
      type: typeof UPDATE_COLLECTION_PENDING
      payload: void
    }
  | {
      type: typeof UPDATE_COLLECTION_FULFILLED
      payload: ProfileCollection
    }
  | {
      type: typeof UPDATE_COLLECTION_REJECTED
      payload: string
    }

// FETCH Collection
export function fetchCollectionsPending(): CollectionAction {
  return {
    type: FETCH_COLLECTIONS_PENDING,
  } as CollectionAction
}

export function fetchCollectionsFullfilied(
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
  } as CollectionAction
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
  } as CollectionAction
}

export function updateCollectionFulfilled(collectionId: number, collection: ProfileCollection): CollectionAction {
  return {
    type: UPDATE_COLLECTION_FULFILLED,
    payload: collectionId, collection
  } as CollectionAction
}

export function updateCollectionRejected(error: string): CollectionAction {
  return {
    type: UPDATE_COLLECTION_REJECTED,
    payload: error,
  }
}

export function fetchCollections(userId: number, token: string): ThunkAction {
  return (dispatch) => {
    dispatch(fetchCollectionsPending())
    return getCollectionsByUserId(userId, token)
      .then((collections) => {
        dispatch(fetchCollectionsFullfilied(collections))
      })
      .catch((err) => {
        dispatch(fetchCollectionsRejected(err.message))
      })
  }
}

export function deleteCollection(id: number, token: string): ThunkAction {
  return (dispatch) => {
    dispatch(deleteCollectionPending())

    return collectionDelete(id, token)
      .then(() => {
        dispatch(deleteCollectionFulfilled(id))
      })
      .catch((error) => {
        dispatch(deleteCollectionRejected(error.message))
      })
  }
}

export function updateCollection(id: number, collection: ProfileCollection, token: string): ThunkAction {
  return (dispatch) => {
    dispatch(updateCollectionPending())
    return collectionUpdate(id, collection, token)
    .then(() => {
      dispatch(updateCollectionFulfilled(id, collection))
    }) .catch((error) => {
      dispatch(updateCollectionRejected(error.message))
    })
  }
}