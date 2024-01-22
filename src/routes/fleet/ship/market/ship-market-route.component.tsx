import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'
import { WaypointContext } from '@/context/waypoint.context'
import {
  WaypointMarketError,
  WaypointMarketFallback,
  WaypointMarketList,
  WaypointMarketPreferences,
} from '@/features/waypoint/market'
import { getWaypointByIdQuery } from '@/services/api/spacetraders'

export const ShipMarketRoute = () => {
  const { t } = useTranslation()
  const ship = useShipResponse()
  const waypoint = useSuspenseQuery(
    getWaypointByIdQuery({
      systemSymbol: ship.nav.systemSymbol,
      waypointSymbol: ship.nav.waypointSymbol,
    }),
  )

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-start gap-6">
        <h1 className="text-title">
          {t('market.label')}: <span className="font-normal">{ship.nav.waypointSymbol}</span>
        </h1>
      </div>

      <WaypointContext.Provider value={waypoint.data.data}>
        <div className="space-y-4">
          <WaypointMarketPreferences />

          <QuerySuspenseBoundary fallback={<WaypointMarketFallback />} error={<WaypointMarketError />}>
            <WaypointMarketList />
          </QuerySuspenseBoundary>
        </div>
      </WaypointContext.Provider>
    </div>
  )
}
