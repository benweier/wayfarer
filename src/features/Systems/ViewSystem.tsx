import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { QuerySuspenseBoundary } from '@/components/QuerySuspenseBoundary'
import { SYSTEM_TYPE } from '@/config/constants'
import { getSystemById } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'
import { SystemFleet } from './SystemFleet'
import { SystemWaypoints } from './SystemWaypoints'

const tabs = [
  { title: 'Waypoints', content: SystemWaypoints, fallback: Fragment },
  { title: 'Fleet', content: SystemFleet, fallback: Fragment },
]

export const ViewSystem = ({ systemID }: { systemID: string }) => {
  const { isSuccess, data } = useQuery({
    queryKey: ['system', systemID],
    queryFn: ({ signal }) => getSystemById({ path: systemID }, { signal }),
  })

  if (!isSuccess) return null

  const system = data.data

  return (
    <div key={system.symbol} className="grid gap-8">
      <div className="flex flex-row items-center justify-start gap-4">
        <div className="text-xl font-semibold">{SYSTEM_TYPE[system.type] ?? system.type}</div>
        <div className="text-lg font-light">
          ({system.x}, {system.y})
        </div>
      </div>
      <div>
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
            {tabs.map((tab) => {
              return (
                <Tab.Panel key={tab.title}>
                  <QuerySuspenseBoundary fallback={<tab.fallback />}>
                    <tab.content system={system} />
                  </QuerySuspenseBoundary>
                </Tab.Panel>
              )
            })}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
