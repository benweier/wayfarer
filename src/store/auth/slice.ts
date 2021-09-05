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
      .addMatcher(spacetradersAPI.endpoints.claimUser.matchPending, (state) => {
        state.token = initialState.token
        state.user = initialState.user
        state.isAuthenticated = initialState.isAuthenticated
      })
      .addMatcher(spacetradersAPI.endpoints.claimUser.matchFulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addMatcher(spacetradersAPI.endpoints.claimUser.matchRejected, (state, action) => {
        console.error('rejected', action)
      })
  },
})

export const { logout } = slice.actions

export const authReducer = slice.reducer
