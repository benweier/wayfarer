import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { QuerySuspenseBoundary } from '@/components/QuerySuspenseBoundary'
import { Cargo, Cooldown, Inventory, Loadout, Navigation } from '@/components/Ship'
import { getShipById } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'

const tabs = [
  { title: 'Cargo', content: Cargo, fallback: Fragment },
  { title: 'Loadout', content: Loadout, fallback: Fragment },
]

export const View = ({ symbol }: { symbol: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['ship', symbol],
    queryFn: ({ signal }) => getShipById({ path: symbol }, { signal }),
  })

  if (!isSuccess) return null

  const ship = data.data

  return (
    <div className="grid gap-8">
      <div className="headline">
        <span className="font-bold">Registration:</span> {ship.registration.name} • {ship.registration.role} •{' '}
        {ship.registration.factionSymbol}
      </div>

      <Cooldown shipID={ship.symbol} />

      <div className="flex items-start justify-between gap-4">
        <Navigation.Status nav={ship.nav} />
        <Inventory ship={ship} />
      </div>

      <div>
        <Navigation.Route route={ship.nav.route} />
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
            {tabs.map((tab) => (
              <Tab.Panel key={tab.title}>
                <QuerySuspenseBoundary fallback={<tab.fallback />}>
                  <tab.content ship={ship} />
                </QuerySuspenseBoundary>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
