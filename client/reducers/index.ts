import { combineReducers } from 'redux'
import artInfo from './artwork-info'
import art from './homepage'
import collectionsReducer from './collection'
import collectionItemsReducer from './collection-items'

export default combineReducers({
  artInfoState: artInfo,
  artworkState: art,
  collectionState: collectionsReducer,
  collectionItemsState: collectionItemsReducer,
})
