import { Outlet, useNavigate } from '@tanstack/react-router'
import { Modal } from '@/components/modal'
import { shipRoute } from '@/routes/ship.route'

export const ShipOverlayRoute = () => {
  const navigate = useNavigate()
  const { shipSymbol } = shipRoute.useParams()

  return (
    <Modal
      isOpen
      size="lg"
      closeable
      disableExternalClose
      onClose={() => {
        void navigate({ to: shipRoute.to, params: { shipSymbol } })
      }}
    >
      <Outlet />
    </Modal>
  )
}
