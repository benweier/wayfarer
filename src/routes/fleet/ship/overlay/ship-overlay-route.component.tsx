import { Outlet, RouteApi, useNavigate } from '@tanstack/react-router'
import { Modal } from '@/components/modal'
import { ROUTES } from '@/config/routes'

const api = new RouteApi({ id: ROUTES.SHIP })

export const ShipOverlayRoute = () => {
  const navigate = useNavigate()
  const { shipSymbol } = api.useParams()

  return (
    <Modal
      isOpen
      size="lg"
      closeable
      disableExternalClose
      onClose={() => {
        void navigate({ to: '/fleet/$shipSymbol', params: { shipSymbol } })
      }}
    >
      <Outlet />
    </Modal>
  )
}
