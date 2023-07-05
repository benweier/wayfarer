import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { Inventory, Loadout, Survey } from '@/components/ship'
import * as Cargo from '@/components/ship/cargo'
import { SHIP_NAV_FLIGHT_MODE, SHIP_NAV_STATUS } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { ShipStore } from '@/context/ship.context'
import * as ShipActions from '@/features/ship/actions'
import { ShipTransit } from '@/features/ship/transit'
import { getShipById } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'
import { ShipDetailProps } from './ship-detail.types'

export const ShipDetail = ({ symbol }: ShipDetailProps) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['ship', symbol],
    queryFn: ({ signal }) => getShipById({ path: { shipID: symbol } }, { signal }),
  })

  if (!isSuccess) return null

  const ship = data.data

  return (
    <ShipStore ship={ship}>
      <div className="grid gap-4">
        <div className="headline">
          <span className="font-bold">Registration:</span> {ship.registration.name} • {ship.registration.role} •{' '}
          {ship.registration.factionSymbol}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-row items-end gap-2">
            <div className="flex gap-8">
              <div>
                <div className="text-secondary text-xs uppercase">System</div>
                <div className="font-semibold leading-snug">
                  <Link className="link" to={`${ROUTES.SYSTEMS}/${ship.nav.systemSymbol}`}>
                    {ship.nav.systemSymbol}
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-secondary text-xs uppercase">Waypoint</div>
                <div className="flex items-center gap-2">
                  <div className="font-semibold leading-snug">
                    <Link
                      className="link"
                      to={`${ROUTES.SYSTEMS}/${ship.nav.systemSymbol}/waypoint/${ship.nav.waypointSymbol}`}
                    >
                      {ship.nav.waypointSymbol}
                    </Link>
                  </div>
                  <div className="text-primary text-inverse my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
                    {SHIP_NAV_STATUS.get(ship.nav.status) ?? ship.nav.status}
                  </div>
                  <div className="text-primary text-inverse my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
                    {SHIP_NAV_FLIGHT_MODE.get(ship.nav.flightMode) ?? ship.nav.flightMode}
                  </div>
                </div>
                {ship.nav.status === 'DOCKED' ? (
                  <ShipActions.Orbit ship={ship}>
                    {(props) => (
                      <button className="btn btn-primary btn-flat btn-sm" {...props}>
                        Orbit
                      </button>
                    )}
                  </ShipActions.Orbit>
                ) : (
                  <ShipActions.Dock ship={ship}>
                    {(props) => (
                      <button className="btn btn-primary btn-flat btn-sm" {...props}>
                        Dock
                      </button>
                    )}
                  </ShipActions.Dock>
                )}
              </div>
            </div>
          </div>

          <Inventory ship={ship} />
        </div>

        <ShipTransit nav={ship.nav} />

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
      </div>
    </ShipStore>
  )
}
