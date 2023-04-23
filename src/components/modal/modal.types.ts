import { ReactNode } from 'react'

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto'

export type ModalProps = {
  trigger?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  size?: DialogSize
}

export type ModalDialogProps = { size?: DialogSize }

export type ModalImperativeRef = {
  openModal: () => void
  closeModal: () => void
}

export type ModalState = {
  isOpen: boolean
  onClose?: () => void
}

export type ModalActions = {
  openModal: () => void
  closeModal: () => void
}

export type ModalStore = ModalState & { actions: ModalActions }
