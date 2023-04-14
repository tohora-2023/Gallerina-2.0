import type { ThunkAction } from '../store'
import CollectionItems from '../../models/CollectionItems'
import { AddCollectionItem } from '../../models/CollectionItems'
import { getAllCollectionItems } from '../apis/collection-items'

// FETCH COLLECTIONITEMS
export const FETCH_COLLECTIONITEMS_PENDING = 'FETCH_COLLECTIONITEMS_PENDING'
export const FETCH_COLLECTIONITEMS_FULFILLED = 'FETCH_COLLECTIONITEMS_FULFILLED'
export const FETCH_COLLECTIONITEMS_REJECTED = 'FETCH_COLLECTIONITEMS_REJECTED'

// ADD Collection
// export const ADD_COLLECTION_PENDING = 'ADD_COLLECTION_PENDING'
// export const ADD_COLLECTION_FULFILLED = 'ADD_COLLECTION_FULFILLED'
// export const ADD_COLLECTION_REJECTED = 'ADD_COLLECTION_REJECTED'

export type CollectionItemsAction =
  // FETCH Collection
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

// ADD Collection
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

export function fetchCollectionItemsFullfilied(
  items: CollectionItems[]
): CollectionItemsAction {
  return {
    type: FETCH_COLLECTIONITEMS_FULFILLED,
    payload: items,
  }
}

export function fetchCollectionsRejected(
  errMessage: string
): CollectionItemsAction {
  return {
    type: FETCH_COLLECTIONITEMS_REJECTED,
    payload: errMessage,
  }
}

export function fetchCollectionItems(id: number): ThunkAction {
  return (dispatch) => {
    dispatch(fetchCollectionItemsPending())
    console.log('thunk action line 72 in fetchCollectionItems')
    return getAllCollectionItems(id)
      .then((items) => {
        dispatch(fetchCollectionItemsFullfilied(items))
      })
      .catch((err) => {
        dispatch(fetchCollectionsRejected(err.message))
      })
  }
}
