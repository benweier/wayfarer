import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { Inventory, Loadout, Navigation, Survey } from '@/components/ship'
import * as Cargo from '@/components/ship/cargo'
import { ShipStore } from '@/context/ship.context'
import { getShipById } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'
import { ShipDetailProps } from './ship-detail.types'

export const ShipDetail = ({ symbol }: ShipDetailProps) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['ship', symbol],
    queryFn: ({ signal }) => getShipById({ path: symbol }, { signal }),
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
          <Navigation.Status ship={ship} />
          <Inventory ship={ship} />
        </div>

        <Navigation.Route nav={ship.nav} />

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

                <QuerySuspenseBoundary fallback={<Cargo.Fallback />} error={<Cargo.Error />}>
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
