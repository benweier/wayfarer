import { Tab } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { WaypointDetail } from '@/features/waypoint/detail'
import { WaypointFleetError, WaypointFleetFallback, WaypointFleetList } from '@/features/waypoint/fleet'
import { WaypointJumpGateError, WaypointJumpGateFallback, WaypointJumpGateList } from '@/features/waypoint/jumpgate'
import { WaypointMarketError, WaypointMarketFallback, WaypointMarketList } from '@/features/waypoint/market'
import { WaypointShipyardError, WaypointShipyardFallback, WaypointShipyardList } from '@/features/waypoint/shipyard'
import { cx } from '@/utilities/cx'

export const WaypointRouteComponent = () => {
  const { systemID, waypointID } = useParams()

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">
        Waypoint: <span className="font-normal">{waypointID}</span>
      </h1>

      {systemID && waypointID && (
        <QuerySuspenseBoundary>
          <WaypointDetail systemID={systemID} waypointID={waypointID}>
            <Tab.Group as="div" className="tab-group">
              <Tab.List className="tab-list">
                <Tab className={({ selected }) => cx('group tab', { selected })}>Fleet</Tab>
                <Tab className={({ selected }) => cx('group tab', { selected })}>Market</Tab>
                <Tab className={({ selected }) => cx('group tab', { selected })}>Shipyard</Tab>
                <Tab className={({ selected }) => cx('group tab', { selected })}>Jump Gate</Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  <QuerySuspenseBoundary fallback={<WaypointFleetFallback />} error={WaypointFleetError}>
                    <WaypointFleetList />
                  </QuerySuspenseBoundary>
                </Tab.Panel>

                <Tab.Panel>
                  <QuerySuspenseBoundary fallback={<WaypointMarketFallback />} error={WaypointMarketError}>
                    <WaypointMarketList />
                  </QuerySuspenseBoundary>
                </Tab.Panel>

                <Tab.Panel>
                  <QuerySuspenseBoundary fallback={<WaypointShipyardFallback />} error={WaypointShipyardError}>
                    <WaypointShipyardList />
                  </QuerySuspenseBoundary>
                </Tab.Panel>

                <Tab.Panel>
                  <QuerySuspenseBoundary fallback={<WaypointJumpGateFallback />} error={WaypointJumpGateError}>
                    <WaypointJumpGateList />
                  </QuerySuspenseBoundary>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </WaypointDetail>
        </QuerySuspenseBoundary>
      )}
    </div>
  )
}

export const Route = withQSB()(WaypointRouteComponent)
