import { combineReducers } from 'redux'
import artInfo from './artwork-info'
import art from './homepage'
import collectionsReducer from './profile'
import collectionItemsReducer from './collection-items'

export default combineReducers({
  artInfoState: artInfo,
  artworkState: art,
  profileState: collectionsReducer,
  collectionItemsState: collectionItemsReducer,
})
