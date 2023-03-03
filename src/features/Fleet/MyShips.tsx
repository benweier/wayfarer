import { BoltIcon, CubeIcon, UserGroupIcon, WrenchIcon } from '@heroicons/react/20/solid'
import { useIsMutating, useMutation, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Modal } from '@/components/Modal'
import { SHIP_NAV_FLIGHT_MODE, SHIP_NAV_STATUS } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { createShipScanWaypoint, getShipsList } from '@/services/api/spacetraders'
import { ShipResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import * as ShipActions from './ShipActions'

export const MyShips = () => {
  const { isSuccess, data, isFetching } = useQuery({
    queryKey: ['ships'],
    queryFn: ({ signal }) => getShipsList(undefined, { signal }),
  })

  if (!isSuccess) return null

  return (
    <div className={cx('grid gap-1', { 'opacity-30': isFetching })}>
      <div
        className={cx('absolute inset-0 backdrop-blur-xs transition-opacity duration-100 ease-in-out', {
          'pointer-events-none opacity-0': !isFetching,
          'pointer-events-auto opacity-100': isFetching,
        })}
      />
      {data.data.map((ship) => {
        return <Ship key={ship.symbol} ship={ship} />
      })}
    </div>
  )
}

const Ship = ({ ship }: { ship: ShipResponse }) => {
  const mutating = useIsMutating(['ship', ship.symbol], { exact: false })

  return (
    <div
      className={cx('bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-700/25', {
        'pointer-events-none opacity-30': mutating > 0,
      })}
    >
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
                <Link className="link" to={`${ROUTES.SYSTEMS}/${ship.nav.systemSymbol}`}>
                  {ship.nav.systemSymbol}
                </Link>
              </div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase opacity-60">Waypoint</div>
              <div className="font-semibold">
                <Link
                  className="link"
                  to={`${ROUTES.SYSTEMS}/${ship.nav.systemSymbol}/waypoint/${ship.nav.waypointSymbol}`}
                >
                  {ship.nav.waypointSymbol}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-8 [width:400px]">
            <div className="flex items-center gap-2">
              <BoltIcon className="h-5 w-5 text-teal-500" />
              <div className="text-sm">
                {ship.fuel.current} / {ship.fuel.capacity}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CubeIcon className="h-5 w-5 text-fuchsia-500" />
              <div className="text-sm">
                {ship.cargo.units} / {ship.cargo.capacity}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <UserGroupIcon className="h-5 w-5 text-amber-500" />
              <div className="text-sm">
                {ship.crew.current} / {ship.crew.capacity}
              </div>
            </div>
          </div>
          <div className="flex">
            {ship.nav.status === 'DOCKED' ? (
              <ShipActions.Orbit shipID={ship.symbol} />
            ) : (
              <ShipActions.Dock shipID={ship.symbol} />
            )}
            <ScanWaypoints shipID={ship.symbol} />
            <ShipActions.Navigate shipID={ship.symbol} systemID={ship.nav.systemSymbol} />
          </div>
        </div>
        <div>
          <Link to={`/fleet/ship/${ship.symbol}`} className="btn btn-outline btn-light btn-sm block dark:btn-dark">
            <WrenchIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

const ScanWaypoints = ({ shipID }: { shipID: string }) => {
  const { mutate, isSuccess, data } = useMutation({
    mutationKey: ['ship', shipID, 'scan-waypoints'],
    mutationFn: (shipID: string) => createShipScanWaypoint({ path: shipID }),
  })

  return (
    <Modal
      isOpen={isSuccess}
      trigger={
        <button className="btn btn-sm" onClick={() => mutate(shipID)}>
          Scan
        </button>
      }
    >
      {isSuccess && (
        <div className="grid gap-4">
          <div className="text-lg font-bold">
            Waypoints <span className="font-light">({data.data.waypoints.length})</span>
          </div>

          <div className="grid gap-2">
            {data.data.waypoints.map((waypoint) => (
              <div key={waypoint.symbol}>
                <Link to={`${ROUTES.SYSTEMS}/${waypoint.systemSymbol}/waypoint/${waypoint.symbol}`}>
                  {waypoint.symbol}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  )
}
