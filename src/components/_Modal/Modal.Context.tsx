import { ForwardedRef, PropsWithChildren, createContext, createElement, forwardRef, useImperativeHandle } from 'react'
import { useModal } from './useModal.hook'
import type { ModalContextType, ModalProps, ModalRefType } from './modal.types'

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {
    // noop
  },
  closeModal: () => {
    // noop
  },
  closeOnEsc: true,
  closeOnOutsideClick: true,
})

const ModalComponent = (
  {
    action,
    children,
    onOpen,
    onClose,
    initialOpen,
    closeOnEsc = true,
    closeOnOutsideClick = true,
    Portal,
  }: PropsWithChildren<ModalProps>,
  imperativeRef?: ForwardedRef<ModalRefType | undefined>,
) => {
  const { isOpen, openModal, closeModal, Modal } = useModal({
    initialOpen,
    onOpen,
    onClose,
    Portal,
  })

  useImperativeHandle(imperativeRef, () => {
    return {
      openModal,
      closeModal,
    }
  })

  const props = {
    isOpen,
    openModal,
    closeModal,
    onOpen,
    onClose,
    closeOnEsc,
    closeOnOutsideClick,
  }

  return (
    <ModalContext.Provider value={props}>
      {typeof action === 'function' ? createElement(action, props) : action}
      <Modal {...props}>{children}</Modal>
    </ModalContext.Provider>
  )
}

export const Modal = forwardRef(ModalComponent)
