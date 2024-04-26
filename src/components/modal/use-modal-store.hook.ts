import { use } from 'react'
import { useStore } from 'zustand'
import { ModalContext } from './modal.context'
import type { ModalStore } from './modal.types'

export const useModalContext = <T = ModalStore>(selector: (state: ModalStore) => T = (state) => state as T): T => {
  const store = use(ModalContext)

  if (!store) throw new Error('`useModalContext` must be used within a `Modal` Provider')

  return useStore(store, selector)
}

export const useModalActions = () => {
  return useModalContext((state) => state.actions)
}
