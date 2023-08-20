import { type ReactNode } from 'react'

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto'

export type ModalProps = {
  trigger?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  size?: DialogSize
  closeable?: boolean
  disableExternalClose?: boolean
}

export type ModalDialogProps = { size?: DialogSize; closeable?: boolean; disableExternalClose?: boolean }

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
