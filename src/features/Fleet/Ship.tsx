import { BoltIcon, CubeIcon, UserGroupIcon } from '@heroicons/react/20/solid'
import { useIsMutating } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { SHIP_NAV_FLIGHT_MODE, SHIP_NAV_STATUS } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { useShipStore } from '@/services/store/ship'
import { ShipResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import * as ShipActions from './ShipActions'

export const Ship = ({ ship }: { ship: ShipResponse }) => {
  const isCoolingDown = useShipStore((state) => !!state.ships[ship.symbol]?.cooldown)
  const isMutating = useIsMutating(['ship', ship.symbol], { exact: false })

  return (
    <div className="relative">
      <div
        className={cx('rounded bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-700/25', {
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
              <ShipActions.Navigate shipID={ship.symbol} systemID={ship.nav.systemSymbol} />
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  )
}
