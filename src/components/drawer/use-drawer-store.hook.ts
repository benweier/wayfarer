import { use, useImperativeHandle, useState } from 'react'
import { createStore, useStore } from 'zustand'
import { DrawerContext } from './drawer.context'
import type { DrawerImperativeRef, DrawerStore } from './drawer.types'
import type { Ref } from 'react'

export function useDrawerContext<T = DrawerStore>(selector: (state: DrawerStore) => T = (state) => state as T): T {
  const store = use(DrawerContext)

  if (!store) throw new Error('`useDrawerContext` must be used within a `Drawer` Provider')

  return useStore(store, selector)
}

function selector(state: DrawerStore) {
  return state.actions
}

export function useDrawerActions() {
  return useDrawerContext(selector)
}

function createDrawerStore(defaultOpen = false) {
  return createStore<DrawerStore>((set) => ({
    isOpen: defaultOpen,
    actions: {
      open: () => {
        set({ isOpen: true })
      },
      close: () => {
        set({ isOpen: false })
      },
      toggle: () => {
        set(({ isOpen }) => ({ isOpen: !isOpen }))
      },
    },
  }))
}

export function useCreateDrawerStore(
  ref?: Ref<DrawerImperativeRef>,
  { defaultOpen = false }: { defaultOpen?: boolean } = {},
) {
  const [store] = useState(() => {
    return createDrawerStore(defaultOpen)
  })

  useImperativeHandle(ref, () => {
    const { actions } = store.getState()

    return actions
  })

  return store
}
