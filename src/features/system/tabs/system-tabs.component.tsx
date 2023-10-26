import { Tab } from '@headlessui/react'
import { cx } from 'class-variance-authority'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { SystemFleet, SystemFleetFallback } from '@/features/system/fleet'
import { WaypointList } from '@/features/waypoint/list'

export const SystemTabs = () => {
  return (
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
  )
}
