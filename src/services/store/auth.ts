import { useStore } from 'zustand'
import { AgentResponse } from '@/types/spacetraders'
import { createVanillaStore } from './base'

type AuthState =
  | { agent: null; token: null; isAuthenticated: false }
  | { agent: AgentResponse; token: string; isAuthenticated: true }

type AuthHandlers = {
  setAuth: (state?: { agent?: AgentResponse | null; token?: string | null } | null) => void
}

type AuthStore = AuthState & AuthHandlers

const store = createVanillaStore<AuthStore>((set) => ({
  isAuthenticated: false,
  token: null,
  agent: null,
  setAuth: (state: { agent?: AgentResponse | null; token?: string | null } | null = null) => {
    if (!state) return set({ isAuthenticated: false, token: null, agent: null })

    if (state.agent && state.token) {
      return set({ isAuthenticated: true, token: state.token, agent: state.agent })
    }

    return set({ isAuthenticated: false, token: null, agent: null })
  },
}))

export const { getState, setState, subscribe } = store

export const useAuthStore = () => useStore(store)
