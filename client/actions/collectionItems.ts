import type { ThunkAction } from '../store'
import { CollectionItem } from '../../models/collectionContent'
import {
  getAllCollectionItems,
  deleteCollectionItem,
} from '../apis/collectionItems'

export const SET_PENDING = 'SET_PENDING'
export const SET_ERROR = 'SET_ERROR'
export const FETCH_COLLECTIONITEMS_FULFILLED = 'FETCH_COLLECTIONITEMS_FULFILLED'

export type CollectionItemsAction =
  | {
      type: typeof SET_PENDING
      payload: void
    }
  | {
      type: typeof FETCH_COLLECTIONITEMS_FULFILLED
      payload: CollectionItem[]
    }
  | {
      type: typeof SET_ERROR
      payload: string
    }

 export function setError(errMessage: string): CollectionItemsAction {
      return {
        type: SET_ERROR,
        payload: errMessage,
      }
    }

export function setPending(): CollectionItemsAction {
  return {
    type: SET_PENDING,
  } as CollectionItemsAction
}

export function fetchCollectionItemsFulfilled(
  items: CollectionItem[]
): CollectionItemsAction {
  return {
    type: FETCH_COLLECTIONITEMS_FULFILLED,
    payload: items,
  }
}



export function geCollectionDBItems(id: number): ThunkAction {
  return (dispatch) => {
    dispatch(setPending())
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
