import {
  ForwardedRef,
  PropsWithChildren,
  ReactNode,
  createContext,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { StoreApi } from 'zustand/vanilla'
import { Root } from './Modal.Root'
import { ModalStore, createModalStore } from './Modal.store'

export const ModalContext = createContext<StoreApi<ModalStore> | null>(null)

const useModalStoreCreator = ({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) => {
  const store = useRef<StoreApi<ModalStore>>()

  if (!store.current) {
    store.current = createModalStore({ isOpen, onClose })
  }

  useEffect(() => {
    store.current?.setState({ isOpen, onClose })
  }, [isOpen, onClose])

  return store.current
}

export const ModalComponent = (
  {
    trigger,
    isOpen = false,
    onClose,
    size,
    children,
  }: PropsWithChildren<{
    trigger?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto'
  }>,
  ref?: ForwardedRef<{ openModal: () => void; closeModal: () => void } | undefined>,
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

export const Modal = forwardRef(ModalComponent)
