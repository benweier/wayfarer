import { type PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { Inventory } from '@/components/ship'
import { SHIP_NAV_FLIGHT_MODE, SHIP_NAV_STATUS } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { useShipResponse } from '@/context/ship.context'
import * as ShipActions from '@/features/ship/actions'
import { ShipTransit } from '@/features/ship/transit'
import { ShipDetailRefresh } from './ship-detail-refresh.component'

export const ShipDetail = ({ children }: PropsWithChildren) => {
  const ship = useShipResponse()

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="headline">
          <span className="font-bold">Registration:</span> {ship.registration.name} • {ship.registration.role} •{' '}
          {ship.registration.factionSymbol}
        </div>
        <ShipDetailRefresh />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-row items-end gap-2">
          <div className="flex gap-8">
            <div>
              <div className="text-secondary text-xs uppercase">System</div>
              <div className="font-semibold">
                <Link className="link" to={`${ROUTES.SYSTEMS}/${ship.nav.systemSymbol}`}>
                  {ship.nav.systemSymbol}
                </Link>
              </div>
            </div>
            <div>
              <div className="text-secondary text-xs uppercase">Waypoint</div>
              <div className="flex items-center gap-2">
                <div className="font-semibold">
                  <Link
                    className="link"
                    to={`${ROUTES.SYSTEMS}/${ship.nav.systemSymbol}/waypoint/${ship.nav.waypointSymbol}`}
                  >
                    {ship.nav.waypointSymbol}
                  </Link>
                </div>
                <div className="text-primary text-inverse my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
                  {SHIP_NAV_STATUS.get(ship.nav.status)}
                </div>
                <div className="text-primary text-inverse my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
                  {SHIP_NAV_FLIGHT_MODE.get(ship.nav.flightMode)}
                </div>
              </div>
              {ship.nav.status === 'DOCKED' ? (
                <ShipActions.Orbit ship={ship}>
                  {(props) => (
                    <button className="btn btn-primary btn-flat btn-sm" {...props}>
                      Orbit
                    </button>
                  )}
                </ShipActions.Orbit>
              ) : (
                <ShipActions.Dock ship={ship}>
                  {(props) => (
                    <button className="btn btn-primary btn-flat btn-sm" {...props}>
                      Dock
                    </button>
                  )}
                </ShipActions.Dock>
              )}
            </div>
          </div>
        </div>

        <Inventory ship={ship} />
      </div>

      <ShipTransit nav={ship.nav} />

      {children}
    </div>
  )
}
