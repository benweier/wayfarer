import { Modal as ModalComponent } from './Modal.Context'
import { Trigger } from './Modal.Trigger'

export { useModalContext } from './useModalContext.hook'
export { useModalImperativeHandle } from './useModalImperativeHandle.hook'
export type { ModalProps, ModalDialogProps, ModalImperativeRef } from './modal.types'

export const Modal = Object.assign(ModalComponent, { Trigger })
