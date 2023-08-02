import { useCallback, useContext } from 'react'
import { useStore } from 'zustand'
import { ModalContext } from './modal.context'
import { type ModalStore } from './modal.types'

export const useModalContext = <T>(selector: (state: ModalStore) => T): T => {
  const store = useContext(ModalContext)

  if (!store) throw new Error('`useModalContext` must be used within a `Modal` Provider')

  return useStore(store, selector)
}

export const useModalActions = () => {
  return useModalContext(useCallback((state) => state.actions, []))
}
