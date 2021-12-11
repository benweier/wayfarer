import { createSlice } from '@reduxjs/toolkit'
import { spacetradersAPI } from '@/services/spacetraders/core'
import { User } from '@/types/spacetraders'

type AuthState =
  | { user: null; token: null; isAuthenticated: false }
  | { user: User; token: string; isAuthenticated: true }

type AccountStatus = {
  status: 'IDLE' | 'PENDING' | 'ERROR'
}

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: 'IDLE',
} as AuthState & AccountStatus

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(spacetradersAPI.endpoints.myAccount.matchPending, (state) => {
        state.status = 'PENDING'
      })
      .addMatcher(spacetradersAPI.endpoints.myAccount.matchFulfilled, (state, action) => {
        state.status = 'IDLE'
        state.token = action.meta.arg.originalArgs.token
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addMatcher(spacetradersAPI.endpoints.myAccount.matchRejected, (state) => {
        state.status = 'ERROR'
      })
      .addMatcher(spacetradersAPI.endpoints.takeOutLoan.matchFulfilled, (state, action) => {
        if (state.isAuthenticated) {
          state.user.credits = action.payload.credits
        }
      })
      .addMatcher(spacetradersAPI.endpoints.purchaseShip.matchFulfilled, (state, action) => {
        if (state.isAuthenticated) {
          state.user.credits = action.payload.credits
        }
      })
  },
})

export const { logout } = slice.actions

export const authReducer = slice.reducer
