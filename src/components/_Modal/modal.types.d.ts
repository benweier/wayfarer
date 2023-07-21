import { type FC, type PropsWithChildren, type ReactNode } from 'react'

export type ModalContextType = {
  isOpen: boolean
  onOpen?: () => void
  onClose?: () => void
  openModal: () => void
  closeModal: () => void
  closeOnEsc: boolean
  closeOnOutsideClick: boolean
}

export type ModalRefType = {
  openModal: () => void
  closeModal: () => void
}

export type ModalProps = {
  action?: FC<ModalContextType> | ReactNode
  children?: ReactNode
  initialOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  closeOnEsc?: boolean
  closeOnOutsideClick?: boolean
  Portal?: FC<PropsWithChildren<ModalContextType>>
}

export type OverlayProps = {
  variant?: 'auto' | 'light' | 'dark'
}

export type DialogProps = {
  size?: 'sm' | 'md' | 'lg' | 'full' | 'auto'
  overlay?: ReactNode
  render?: FC<ModalContextType> | ReactNode
}

export type UseModalOptions = {
  initialOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  Portal?: FC<PropsWithChildren<ModalContextType>>
}
