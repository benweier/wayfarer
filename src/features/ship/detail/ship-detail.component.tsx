import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { Inventory, Loadout, Navigation, Survey } from '@/components/ship'
import * as Cargo from '@/components/ship/cargo'
import { ShipStore } from '@/context/ship.context'
import { getShipById } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'

const tabs = [
  {
    title: 'Cargo',
    content: (
      <div className="grid gap-4">
        <div>
          <Cargo.Preferences />
        </div>

        <QuerySuspenseBoundary fallback={<Cargo.Fallback />} error={<Cargo.Error />}>
          <Cargo.List />
        </QuerySuspenseBoundary>
      </div>
    ),
    fallback: <></>,
  },
  { title: 'Survey/Extract', content: <Survey />, fallback: <></> },
  { title: 'Loadout', content: <Loadout />, fallback: <></> },
]

export const Detail = ({ symbol }: { symbol: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['ship', symbol],
    queryFn: ({ signal }) => getShipById({ path: symbol }, { signal }),
  })

  if (!isSuccess) return null

  const ship = data.data

  return (
    <ShipStore ship={ship}>
      <div className="grid gap-8">
        <div className="headline">
          <span className="font-bold">Registration:</span> {ship.registration.name} • {ship.registration.role} •{' '}
          {ship.registration.factionSymbol}
        </div>

        <div className="flex items-start justify-between gap-4">
          <Navigation.Status ship={ship} />
          <Inventory ship={ship} />
        </div>

        <div>
          <Navigation.Route nav={ship.nav} />
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
              {tabs.map((tab) => (
                <Tab.Panel key={tab.title}>
                  <QuerySuspenseBoundary fallback={tab.fallback}>{tab.content}</QuerySuspenseBoundary>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </ShipStore>
  )
}
