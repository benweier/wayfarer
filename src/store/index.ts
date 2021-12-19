import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { middleware } from './middleware'
import { reducer } from './reducers'

export const store = configureStore({
  reducer,
  middleware,
})

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(reducer))
}

setupListeners(store.dispatch)
