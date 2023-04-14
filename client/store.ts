import { createStore, applyMiddleware } from 'redux'
import type { ThunkDispatch, ThunkAction as BaseThunkAction } from 'redux-thunk'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import reducers from './reducers'
import type { AnyAction } from 'redux'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, never, AnyAction>
export type ThunkAction = BaseThunkAction<
  Promise<unknown>,
  RootState,
  never,
  AnyAction
>
export default store
