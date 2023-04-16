import type { ThunkAction } from '../store'
import CollectionItems from '../../models/CollectionItems'
import {
  getAllCollectionItems,
  deleteCollectionItem,
} from '../apis/collection-items'

export const FETCH_COLLECTIONITEMS_PENDING = 'FETCH_COLLECTIONITEMS_PENDING'
export const FETCH_COLLECTIONITEMS_FULFILLED = 'FETCH_COLLECTIONITEMS_FULFILLED'
export const FETCH_COLLECTIONITEMS_REJECTED = 'FETCH_COLLECTIONITEMS_REJECTED'

// ADD CollectionItem
// export const ADD_COLLECTION_PENDING = 'ADD_COLLECTION_PENDING'
// export const ADD_COLLECTION_FULFILLED = 'ADD_COLLECTION_FULFILLED'
// export const ADD_COLLECTION_REJECTED = 'ADD_COLLECTION_REJECTED'

export type CollectionItemsAction =
  | {
      type: typeof FETCH_COLLECTIONITEMS_PENDING
      payload: void
    }
  | {
      type: typeof FETCH_COLLECTIONITEMS_FULFILLED
      payload: CollectionItems[]
    }
  | {
      type: typeof FETCH_COLLECTIONITEMS_REJECTED
      payload: string
    }

// ADD Collection Item
// | {
//     type: typeof ADD_COLLECTIONITEM_PENDING
//     payload: void
//   }
// | {
//     type: typeof ADD_COLLECTION_FULFILLED
//     payload: AddCollection
//   }
// | {
//     type: typeof ADD_COLLECTION_REJECTED
//     payload: string
//   }

export function fetchCollectionItemsPending(): CollectionItemsAction {
  return {
    type: FETCH_COLLECTIONITEMS_PENDING,
  } as CollectionItemsAction
}

export function fetchCollectionItemsFulfilled(
  items: CollectionItems[]
): CollectionItemsAction {
  return {
    type: FETCH_COLLECTIONITEMS_FULFILLED,
    payload: items,
  }
}

export function setError(errMessage: string): CollectionItemsAction {
  return {
    type: FETCH_COLLECTIONITEMS_REJECTED,
    payload: errMessage,
  }
}

export function getCollectionItems(id: number): ThunkAction {
  return (dispatch) => {
    dispatch(fetchCollectionItemsPending())
    return getAllCollectionItems(id)
      .then((items) => {
        dispatch(fetchCollectionItemsFulfilled(items))
      })
      .catch((err) => {
        dispatch(setError(err.message))
      })
  }
}

export function deleteItem(collectionId: number, artId: string): ThunkAction {
  return async (dispatch) => {
    try {
      const items = await deleteCollectionItem(collectionId, artId)
      dispatch(fetchCollectionItemsFulfilled(items))
    } catch (err: any) {
      dispatch(setError(err.message))
    }
  }
}
