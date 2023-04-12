import { SET_FRUITS } from '../actions/Home'
import type { Action } from '../actions/Home'

const initialState = [] as string[]

const reducer = (state = initialState, action: Action) => {
  const { type, payload } = action
  switch (type) {
    case SET_FRUITS:
      return payload
    default:
      return state
  }
}

export default reducer
