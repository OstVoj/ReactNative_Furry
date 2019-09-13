import { combineReducers } from 'redux'

import { AppReducers } from 'src/reducers'

import auth from './auth'

const ffwApp = combineReducers({
  auth,
  ...AppReducers
})

export default ffwApp
