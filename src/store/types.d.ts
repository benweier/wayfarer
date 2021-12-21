import { ThunkAction } from '@reduxjs/toolkit'
import { store } from './index'
import { reducer } from './reducers'

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
