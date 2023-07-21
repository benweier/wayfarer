import { createStore } from 'zustand/vanilla'
import { type StateCreator } from 'zustand/vanilla'

export const createVanillaStore = <T>(args: StateCreator<T, [], [], T>) => {
  const store = createStore<T>(args)

  const { getState, setState, subscribe, destroy } = store

  return {
    getState,
    setState,
    subscribe,
    destroy,
  }
}
