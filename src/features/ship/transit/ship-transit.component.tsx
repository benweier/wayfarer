import { Link } from 'react-router-dom'
import { ShipIcon } from '@/components/icons'
import { ROUTES } from '@/config/routes'
import { ShipTransitJump } from './ship-transit.jump'
import { ShipTransitNavigate } from './ship-transit.navigate'
import { ShipTransitStatus } from './ship-transit.status'
import { ShipTransitProps } from './ship-transit.types'
import { ShipTransitWarp } from './ship-transit.warp'

export const ShipTransit = ({ nav }: ShipTransitProps) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col items-start">
        <div className="text-secondary text-xs uppercase">Route</div>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">
            <Link className="link" to={`${ROUTES.SYSTEMS}/${nav.route.departure.systemSymbol}`}>
              {nav.route.departure.systemSymbol}
            </Link>{' '}
            •{' '}
            <Link
              className="link"
              to={`${ROUTES.SYSTEMS}/${nav.route.departure.systemSymbol}/waypoint/${nav.route.departure.symbol}`}
            >
              {nav.route.departure.symbol}
            </Link>
          </div>
          <div className="flex flex-row flex-nowrap -space-x-2">
            <ShipIcon id="chevron:right" className="text-secondary h-4 w-4" />
            <ShipIcon id="chevron:right" className="text-secondary h-4 w-4" />
            <ShipIcon id="chevron:right" className="text-secondary h-4 w-4" />
          </div>
          <div className="text-sm font-medium">
            <Link className="link" to={`${ROUTES.SYSTEMS}/${nav.route.destination.systemSymbol}`}>
              {nav.route.destination.systemSymbol}
            </Link>{' '}
            •{' '}
            <Link
              className="link"
              to={`${ROUTES.SYSTEMS}/${nav.route.destination.systemSymbol}/waypoint/${nav.route.destination.symbol}`}
            >
              {nav.route.destination.symbol}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ShipTransitNavigate
            trigger={(props) => (
              <button className="btn btn-warn btn-flat btn-sm" disabled={nav.status !== 'IN_ORBIT'} {...props}>
                Navigate
              </button>
            )}
          />
          <ShipTransitWarp
            trigger={(props) => (
              <button className="btn btn-warn btn-flat btn-sm" disabled={nav.status !== 'IN_ORBIT'} {...props}>
                Warp
              </button>
            )}
          />
          <ShipTransitJump
            trigger={(props) => (
              <button className="btn btn-warn btn-flat btn-sm" disabled={nav.status !== 'IN_ORBIT'} {...props}>
                Jump
              </button>
            )}
          />
        </div>
      </div>

      <ShipTransitStatus />
    </div>
  )
}
