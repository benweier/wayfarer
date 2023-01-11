import create, { StateCreator } from 'zustand/vanilla'

export const createVanillaStore = <T>(args: StateCreator<T, [], [], T>) => {
  const store = create<T>(args)

  const { getState, setState, subscribe, destroy } = store

  return {
    getState,
    setState,
    subscribe,
    destroy,
  }
}
