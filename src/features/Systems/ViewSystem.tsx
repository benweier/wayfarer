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
        <Tab.Group as="div" className="tab-group">
          <Tab.List className="tab-list">
            {tabs.map((tab) => (
              <Tab key={tab.title} className={({ selected }) => cx('group tab', { selected: selected })}>
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
