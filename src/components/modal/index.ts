import { Modal as ModalComponent } from './modal.component'
import { Trigger } from './modal.trigger'

export { useModalActions, useModalContext } from './use-modal-store.hook'
export { useModalImperativeHandle } from './use-modal-imperative-handle.hook'
export type {
  ModalActions,
  ModalDialogProps,
  ModalImperativeRef,
  ModalProps,
  ModalState,
  ModalStore,
} from './modal.types'

export const Modal = Object.assign(ModalComponent, { Trigger })
