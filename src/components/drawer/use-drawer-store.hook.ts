import { use } from 'react'
import { useStore } from 'zustand'
import { DrawerContext } from './drawer.context'
import type { DrawerStore } from './drawer.types'

export const useDrawerContext = <T = DrawerStore>(selector: (state: DrawerStore) => T = (state) => state as T): T => {
  const store = use(DrawerContext)

  if (!store) throw new Error('`useDrawerContext` must be used within a `Drawer` Provider')

  return useStore(store, selector)
}

export const useDrawerActions = () => {
  return useDrawerContext((state) => state.actions)
}
