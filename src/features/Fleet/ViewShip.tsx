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

  return (
    <div className="grid">
      <div key={data.symbol} className="bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-700/25">
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="rounded bg-black py-1 px-2 text-xs font-bold">
            {SHIP_NAV_STATUS[data.nav.status] ?? data.nav.status}
          </div>
          <div className="rounded bg-black py-1 px-2 text-xs font-bold">
            {SHIP_NAV_FLIGHT_MODE[data.nav.flightMode] ?? data.nav.flightMode}
          </div>
          <div className="flex flex-1 flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-medium uppercase">{data.symbol}</div>
              <div className="truncate text-lg font-semibold">{data.registration.name}</div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase">System</div>
              <div className="truncate text-lg font-semibold">{data.nav.systemSymbol}</div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase">Waypoint</div>
              <div className="truncate text-lg font-semibold">{data.nav.waypointSymbol}</div>
            </div>
            <div className="flex gap-2">
              <BoltIcon className="h-6 w-6" />
              <div>
                {data.fuel.current} / {data.fuel.capacity}
              </div>
            </div>
            <div className="flex gap-2">
              <CubeIcon className="h-6 w-6" />
              <div>
                {data.cargo.units} / {data.cargo.capacity}
              </div>
            </div>
            <div className="flex gap-2">
              <UserGroupIcon className="h-6 w-6" />
              <div>
                {data.crew.current} / {data.crew.capacity}
              </div>
            </div>
          </div>
          <div>
            <Orbit ship={data.symbol} />
            <ScanWaypoints ship={data.symbol} />
          </div>
        </div>
      </div>
    </div>
  )
}
