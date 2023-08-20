import { type PropsWithChildren } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import { Modal, type ModalProps } from '@/components/modal'

export const OverlayOutlet = ({ children = <Outlet />, ...props }: PropsWithChildren<ModalProps>) => {
  const ctx = useOutletContext<{ onOverlayClose: () => void }>()

  return (
    <Modal {...props} disableExternalClose onClose={ctx.onOverlayClose}>
      {children}
    </Modal>
  )
}
