import { useContext } from 'react'
import { useStore } from 'zustand'
import { ModalContext } from './modal.context'
import { ModalStore } from './modal.store'

export const useModalContext = <T>(
  selector: (state: ModalStore) => T,
  equalityFn?: (left: T, right: T) => boolean,
): T => {
  const store = useContext(ModalContext)

  if (!store) throw new Error('`useModalContext` must be used within a `Modal` Provider')

  return useStore(store, selector, equalityFn)
}
