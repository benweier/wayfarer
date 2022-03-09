import { configureStore } from '@reduxjs/toolkit'
import { spacetradersAPI } from '@/services/spacetraders/core'
import { reducer } from './reducers'

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spacetradersAPI.middleware),
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers', () => {
    import('./reducers')
      .then((mod) => {
        store.replaceReducer(mod.reducer)
      })
      .catch(() => {
        window.location.reload()
      })
  })
}
