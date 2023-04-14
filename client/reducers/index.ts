import { combineReducers } from 'redux'

import art from './artworks'
import collectionsReducer from './collection'

export default combineReducers({
  artworkState: art,
  collectionState: collectionsReducer,
})
