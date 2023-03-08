import { BoltIcon, CubeIcon, UserGroupIcon } from '@heroicons/react/20/solid'
import { useIsMutating, useMutation, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Modal } from '@/components/Modal'
import { SHIP_NAV_FLIGHT_MODE, SHIP_NAV_STATUS } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { createShipScanWaypoint, getShipsList } from '@/services/api/spacetraders'
import { SpaceTradersError } from '@/services/api/spacetraders/core'
import { STATUS_CODES, isHttpError } from '@/services/http'
import { useShipStore } from '@/services/store/ship'
import { CooldownResponse, ShipResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import * as ShipActions from './ShipActions'

export const MyShips = () => {
  const { isSuccess, data, isFetching } = useQuery({
    queryKey: ['ships'],
    queryFn: ({ signal }) => getShipsList(undefined, { signal }),
  })

  if (!isSuccess) return null

  const ships = data.data

  return (
    <div className={cx('grid gap-1', { 'opacity-30': isFetching })}>
      <div
        className={cx('absolute inset-0 backdrop-blur-xs transition-opacity duration-100 ease-in-out', {
          'pointer-events-none opacity-0': !isFetching,
          'pointer-events-auto opacity-100': isFetching,
        })}
      />
      {ships.map((ship) => (
        <Ship key={ship.symbol} ship={ship} />
      ))}
    </div>
  )
}

const Ship = ({ ship }: { ship: ShipResponse }) => {
  const isCoolingDown = useShipStore((state) => !!state.ships[ship.symbol]?.cooldown)
  const isMutating = useIsMutating(['ship', ship.symbol], { exact: false })

  return (
    <div
      className={cx('bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-700/25', {
        'pointer-events-none opacity-30': isMutating > 0,
      })}
    >
      <div className="flex flex-row items-center justify-start gap-8">
        <div className="flex flex-1 flex-row items-center justify-between gap-4">
          <div className="[width:180px]">
            <Link to={`/fleet/ship/${ship.symbol}`} className="link text-xl font-bold">
              {ship.symbol}
            </Link>
          </div>
          <div className="flex flex-row items-end gap-2 [width:400px]">
            <div className="flex gap-8">
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
            <div className="rounded bg-black py-1 px-2 text-xs font-bold">
              {SHIP_NAV_STATUS[ship.nav.status] ?? ship.nav.status}
            </div>
            <div className="rounded bg-black py-1 px-2 text-xs font-bold">
              {SHIP_NAV_FLIGHT_MODE[ship.nav.flightMode] ?? ship.nav.flightMode}
            </div>
          </div>
          <div className="flex gap-8 [width:350px]">
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
          <fieldset disabled={isCoolingDown} className="flex">
            {ship.nav.status === 'DOCKED' ? (
              <ShipActions.Orbit shipID={ship.symbol} />
            ) : (
              <ShipActions.Dock shipID={ship.symbol} />
            )}
            <ScanWaypoints shipID={ship.symbol} />
            <ShipActions.Navigate shipID={ship.symbol} systemID={ship.nav.systemSymbol} />
          </fieldset>
        </div>
      </div>
    </div>
  )
}

const ScanWaypoints = ({ shipID }: { shipID: string }) => {
  const setCooldown = useShipStore((state) => state.setCooldown)
  const { mutate, isSuccess, data } = useMutation({
    mutationKey: ['ship', shipID, 'scan'],
    mutationFn: (shipID: string) => createShipScanWaypoint({ path: shipID }),
    onSuccess: (response, shipID) => {
      setCooldown(shipID, response.data.cooldown)
    },
    onError: async (err, shipID) => {
      if (!isHttpError(err, STATUS_CODES.CONFLICT)) return

      try {
        const cooldown: SpaceTradersError<{ cooldown: CooldownResponse }> = await err.json()
        if (cooldown.error?.data.cooldown) setCooldown(shipID, cooldown.error.data.cooldown)
      } catch (err) {
        //
      }
    },
  })

  const waypoints = isSuccess ? data?.data.waypoints : []

  return (
    <Modal
      isOpen={isSuccess}
      trigger={
        <button className="btn btn-sm" onClick={() => mutate(shipID)}>
          Scan
        </button>
      }
    >
      <div className="grid gap-4">
        <div className="text-lg font-bold">
          Waypoints <span className="font-light">({waypoints.length})</span>
        </div>

        <div className="grid gap-2">
          {waypoints.map((waypoint) => (
            <div key={waypoint.symbol}>
              <Link to={`${ROUTES.SYSTEMS}/${waypoint.systemSymbol}/waypoint/${waypoint.symbol}`}>
                {waypoint.symbol}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
