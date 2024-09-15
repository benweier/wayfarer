import { Modal } from '@/components/modal'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'
import { WaypointContext } from '@/context/waypoint.context'
import {
  WaypointMarketError,
  WaypointMarketFallback,
  WaypointMarketList,
  WaypointMarketPreferences,
} from '@/features/waypoint/market'
import { getWaypointByIdQuery } from '@/services/api/spacetraders/waypoints'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

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
    <Modal.Content
      header={
        <Modal.Header>
          <Modal.Title>
            {t('market.label')}: <span className="font-normal">{ship.nav.waypointSymbol}</span>
          </Modal.Title>
        </Modal.Header>
      }
    >
      <WaypointContext value={waypoint.data.data}>
        <div className="space-y-4">
          <WaypointMarketPreferences />

          <QuerySuspenseBoundary fallback={<WaypointMarketFallback />} error={<WaypointMarketError />}>
            <WaypointMarketList />
          </QuerySuspenseBoundary>
        </div>
      </WaypointContext>
    </Modal.Content>
  )
}
