import type { ReactNode } from 'react'

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto'

export type ModalProps = {
  trigger?: ReactNode
  overlay?: ReactNode
  defaultOpen?: boolean
  size?: DialogSize
  close?: ReactNode
  disableExternalClose?: boolean
}

export type ModalDialogProps = {
  trigger?: ReactNode
  overlay?: ReactNode
  size?: DialogSize
  close?: ReactNode
  disableExternalClose?: boolean
}

export type ModalImperativeRef = ModalActions

export type ModalState = {
  isOpen: boolean
  onClose?: () => void
}

export type ModalActions = {
  open: () => void
  close: () => void
  toggle: () => void
}

export type ModalStore = ModalState & { actions: ModalActions }
