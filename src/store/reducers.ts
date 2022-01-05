import { combineReducers } from 'redux'
import { spacetradersAPI } from '@/services/spacetraders/core'
import { authReducer } from './auth'

export const reducer = combineReducers({
  [spacetradersAPI.reducerPath]: spacetradersAPI.reducer,
  auth: authReducer,
})
