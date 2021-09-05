import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { middleware } from './middleware'
import { reducer } from './reducers'

export const store = configureStore({
  reducer,
  middleware,
})

setupListeners(store.dispatch)
