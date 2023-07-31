import { Tab } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { SystemStore } from '@/context/system.context'
import { SystemDetail } from '@/features/system/detail'
import { SystemFleet, SystemFleetFallback } from '@/features/system/fleet'
import { WaypointList } from '@/features/waypoint/list'
import { cx } from '@/utilities/cx'

export const SystemViewComponent = () => {
  const { systemSymbol } = useParams()

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">
        System: <span className="whitespace-nowrap font-normal">{systemSymbol}</span>
      </h1>

      {systemSymbol && (
        <QuerySuspenseBoundary>
          <SystemStore systemSymbol={systemSymbol}>
            <SystemDetail>
              <Tab.Group as="div" className="tab-group">
                <Tab.List className="tab-list">
                  <Tab className={({ selected }) => cx('group tab', { selected })}>Waypoints</Tab>
                  <Tab className={({ selected }) => cx('group tab', { selected })}>Fleet</Tab>
                </Tab.List>

                <Tab.Panels>
                  <Tab.Panel>
                    <QuerySuspenseBoundary fallback={<></>}>
                      <WaypointList />
                    </QuerySuspenseBoundary>
                  </Tab.Panel>

                  <Tab.Panel>
                    <QuerySuspenseBoundary fallback={<SystemFleetFallback />}>
                      <SystemFleet />
                    </QuerySuspenseBoundary>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </SystemDetail>
          </SystemStore>
        </QuerySuspenseBoundary>
      )}
    </div>
  )
}

export const Route = withQSB()(SystemViewComponent)
