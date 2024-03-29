import { Tab } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
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
  const isJumpGate = waypoint.type === 'JUMP_GATE'
  const hasMarket = hasTrait(waypoint.traits, ['MARKETPLACE'])
  const hasShipyard = hasTrait(waypoint.traits, ['SHIPYARD'])

  return (
    <Tab.Group as="div" className="tab-group">
      <Tab.List className="tab-list">
        <Tab disabled={!hasMarket} className="group tab disabled:opacity-30">
          {t('market.label')}
        </Tab>
        <Tab className="group tab">{t('fleet.label')}</Tab>
        {hasShipyard && <Tab className="group tab">{t('shipyard.label')}</Tab>}
        {isJumpGate && <Tab className="group tab">{t('jumpgate.label')}</Tab>}
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <div className="space-y-4">
            <WaypointMarketPreferences />

            <QuerySuspenseBoundary fallback={<WaypointMarketFallback />} error={<WaypointMarketError />}>
              {hasMarket ? <WaypointMarketList /> : <WaypointMarketNotAvailable />}
            </QuerySuspenseBoundary>
          </div>
        </Tab.Panel>

        <Tab.Panel>
          <QuerySuspenseBoundary fallback={<WaypointFleetFallback />} error={<WaypointFleetError />}>
            <WaypointFleetList />
          </QuerySuspenseBoundary>
        </Tab.Panel>

        {hasShipyard && (
          <Tab.Panel>
            <QuerySuspenseBoundary fallback={<WaypointShipyardFallback />} error={<WaypointShipyardError />}>
              <WaypointShipyardList />
            </QuerySuspenseBoundary>
          </Tab.Panel>
        )}

        {isJumpGate && (
          <Tab.Panel>
            <QuerySuspenseBoundary fallback={<WaypointJumpGateFallback />} error={<WaypointJumpGateError />}>
              <WaypointJumpGateList />
            </QuerySuspenseBoundary>
          </Tab.Panel>
        )}
      </Tab.Panels>
    </Tab.Group>
  )
}
