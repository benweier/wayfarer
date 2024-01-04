import { createStore } from 'zustand'
import { type ModalStore } from './modal.types'

export const createModalStore = ({
  isOpen = false,
  onClose,
}: Partial<{ isOpen: boolean; onClose: () => void }> = {}) => {
  return createStore<ModalStore>()((set, get) => ({
    isOpen,
    onClose,
    actions: {
      openModal: () => {
        set({ isOpen: true })
      },
      closeModal: () => {
        set({ isOpen: false })
        get().onClose?.()
      },
    },
  }))
}
