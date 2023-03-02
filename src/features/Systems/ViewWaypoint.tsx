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
import { WaypointMarket } from './WaypointMarket'
import { WaypointShipyard } from './WaypointShipyard'

const tabs = [
  { title: 'Fleet', content: WaypointFleet, fallback: Fragment },
  { title: 'Market', content: WaypointMarket, fallback: Fragment },
  { title: 'Shipyard', content: WaypointShipyard, fallback: Fragment },
  { title: 'Jump Gate', content: WaypointJumpGate, fallback: Fragment },
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

      <Tab.Group as="div" className="grid gap-4">
        <Tab.List className="isolate flex divide-x divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-700 dark:border-zinc-700">
          {tabs.map((tab) => (
            <Tab
              key={tab.title}
              className={({ selected }) =>
                cx(
                  'first:rounded-l-md last:rounded-r-md',
                  'group relative min-w-0 flex-1 overflow-hidden py-3 px-6 text-center text-sm font-medium focus:z-10',
                  'ring-blue-400/50 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  {
                    'bg-white text-zinc-900 dark:bg-zinc-700/50 dark:text-white': selected,
                    'bg-zinc-100 text-zinc-600 hover:bg-zinc-100/50 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-700/25':
                      !selected,
                  },
                )
              }
            >
              {tab.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={tab.title}>
              <QuerySuspenseBoundary fallback={<tab.fallback />}>
                <tab.content systemID={systemID} waypointID={waypointID} />
              </QuerySuspenseBoundary>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
