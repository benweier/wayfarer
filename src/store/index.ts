import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { spacetradersAPI } from '../services/spacetraders/core'
import auth from './auth'

export const store = configureStore({
  reducer: {
    [spacetradersAPI.reducerPath]: spacetradersAPI.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spacetradersAPI.middleware),
})

setupListeners(store.dispatch)
