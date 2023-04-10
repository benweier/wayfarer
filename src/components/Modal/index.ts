import { Modal as ModalComponent } from './modal.component'
import { Trigger } from './modal.trigger'

export { useModalContext } from './use-modal-context.hook'
export { useModalImperativeHandle } from './use-modal-imperative-handle.hook'
export type { ModalProps, ModalDialogProps, ModalImperativeRef } from './modal.types'

export const Modal = Object.assign(ModalComponent, { Trigger })
