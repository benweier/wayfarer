import { type PropsWithChildren, type RefAttributes, useImperativeHandle, useState } from 'react'
import { createStore } from 'zustand'
import { ModalContext } from './modal.context'
import { Root } from './modal.root'
import type { ModalImperativeRef, ModalProps, ModalStore } from './modal.types'

export const Modal = ({
  ref,
  trigger,
  defaultOpen = false,
  size,
  close,
  disableExternalClose,
  children,
}: PropsWithChildren<ModalProps> & RefAttributes<ModalImperativeRef>) => {
  const [store] = useState(() => {
    return createStore<ModalStore>((set) => ({
      isOpen: defaultOpen,
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
    <ModalContext value={store}>
      <Root trigger={trigger} size={size} close={close} disableExternalClose={disableExternalClose}>
        {children}
      </Root>
    </ModalContext>
  )
}
