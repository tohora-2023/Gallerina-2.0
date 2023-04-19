import type { ThunkAction } from '../store'
import { CollectionItem, AddNoteSnake } from '../../models/collectionContent'
import {
  addNote,
  getAllCollectionItems,
  deleteCollectionItem,
  deleteNote,
} from '../apis/collectionItems'

export const SET_PENDING = 'SET_PENDING'
export const SET_ERROR = 'SET_ERROR'
export const FETCH_COLLECTIONITEMS_FULFILLED = 'FETCH_COLLECTIONITEMS_FULFILLED'
export const ADD_NOTE_FULFILLED = 'ADD_NOTE_FULFILLED'
export const DELETE_NOTE_FULFILLED = 'DELETE_NOTE_FULFILLED'

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
      type: typeof DELETE_NOTE_FULFILLED
      payload: CollectionItem[]
    }
  | {
      type: typeof ADD_NOTE_FULFILLED
      payload: { artId: string; note: AddNoteSnake }
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

export function addNoteSuccess(
  artId: string,
  note: AddNoteSnake
): CollectionItemsAction {
  return {
    type: ADD_NOTE_FULFILLED,
    payload: { note, artId },
  }
}

export function deleteNoteSuccess(
  items: CollectionItem[]
): CollectionItemsAction {
  return {
    type: DELETE_NOTE_FULFILLED,
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

export function addNoteToArtwork(
  collectionId: number,
  newNote: AddNoteSnake,
  artId: string
): ThunkAction {
  return async (dispatch) => {
    try {
      await addNote(collectionId, newNote, artId)
      dispatch(addNoteSuccess(artId, newNote))
    } catch (err: any) {
      dispatch(setError(err.message))
    }
  }
}

export function deleteNoteFromArtwork(
  collectionId: number,
  noteId: number
): ThunkAction {
  return async (dispatch) => {
    try {
      const items = await deleteNote(collectionId, noteId)
      dispatch(fetchCollectionItemsFulfilled(items))
    } catch (err: any) {
      dispatch(setError(err.message))
    }
  }
}
