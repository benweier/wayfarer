import { Outlet } from '@tanstack/react-router'
import { Modal } from '@/components/modal'
import type { ModalProps } from '@/components/modal'

export const OverlayOutlet = (props: ModalProps) => {
  return (
    <Modal {...props}>
      <Outlet />
    </Modal>
  )
}
