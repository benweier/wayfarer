import type { RootState } from 'store/types.d'

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectCurrentUser = (state: RootState) => state.auth.user
