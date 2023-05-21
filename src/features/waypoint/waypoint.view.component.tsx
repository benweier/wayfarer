import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/badge'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { WAYPOINT_TYPE } from '@/config/constants'
import { SystemContext } from '@/context/system.context'
import { WaypointContext } from '@/context/waypoint.context'
import { getWaypointById } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'
import * as Fleet from './fleet'
import * as JumpGate from './jumpgate'
import * as Market from './market'
import * as Shipyard from './shipyard'

const tabs: Array<{ title: string; content: FC; fallback: FC; err: FC }> = [
  { title: 'Fleet', content: Fleet.List, fallback: Fleet.Fallback, err: Fleet.Err },
  { title: 'Market', content: Market.List, fallback: Market.Fallback, err: Market.Err },
  { title: 'Shipyard', content: Shipyard.List, fallback: Shipyard.Fallback, err: Shipyard.Err },
  { title: 'Jump Gate', content: JumpGate.List, fallback: JumpGate.Fallback, err: JumpGate.Err },
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
      <div>
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="text-xl font-semibold">{WAYPOINT_TYPE.get(waypoint.type) ?? waypoint.type}</div>
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

        <div className="flex flex-wrap items-baseline gap-1">
          {waypoint.traits.map((trait) => (
            <Badge key={trait.symbol}>{trait.name}</Badge>
          ))}
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
              <SystemContext.Provider value={{ systemID }}>
                <WaypointContext.Provider value={{ waypointID }}>
                  <QuerySuspenseBoundary fallback={<tab.fallback />} error={<tab.err />}>
                    <tab.content />
                  </QuerySuspenseBoundary>
                </WaypointContext.Provider>
              </SystemContext.Provider>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
