import { useIsMutating } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ShipIcon } from '@/components/icons'
import { SHIP_NAV_FLIGHT_MODE, SHIP_NAV_STATUS } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { useShipTransit } from '@/features/ship/transit'
import { type ShipResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import { ShipControls } from './ship-item.controls'
import { type ShipItemProps } from './ship-item.types'

const TransitStatusPreview = ({ ship }: { ship: ShipResponse }) => {
  const transit = useShipTransit(ship)

  if (ship.nav.status !== 'IN_TRANSIT') return null

  return (
    <div className="h-0.5 grow rounded-full bg-zinc-200 dark:bg-zinc-600">
      <div className="h-full rounded-full bg-green-500" style={{ width: `${transit.progress}%` }} />
    </div>
  )
}

export const ShipItem = ({ ship }: ShipItemProps) => {
  const isMutating =
    useIsMutating({ mutationKey: [{ scope: 'ships', entity: 'item' }, { shipSymbol: ship.symbol }] }) > 0

  return (
    <div
      className={cx(
        'relative z-auto rounded bg-zinc-100 p-4 @container/ship-item dark:border-zinc-700 dark:bg-zinc-700/25',
        {
          'pointer-events-none opacity-30': isMutating,
        },
      )}
    >
      <div className="flex flex-row flex-wrap items-center justify-between gap-x-8 gap-y-2">
        <div className="flex w-full flex-1 flex-row flex-wrap items-center justify-start gap-x-4 gap-y-2 @md/ship-item:max-w-[700px]">
          <div className="[width:180px]">
            <Link to={`/fleet/ship/${ship.symbol}`} className="link text-xl font-bold">
              {ship.symbol}
            </Link>
          </div>
          <div className="relative flex w-[400px] flex-row flex-wrap items-end gap-x-2 gap-y-1">
            <div className="flex gap-8">
              <div>
                <div className="text-secondary text-xs font-medium uppercase">System</div>
                <div className="text-sm font-semibold">
                  <Link className="link" to={`${ROUTES.SYSTEMS}/${ship.nav.systemSymbol}`}>
                    {ship.nav.systemSymbol}
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-secondary text-xs font-medium uppercase">Waypoint</div>
                <div className="text-sm font-semibold">
                  <Link
                    className="link"
                    to={`${ROUTES.SYSTEMS}/${ship.nav.systemSymbol}/waypoint/${ship.nav.waypointSymbol}`}
                  >
                    {ship.nav.waypointSymbol}
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex gap-x-1">
              <div className="text-inverse text-primary my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
                {SHIP_NAV_STATUS.get(ship.nav.status) ?? ship.nav.status}
              </div>
              <div className="text-inverse text-primary my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
                {SHIP_NAV_FLIGHT_MODE.get(ship.nav.flightMode) ?? ship.nav.flightMode}
              </div>
              <div className="absolute inset-x-0 -bottom-1">
                <TransitStatusPreview ship={ship} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-6 @4xl/ship-item:w-[400px] @4xl/ship-item:justify-end">
          <div className="flex justify-end gap-4 @md/ship-item:gap-6">
            <div className="flex items-center gap-1">
              <ShipIcon id="fuel" className="h-4 w-4 text-teal-500" />
              <div className="text-xs @lg/ship-item:text-sm">
                {ship.fuel.current} / {ship.fuel.capacity}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShipIcon id="cargo" className="h-4 w-4 text-fuchsia-500" />
              <div className="text-xs @lg/ship-item:text-sm">
                {ship.cargo.units} / {ship.cargo.capacity}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShipIcon id="crew" className="h-4 w-4 text-amber-500" />
              <div className="text-xs @lg/ship-item:text-sm">
                {ship.crew.current} / {ship.crew.capacity}
              </div>
            </div>
          </div>
          <ShipControls ship={ship} />
        </div>
      </div>
    </div>
  )
}
