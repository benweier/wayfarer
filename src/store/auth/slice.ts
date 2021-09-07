import { createSlice } from '@reduxjs/toolkit'
import { spacetradersAPI } from 'services/spacetraders/core'
import { User } from 'types/spacetraders'

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
} as { user: null | User; token: null | string; isAuthenticated: boolean }

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(spacetradersAPI.endpoints.myAccount.matchPending, () => {
        //
      })
      .addMatcher(spacetradersAPI.endpoints.myAccount.matchFulfilled, (state, action) => {
        state.token = action.meta.arg.originalArgs.token
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addMatcher(spacetradersAPI.endpoints.myAccount.matchRejected, () => {
        //
      })
  },
})

export const { logout } = slice.actions

export const authReducer = slice.reducer
