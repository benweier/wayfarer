import { Content } from './modal-content.component'
import { Description } from './modal-description.component'
import { Footer } from './modal-footer.component'
import { Header } from './modal-header.component'
import { Title } from './modal-title.component'
import { Close } from './modal.close'
import { Modal as ModalComponent } from './modal.component'
import { Overlay } from './modal.overlay'
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

export const Modal = Object.assign(ModalComponent, {
  Close,
  Content,
  Description,
  Footer,
  Header,
  Overlay,
  Title,
  Trigger,
})
