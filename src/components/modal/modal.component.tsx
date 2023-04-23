import { ForwardedRef, PropsWithChildren, forwardRef, useImperativeHandle } from 'react'
import { ModalContext } from './modal.context'
import { Root } from './modal.root'
import { ModalImperativeRef, ModalProps } from './modal.types'
import { useModalStoreCreator } from './use-modal-store-creator.hook'

const ModalProviderComponent = (
  { trigger, isOpen = false, onClose, size, children }: PropsWithChildren<ModalProps>,
  ref?: ForwardedRef<ModalImperativeRef | undefined>,
) => {
  const store = useModalStoreCreator({ isOpen, onClose })

  useImperativeHandle(ref, () => ({
    openModal: () => store.setState({ isOpen: true }),
    closeModal: () => store.setState({ isOpen: false }),
  }))

  return (
    <ModalContext.Provider value={store}>
      {trigger}
      <Root size={size}>{children}</Root>
    </ModalContext.Provider>
  )
}

export const Modal = forwardRef(ModalProviderComponent)