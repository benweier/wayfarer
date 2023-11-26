import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'
import { client } from '@/services/query-client'
import { type AgentResponse } from '@/types/spacetraders'
import { type BoundStoreSelector } from './store.types'

type AuthState =
  | { agent: null; token: null; isAuthenticated: false }
  | { agent: AgentResponse; token: string; isAuthenticated: true }

type AuthHandlers = {
  setAgent: (agent: AgentResponse) => void
  signin: (state: { agent: AgentResponse; token: string }) => void
  signout: () => void
}

type AuthStore = AuthState & { actions: AuthHandlers }

const store = createStore<AuthStore>((set) => ({
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

export const { getState, setState, subscribe } = store

export const useAuthStore: BoundStoreSelector<AuthStore> = (selector = (state: AuthStore) => state) =>
  useStore(store, selector)
