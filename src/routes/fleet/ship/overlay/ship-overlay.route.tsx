import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { Modal, type ModalProps } from '@/components/modal'

export const Route = (props: ModalProps) => {
  const navigate = useNavigate()
  const { shipSymbol } = useParams()

  if (!shipSymbol) return null

  return (
    <Modal
      {...props}
      onClose={() => {
        navigate(`/fleet/ship/${shipSymbol}`)
      }}
    >
      <Outlet />
    </Modal>
  )
}
