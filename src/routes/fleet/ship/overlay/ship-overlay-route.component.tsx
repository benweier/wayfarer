import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { Modal } from '@/components/modal'
import { ROUTES } from '@/config/routes'
import { getShipByIdQuery } from '@/services/api/spacetraders/fleet'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Outlet, getRouteApi, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

const api = getRouteApi(ROUTES.SHIP)

export const ShipOverlayRoute = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { shipSymbol } = api.useParams()
  const { data } = useSuspenseQuery(getShipByIdQuery({ shipSymbol }))

  return (
    <Modal
      defaultOpen
      size="xl"
      disableExternalClose
      close={
        <Modal.Close
          onClick={() => {
            void navigate({ to: '/fleet/$shipSymbol', params: { shipSymbol } })
          }}
        >
          <Button
            intent="neutral"
            kind="outline"
            size="small"
            adornment={{ start: <AppIcon id="chevron:left" className="size-4" /> }}
          >
            {t('ship.market.back_to_ship', { shipSymbol: data.data.symbol })}
          </Button>
        </Modal.Close>
      }
    >
      <Outlet />
    </Modal>
  )
}
