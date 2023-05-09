import { useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { createStore } from 'zustand/vanilla'
import { AgentResponse } from '@/types/spacetraders'
import { BoundStoreSelector } from './store.types'

type AuthState =
  | { agent: null; token: null; isAuthenticated: false }
  | { agent: AgentResponse; token: string; isAuthenticated: true }

type AuthHandlers = {
  setAgent: (agent: AgentResponse) => void
  signin: (state: { agent: AgentResponse; token: string }) => void
  signout: () => void
}

type AuthStore = AuthState & AuthHandlers

const store = createStore<AuthStore>((set) => ({
  isAuthenticated: false,
  token: null,
  agent: null,
  setAgent: (agent) => {
    return set({ agent })
  },
  signin: (state) => {
    if (state.agent && state.token) {
      return set({ isAuthenticated: true, token: state.token, agent: state.agent })
    }
  },
  signout: () => {
    return set({ isAuthenticated: false, token: null, agent: null })
  },
}))

export const { getState, setState, subscribe } = store

export const useAuthStore: BoundStoreSelector<AuthStore> = (selector = (state: AuthStore) => state, equals = shallow) =>
  useStore(store, selector, equals)
