import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { QuerySuspenseBoundary } from '@/components/QuerySuspenseBoundary'
import { WAYPOINT_TYPE } from '@/config/constants'
import { getWaypointById } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'
import { WaypointFleet } from './WaypointFleet'
import { WaypointJumpGate } from './WaypointJumpGate'
import { MarketError, WaypointMarket } from './WaypointMarket'
import { ShipyardError, WaypointShipyard } from './WaypointShipyard'

const tabs = [
  { title: 'Fleet', content: WaypointFleet, fallback: Fragment, error: Fragment },
  { title: 'Market', content: WaypointMarket, fallback: Fragment, error: MarketError },
  { title: 'Shipyard', content: WaypointShipyard, fallback: Fragment, error: ShipyardError },
  { title: 'Jump Gate', content: WaypointJumpGate, fallback: Fragment, error: Fragment },
]

export const ViewWaypoint = ({ systemID, waypointID }: { systemID: string; waypointID: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['system', systemID, 'waypoint', waypointID],
    queryFn: ({ signal }) => getWaypointById({ path: { system: systemID, waypoint: waypointID } }, { signal }),
  })

  if (!isSuccess) return null

  const waypoint = data.data

  return (
    <div key={waypoint.symbol} className="grid gap-8">
      <div className="flex flex-row items-center justify-start gap-4">
        <div className="text-xl font-semibold">{WAYPOINT_TYPE[waypoint.type] ?? waypoint.type}</div>
        <div className="font-light">
          ({waypoint.x}, {waypoint.y})
        </div>
        <div>
          System:{' '}
          <Link className="link" to={`/systems/${systemID}`}>
            {systemID}
          </Link>
        </div>
      </div>

      <Tab.Group as="div" className="tab-group">
        <Tab.List className="tab-list">
          {tabs.map((tab) => (
            <Tab key={tab.title} className={({ selected }) => cx('group tab', { selected: selected })}>
              {tab.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={tab.title}>
              <QuerySuspenseBoundary fallback={<tab.fallback />} error={<tab.error />}>
                <tab.content systemID={systemID} waypointID={waypointID} />
              </QuerySuspenseBoundary>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
