import { use, useImperativeHandle, useState } from 'react'
import { createStore, useStore } from 'zustand'
import { ModalContext } from './modal.context'
import type { ModalImperativeRef, ModalStore } from './modal.types'
import type { Ref } from 'react'

export function useModalContext<T = ModalStore>(selector: (state: ModalStore) => T = (state) => state as T): T {
  const store = use(ModalContext)

  if (!store) throw new Error('`useModalContext` must be used within a `Modal` Provider')

  return useStore(store, selector)
}

export function useModalActions() {
  return useModalContext((state) => state.actions)
}

function createModalStore(defaultOpen = false) {
  return createStore<ModalStore>((set) => ({
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

export function useCreateModalStore(
  ref?: Ref<ModalImperativeRef>,
  { defaultOpen = false }: { defaultOpen?: boolean } = {},
) {
  const [store] = useState(() => {
    return createModalStore(defaultOpen)
  })

  useImperativeHandle(ref, () => {
    const { actions } = store.getState()

    return actions
  })

  return store
}
