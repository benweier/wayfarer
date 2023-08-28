import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { Loadout, Survey } from '@/components/ship'
import * as Cargo from '@/components/ship/cargo'
import { cx } from '@/utilities/cx'
import { Tab } from '@headlessui/react'

export const ShipTabs = () => {
  return (
    <Tab.Group as="div" className="tab-group">
      <Tab.List className="tab-list">
        <Tab className={({ selected }) => cx('group tab', { selected: selected })}>Cargo</Tab>
        <Tab className={({ selected }) => cx('group tab', { selected: selected })}>Survey/Extract</Tab>
        <Tab className={({ selected }) => cx('group tab', { selected: selected })}>Loadout</Tab>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <div className="grid gap-4">
            <Cargo.Preferences />

            <QuerySuspenseBoundary fallback={<Cargo.Fallback />} error={Cargo.Error}>
              <Cargo.List />
            </QuerySuspenseBoundary>
          </div>
        </Tab.Panel>

        <Tab.Panel>
          <QuerySuspenseBoundary fallback={<></>}>
            <Survey />
          </QuerySuspenseBoundary>
        </Tab.Panel>

        <Tab.Panel>
          <QuerySuspenseBoundary fallback={<></>}>
            <Loadout />
          </QuerySuspenseBoundary>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
