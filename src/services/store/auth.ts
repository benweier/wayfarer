import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'
import { AgentResponse } from '@/types/spacetraders'

type AuthState =
  | { agent: null; token: null; isAuthenticated: false }
  | { agent: AgentResponse; token: string; isAuthenticated: true }

type AuthHandlers = {
  setAuth: (state?: { agent?: AgentResponse; token?: string } | null) => void
}

type AuthStore = AuthState & AuthHandlers

const store = createStore<AuthStore>((set) => ({
  isAuthenticated: false,
  token: null,
  agent: null,
  setAuth: (state) => {
    if (!state) return set({ isAuthenticated: false, token: null, agent: null })

    if (state.agent && state.token) {
      return set({ isAuthenticated: true, token: state.token, agent: state.agent })
    }

    return set({ isAuthenticated: false, token: null, agent: null })
  },
}))

export const { getState, setState, subscribe, destroy } = store

export const useAuthStore = () => useStore(store)
