import { Modal, type ModalProps } from '@/components/modal'
import { Outlet } from '@tanstack/react-router'

export const OverlayOutlet = (props: ModalProps) => {
  return (
    <Modal {...props}>
      <Outlet />
    </Modal>
  )
}
