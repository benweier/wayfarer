import { BoltIcon, CubeIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useMutation, useQuery } from '@tanstack/react-query'
import { SHIP_NAV_FLIGHT_MODE, SHIP_NAV_STATUS } from '@/config/constants'
import { createShipOrbit, createShipScanWaypoint, getShipById } from '@/services/api/spacetraders'

const Orbit = ({ ship }: { ship: string }) => {
  const { mutate, data } = useMutation({
    mutationKey: ['ship-orbit', ship],
    mutationFn: (id: string) => createShipOrbit({ path: id }),
  })

  return (
    <button
      onClick={() => {
        mutate(ship)
      }}
    >
      Orbit
    </button>
  )
}

const ScanWaypoints = ({ ship }: { ship: string }) => {
  const { mutate, data } = useMutation({
    mutationKey: ['ship-scan-waypoints', ship],
    mutationFn: (id: string) => createShipScanWaypoint({ path: id }),
  })

  return (
    <button
      onClick={() => {
        mutate(ship)
      }}
    >
      Scan
    </button>
  )
}

export const ViewShip = ({ id }: { id: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['ship', id],
    queryFn: ({ signal }) => getShipById({ path: id }, { signal }),
  })

  if (!isSuccess) return null

  const ship = data.data

  return (
    <div className="grid">
      <div key={ship.symbol} className="bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-700/25">
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="rounded bg-black py-1 px-2 text-xs font-bold">
            {SHIP_NAV_STATUS[ship.nav.status] ?? ship.nav.status}
          </div>
          <div className="rounded bg-black py-1 px-2 text-xs font-bold">
            {SHIP_NAV_FLIGHT_MODE[ship.nav.flightMode] ?? ship.nav.flightMode}
          </div>
          <div className="flex flex-1 flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-medium uppercase">{ship.symbol}</div>
              <div className="truncate text-lg font-semibold">{ship.registration.name}</div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase">System</div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase">Waypoint</div>
              <div className="truncate text-lg font-semibold">{ship.nav.waypointSymbol}</div>
            </div>
            <div className="flex gap-2">
              <BoltIcon className="h-6 w-6" />
              <div>
                {ship.fuel.current} / {ship.fuel.capacity}
              </div>
            </div>
            <div className="flex gap-2">
              <CubeIcon className="h-6 w-6" />
              <div>
                {ship.cargo.units} / {ship.cargo.capacity}
              </div>
            </div>
            <div className="flex gap-2">
              <UserGroupIcon className="h-6 w-6" />
              <div>
                {ship.crew.current} / {ship.crew.capacity}
              </div>
            </div>
          </div>
          <div>
            <Orbit ship={ship.symbol} />
            <ScanWaypoints ship={ship.symbol} />
          </div>
        </div>
      </div>
    </div>
  )
}
