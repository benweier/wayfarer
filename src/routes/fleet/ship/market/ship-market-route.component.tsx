import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'
import { WaypointStore } from '@/context/waypoint.context'
import {
  WaypointMarketError,
  WaypointMarketFallback,
  WaypointMarketList,
  WaypointMarketPreferences,
} from '@/features/waypoint/market'

export const ShipMarketRoute = () => {
  const { t } = useTranslation()
  const ship = useShipResponse()

  return (
    <div className="grid gap-4 p-4">
      <div className="flex items-center justify-start gap-6">
        <h1 className="text-title">
          {t('market.label')}: <span className="font-normal">{ship.nav.waypointSymbol}</span>
        </h1>
      </div>

      <WaypointStore systemSymbol={ship.nav.systemSymbol} waypointSymbol={ship.nav.waypointSymbol}>
        <div className="space-y-4">
          <WaypointMarketPreferences />

          <QuerySuspenseBoundary fallback={<WaypointMarketFallback />} error={<WaypointMarketError />}>
            <WaypointMarketList />
          </QuerySuspenseBoundary>
        </div>
      </WaypointStore>
    </div>
  )
}
