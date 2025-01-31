import { ModalContext } from './modal.context'
import { Root } from './modal.root'
import { useCreateModalStore } from './use-modal-store.hook'
import type { ModalProps } from './modal.types'

export const Modal = ({
  ref,
  trigger,
  overlay,
  defaultOpen = false,
  size,
  close,
  disableExternalClose,
  children,
}: ModalProps) => {
  const store = useCreateModalStore(ref, { defaultOpen })

  return (
    <ModalContext value={store}>
      <Root trigger={trigger} overlay={overlay} size={size} close={close} disableExternalClose={disableExternalClose}>
        {children}
      </Root>
    </ModalContext>
  )
}
