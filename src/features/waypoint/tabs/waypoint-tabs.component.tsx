import { Tab } from '@headlessui/react'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useWaypointResponse } from '@/context/waypoint.context'
import { WaypointFleetError, WaypointFleetFallback, WaypointFleetList } from '@/features/waypoint/fleet'
import { WaypointJumpGateError, WaypointJumpGateFallback, WaypointJumpGateList } from '@/features/waypoint/jumpgate'
import {
  WaypointMarketError,
  WaypointMarketFallback,
  WaypointMarketList,
  WaypointMarketNotAvailable,
  WaypointMarketPreferences,
} from '@/features/waypoint/market'
import {
  WaypointShipyardError,
  WaypointShipyardFallback,
  WaypointShipyardList,
  WaypointShipyardNotAvailable,
} from '@/features/waypoint/shipyard'
import { cx } from '@/utilities/cx'

export const WaypointTabs = () => {
  const waypoint = useWaypointResponse()
  const hasMarket = waypoint.traits.findIndex((trait) => trait.symbol === 'MARKETPLACE') !== -1
  const hasShipyard = waypoint.traits.findIndex((trait) => trait.symbol === 'SHIPYARD') !== -1

  return (
    <Tab.Group as="div" className="tab-group">
      <Tab.List className="tab-list">
        <Tab
          disabled={!hasMarket}
          className={({ selected }) => cx('group tab', { selected, 'opacity-30': !hasMarket })}
        >
          Market
        </Tab>
        <Tab className={({ selected }) => cx('group tab', { selected })}>Fleet</Tab>
        <Tab
          disabled={!hasShipyard}
          className={({ selected }) => cx('group tab', { selected, 'opacity-30': !hasShipyard })}
        >
          Shipyard
        </Tab>
        <Tab className={({ selected }) => cx('group tab', { selected })}>Jump Gate</Tab>
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

        <Tab.Panel>
          <QuerySuspenseBoundary fallback={<WaypointShipyardFallback />} error={<WaypointShipyardError />}>
            {hasShipyard ? <WaypointShipyardList /> : <WaypointShipyardNotAvailable />}
          </QuerySuspenseBoundary>
        </Tab.Panel>

        <Tab.Panel>
          <QuerySuspenseBoundary fallback={<WaypointJumpGateFallback />} error={<WaypointJumpGateError />}>
            <WaypointJumpGateList />
          </QuerySuspenseBoundary>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
