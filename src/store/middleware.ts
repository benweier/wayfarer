import { ConfigureStoreOptions } from '@reduxjs/toolkit'
import { spacetradersAPI } from 'services/spacetraders/core'

export const middleware: ConfigureStoreOptions['middleware'] = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(spacetradersAPI.middleware)
