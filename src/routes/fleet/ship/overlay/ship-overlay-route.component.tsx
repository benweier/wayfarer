import { Outlet, getRouteApi, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
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
        >
          {(props) => (
            <Button intent="danger" kind="outline" size="small" icon {...props}>
              <AppIcon id="x" className="size-3" />
            </Button>
          )}
        </Modal.Close>
      }
    >
      <Outlet />
    </Modal>
  )
}
