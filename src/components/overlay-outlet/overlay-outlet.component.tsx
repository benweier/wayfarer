import { Outlet, useOutletContext } from 'react-router-dom'
import { Modal, type ModalProps } from '@/components/modal'
import { type OverlayOutletContext } from './overlay-outlet.types'

export const OverlayOutlet = (props: ModalProps) => {
  const { onClose } = useOutletContext<OverlayOutletContext>()

  return (
    <Modal {...props} onClose={onClose}>
      <Outlet />
    </Modal>
  )
}
