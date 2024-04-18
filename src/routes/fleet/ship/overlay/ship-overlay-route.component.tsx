import { Outlet, getRouteApi, useNavigate } from '@tanstack/react-router'
import { Modal } from '@/components/modal'
import { ROUTES } from '@/config/routes'

const api = getRouteApi(ROUTES.SHIP)

export const ShipOverlayRoute = () => {
  const navigate = useNavigate()
  const { shipSymbol } = api.useParams()

  return (
    <Modal
      isOpen
      size="xl"
      disableExternalClose
      close={
        <Modal.Close
          onClick={() => {
            void navigate({ to: '/fleet/$shipSymbol', params: { shipSymbol } })
          }}
        />
      }
    >
      <Outlet />
    </Modal>
  )
}
