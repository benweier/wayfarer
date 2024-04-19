import { client } from '@/services/query-client'
import type { AgentResponse } from '@/types/spacetraders'
import { useStore } from 'zustand/react'
import { createStore } from 'zustand/vanilla'
import type { BoundStoreSelector } from './store.types'

export type AuthState =
  | { agent: null; token: null; isAuthenticated: false }
  | { agent: AgentResponse; token: string; isAuthenticated: true }

export type AuthHandlers = {
  setAgent: (agent: AgentResponse) => void
  signin: (state: { agent: AgentResponse; token: string }) => void
  signout: () => void
}

export type AuthStore = AuthState & { actions: AuthHandlers }

export const authStore = createStore<AuthStore>((set) => ({
  isAuthenticated: false,
  token: null,
  agent: null,
  actions: {
    setAgent: (agent) => {
      set({ agent })
    },
    signin: (state) => {
      client.clear()
      set({ isAuthenticated: true, token: state.token, agent: state.agent })
    },
    signout: () => {
      client.clear()
      set({ isAuthenticated: false, token: null, agent: null })
    },
  },
}))

export const useAuthStore: BoundStoreSelector<AuthStore> = (selector = (state: AuthStore) => state) =>
  useStore(authStore, selector)
