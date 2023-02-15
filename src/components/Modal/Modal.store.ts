import { createStore } from 'zustand'

type ModalState = {
  isOpen: boolean
}

type ModalHandlers = {
  openModal: () => void
  closeModal: () => void
  onClose?: () => void
}

export type ModalStore = ModalState & ModalHandlers

export const createModalStore = ({
  isOpen = false,
  onClose,
}: Partial<{ isOpen: boolean; onClose: () => void }> = {}) => {
  return createStore<ModalStore>()((set, getState) => ({
    isOpen,
    onClose,
    openModal: () => {
      set({ isOpen: true })
    },
    closeModal: () => {
      set({ isOpen: false })
      getState().onClose?.()
    },
  }))
}
