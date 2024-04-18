import { type ForwardedRef, type PropsWithChildren, forwardRef, useImperativeHandle, useState } from 'react'
import { createStore } from 'zustand'
import { ModalContext } from './modal.context'
import { Root } from './modal.root'
import { type ModalImperativeRef, type ModalProps, type ModalStore } from './modal.types'

const ModalProviderComponent = (
  { trigger, isOpen = false, size, close, disableExternalClose, children }: PropsWithChildren<ModalProps>,
  ref?: ForwardedRef<ModalImperativeRef | undefined>,
) => {
  const [store] = useState(() => {
    return createStore<ModalStore>((set) => ({
      isOpen,
      actions: {
        openModal: () => {
          set({ isOpen: true })
        },
        closeModal: () => {
          set({ isOpen: false })
        },
      },
    }))
  })

  useImperativeHandle(ref, () => ({
    openModal: () => {
      store.setState({ isOpen: true })
    },
    closeModal: () => {
      store.setState({ isOpen: false })
    },
  }))

  return (
    <ModalContext.Provider value={store}>
      <Root trigger={trigger} size={size} close={close} disableExternalClose={disableExternalClose}>
        {children}
      </Root>
    </ModalContext.Provider>
  )
}

export const Modal = forwardRef(ModalProviderComponent)
