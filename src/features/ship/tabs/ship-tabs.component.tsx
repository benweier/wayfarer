import { Tab } from '@headlessui/react'
import { cx } from 'class-variance-authority'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { useShipResponse } from '@/context/ship.context'
import { WaypointStore } from '@/context/waypoint.context'
import { ShipCargoError, ShipCargoFallback, ShipCargoList, ShipCargoPreferences } from '@/features/ship/cargo'
import { ShipLoadoutList } from '@/features/ship/loadout'
import { ShipSurveyExtract } from '@/features/ship/survey-extract'

export const ShipTabs = () => {
  const ship = useShipResponse()

  return (
    <Tab.Group as="div" className="tab-group">
      <Tab.List className="tab-list">
        <Tab className={({ selected }) => cx('group tab', { selected })}>Cargo</Tab>
        <Tab className={({ selected }) => cx('group tab', { selected })}>Survey/Extract</Tab>
        <Tab className={({ selected }) => cx('group tab', { selected })}>Loadout</Tab>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <div className="grid gap-4">
            <ShipCargoPreferences />

            <QuerySuspenseBoundary fallback={<ShipCargoFallback />} error={<ShipCargoError />}>
              <WaypointStore systemSymbol={ship.nav.systemSymbol} waypointSymbol={ship.nav.waypointSymbol}>
                <ShipCargoList />
              </WaypointStore>
            </QuerySuspenseBoundary>
          </div>
        </Tab.Panel>

        <Tab.Panel>
          <ShipSurveyExtract />
        </Tab.Panel>

        <Tab.Panel>
          <ShipLoadoutList />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
