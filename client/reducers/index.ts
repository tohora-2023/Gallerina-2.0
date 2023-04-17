import { combineReducers } from 'redux'
import artInfo from './artworkInfo'
import art from './homepage'
import collectionsReducer from './profile'
import collectionItemsReducer from './collectionItems'

export default combineReducers({
  artInfoState: artInfo,
  artworkState: art,
  profileState: collectionsReducer,
  collectionItemsState: collectionItemsReducer,
})
