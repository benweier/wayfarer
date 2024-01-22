import { keepPreviousData, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { Outlet, RouteApi } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/config/routes'
import { ShipContext } from '@/context/ship.context'
import { WaypointContext } from '@/context/waypoint.context'
import { ShipDetail } from '@/features/ship/detail'
import { ShipTabs } from '@/features/ship/tabs'
import { getShipByIdQuery, getWaypointByIdQuery } from '@/services/api/spacetraders'

const api = new RouteApi({ id: ROUTES.SHIP })

export const ShipRoute = () => {
  const { t } = useTranslation()
  const { shipSymbol } = api.useParams()
  const ship = useSuspenseQuery(
    getShipByIdQuery({
      shipSymbol,
    }),
  )
  const waypoint = useQuery({
    ...getWaypointByIdQuery({
      systemSymbol: ship.data.data.nav.systemSymbol,
      waypointSymbol: ship.data.data.nav.waypointSymbol,
    }),
    placeholderData: keepPreviousData,
  })

  return (
    <div key={shipSymbol} className="space-y-4 p-4">
      <h1 className="text-title">
        {t('ship.label')}: <span className="font-normal">{shipSymbol}</span>
      </h1>

      <ShipContext.Provider value={ship.data.data}>
        <WaypointContext.Provider value={waypoint.data?.data}>
          <ShipDetail>
            <ShipTabs />
          </ShipDetail>

          <Outlet />
        </WaypointContext.Provider>
      </ShipContext.Provider>
    </div>
  )
}
