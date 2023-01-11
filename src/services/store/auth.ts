import create from 'zustand'
import { User } from '@/types/spacetraders'
import { createVanillaStore } from './base'

type AuthState =
  | { user: null; token: null; isAuthenticated: false }
  | { user: User; token: string; isAuthenticated: true }

type AuthHandlers = {
  setAuth: (state: { user?: User | null; token?: string | null } | null) => void
}

type AuthStore = AuthState & AuthHandlers

const store = createVanillaStore<AuthStore>((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  setAuth: (state: { user?: User | null; token?: string | null } | null) => {
    if (!state) return set({ isAuthenticated: false, token: null, user: null })

    if (state.user && state.token) {
      return set({ isAuthenticated: true, token: state.token, user: state.user })
    }

    return set({ isAuthenticated: false, token: null, user: null })
  },
}))

export const { getState, setState, subscribe, destroy } = store

export const useAuthStore = create(store)
