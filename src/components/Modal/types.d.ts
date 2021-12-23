import { FC, ReactNode } from 'react'

export interface ModalContextType {
  ref: any
  isOpen: boolean
  openModal: (event: MouseEvent<HTMLElement>) => void
  closeModal: () => void
  toggleModal: () => void
}

export interface ModalProps {
  open?: boolean
  children?: ReactNode | ((args: ModalContextType) => ReactNode)
  render?: (children: ReactNode) => ReactNode
  openOnMount?: boolean
}

export interface UseModalProps {
  Component?: FC<ModalProps>
  onClose?: () => void
  openOnMount?: boolean
}
