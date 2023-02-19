import { BoltIcon, CubeIcon, UserGroupIcon, WrenchIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { SHIP_NAV_FLIGHT_MODE, SHIP_NAV_STATUS } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { Dock, Orbit, ScanWaypoints } from '@/features/Fleet/ShipActions'
import { getShipsList } from '@/services/api/spacetraders'

export const MyShips = () => {
  const { isSuccess, data } = useQuery({
    queryKey: ['ships'],
    queryFn: ({ signal }) => getShipsList(undefined, { signal }),
  })

  if (!isSuccess) return null

  return (
    <div className="grid">
      {data.data.map((ship) => {
        return (
          <div key={ship.symbol} className="bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-700/25">
            <div className="flex flex-row items-center justify-start gap-8">
              <div className="flex flex-1 flex-row items-center justify-start gap-4">
                <div className="[width:200px]">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{ship.registration.name}</span>
                    <span className="text-xs opacity-50">({ship.symbol})</span>
                  </div>
                  <div className="flex flex-row gap-2">
                    <div className="rounded bg-black py-1 px-2 text-xs font-bold">
                      {SHIP_NAV_STATUS[ship.nav.status] ?? ship.nav.status}
                    </div>
                    <div className="rounded bg-black py-1 px-2 text-xs font-bold">
                      {SHIP_NAV_FLIGHT_MODE[ship.nav.flightMode] ?? ship.nav.flightMode}
                    </div>
                  </div>
                </div>
                <div className="flex gap-8 [width:280px]">
                  <div>
                    <div className="text-xs font-medium uppercase opacity-60">System</div>
                    <div className="font-semibold">
                      <Link to={`${ROUTES.SYSTEMS}/${ship.nav.systemSymbol}`}>{ship.nav.systemSymbol}</Link>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase opacity-60">Waypoint</div>
                    <div className="font-semibold">
                      <Link to={`${ROUTES.SYSTEMS}/${ship.nav.systemSymbol}/waypoint/${ship.nav.waypointSymbol}`}>
                        {ship.nav.waypointSymbol}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex gap-8 [width:400px]">
                  <div className="flex items-center gap-2">
                    <BoltIcon className="h-5 w-5 text-teal-500" />
                    <div className="text-base">
                      {ship.fuel.current} / {ship.fuel.capacity}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CubeIcon className="h-5 w-5 text-fuchsia-500" />
                    <div className="text-base">
                      {ship.cargo.units} / {ship.cargo.capacity}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserGroupIcon className="h-5 w-5 text-amber-500" />
                    <div className="text-base">
                      {ship.crew.current} / {ship.crew.capacity}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {ship.nav.status === 'DOCKED' ? <Orbit ship={ship.symbol} /> : <Dock ship={ship.symbol} />}
                  <ScanWaypoints ship={ship.symbol} />
                </div>
              </div>
              <div>
                <Link
                  to={`/fleet/ship/${ship.symbol}`}
                  className="btn-light dark:btn-dark btn btn-outline btn-sm block"
                >
                  <WrenchIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
