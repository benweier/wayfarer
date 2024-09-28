import { type PropsWithChildren, type RefAttributes, useImperativeHandle, useState } from 'react'
import { createStore } from 'zustand'
import { ModalContext } from './modal.context'
import { Root } from './modal.root'
import type { ModalImperativeRef, ModalProps, ModalStore } from './modal.types'

export const Modal = ({
  ref,
  trigger,
  overlay,
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
        open: () => {
          set({ isOpen: true })
        },
        close: () => {
          set({ isOpen: false })
        },
        toggle: () => {
          set(({ isOpen }) => ({ isOpen: !isOpen }))
        },
      },
    }))
  })

  useImperativeHandle(ref, () => {
    const { actions } = store.getState()

    return actions
  })

  return (
    <ModalContext value={store}>
      <Root trigger={trigger} overlay={overlay} size={size} close={close} disableExternalClose={disableExternalClose}>
        {children}
      </Root>
    </ModalContext>
  )
}
