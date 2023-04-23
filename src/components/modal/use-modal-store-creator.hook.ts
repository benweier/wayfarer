import { useEffect, useRef } from 'react'
import { StoreApi } from 'zustand/vanilla'
import { createModalStore } from './modal.store'
import { ModalStore } from './modal.types'

export const useModalStoreCreator = ({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) => {
  const store = useRef<StoreApi<ModalStore>>()

  if (!store.current) {
    store.current = createModalStore({ isOpen, onClose })
  }

  useEffect(() => {
    store.current?.setState({ isOpen, onClose })
  }, [isOpen, onClose])

  return store.current
}
