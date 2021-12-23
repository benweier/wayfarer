import { useImperativeHandle, forwardRef, ForwardedRef, ReactNode } from 'react'
import { ModalContext } from './context'
import { ModalContextType, ModalProps } from './types.d'
import { useModal } from './useModal'
import { isFunction } from '@/utilities/is-function'

const InternalModal = (
  {
    action,
    children,
    onClose,
    openOnMount,
    ...props
  }: ModalProps & { action: ReactNode | ((args: ModalContextType) => ReactNode); onClose?: () => void },
  imperativeRef: ForwardedRef<
    Pick<ModalContextType, 'isOpen' | 'openModal' | 'closeModal' | 'toggleModal'> | undefined
  >,
) => {
  const { ref, isOpen, openModal, closeModal, toggleModal, Modal } = useModal({ onClose, openOnMount })

  useImperativeHandle(imperativeRef, () => {
    return {
      isOpen,
      openModal,
      closeModal,
      toggleModal,
    }
  })

  return (
    <ModalContext.Provider value={{ ref, isOpen, openModal, closeModal, toggleModal }}>
      {isFunction(action) ? action({ ref, isOpen, openModal, closeModal, toggleModal }) : action}
      <Modal {...props} open={isOpen}>
        {isFunction(children) ? children({ ref, isOpen, openModal, closeModal, toggleModal }) : children}
      </Modal>
    </ModalContext.Provider>
  )
}

export const Modal = forwardRef(InternalModal)
