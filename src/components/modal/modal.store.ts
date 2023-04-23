import { createStore } from 'zustand'
import { ModalStore } from './modal.types'

export const createModalStore = ({
  isOpen = false,
  onClose,
}: Partial<{ isOpen: boolean; onClose: () => void }> = {}) => {
  return createStore<ModalStore>()((set, getState) => ({
    isOpen,
    onClose,
    actions: {
      openModal: () => {
        set({ isOpen: true })
      },
      closeModal: () => {
        set({ isOpen: false })
        getState().onClose?.()
      },
    },
  }))
}
