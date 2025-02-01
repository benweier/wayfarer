import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as Tabs from '@/components/tabs'
import { WaypointTraits, WaypointTypes } from '@/config/spacetraders'
import { useWaypointResponse } from '@/context/waypoint.context'
import { WaypointFleetError, WaypointFleetFallback, WaypointFleetList } from '@/features/waypoint/fleet'
import { WaypointJumpGateError, WaypointJumpGateFallback } from '@/features/waypoint/jumpgate'
import {
  WaypointMarketError,
  WaypointMarketFallback,
  WaypointMarketList,
  WaypointMarketNotAvailable,
  WaypointMarketPreferences,
} from '@/features/waypoint/market'
import { WaypointShipyardError, WaypointShipyardFallback } from '@/features/waypoint/shipyard'
import { hasTrait } from '@/features/waypoint/utilities/has-trait.helper'
import { dynamic } from '@/utilities/dynamic.helper'

const { WaypointShipyardList } = dynamic(() => import('@/features/waypoint/shipyard'), 'WaypointShipyardList')
const { WaypointJumpGateList } = dynamic(() => import('@/features/waypoint/jumpgate'), 'WaypointJumpGateList')

export const WaypointTabs = () => {
  const { t } = useTranslation()
  const waypoint = useWaypointResponse()
  const isJumpGate = waypoint.type === WaypointTypes.JumpGate
  const hasMarket = hasTrait(waypoint.traits, [WaypointTraits.Marketplace])
  const hasShipyard = hasTrait(waypoint.traits, [WaypointTraits.Shipyard])

  return (
    <Tabs.Root defaultValue={hasMarket ? 'marketplace' : 'fleet'}>
      <Tabs.List>
        <Tabs.Trigger value="marketplace" disabled={!hasMarket}>
          {t('market.label')}
        </Tabs.Trigger>
        <Tabs.Trigger value="fleet">{t('fleet.label')}</Tabs.Trigger>
        {hasShipyard && <Tabs.Trigger value="shipyard">{t('shipyard.label')}</Tabs.Trigger>}
        {isJumpGate && <Tabs.Trigger value="jump-gate">{t('jumpgate.label')}</Tabs.Trigger>}
      </Tabs.List>

      <Tabs.Content value="marketplace">
        <div className="space-y-4">
          <WaypointMarketPreferences />

          <QuerySuspenseBoundary fallback={<WaypointMarketFallback />} error={<WaypointMarketError />}>
            {hasMarket ? <WaypointMarketList /> : <WaypointMarketNotAvailable />}
          </QuerySuspenseBoundary>
        </div>
      </Tabs.Content>

      <Tabs.Content value="fleet">
        <QuerySuspenseBoundary fallback={<WaypointFleetFallback />} error={<WaypointFleetError />}>
          <WaypointFleetList />
        </QuerySuspenseBoundary>
      </Tabs.Content>

      {hasShipyard && (
        <Tabs.Content value="shipyard">
          <QuerySuspenseBoundary fallback={<WaypointShipyardFallback />} error={<WaypointShipyardError />}>
            <WaypointShipyardList />
          </QuerySuspenseBoundary>
        </Tabs.Content>
      )}

      {isJumpGate && (
        <Tabs.Content value="jump-gate">
          <QuerySuspenseBoundary fallback={<WaypointJumpGateFallback />} error={<WaypointJumpGateError />}>
            <WaypointJumpGateList />
          </QuerySuspenseBoundary>
        </Tabs.Content>
      )}
    </Tabs.Root>
  )
}
