import { combineReducers } from 'redux'
import { authReducer } from './auth'
import { spacetradersAPI } from '@/services/spacetraders/core'

export const reducer = combineReducers({
  [spacetradersAPI.reducerPath]: spacetradersAPI.reducer,
  auth: authReducer,
})
