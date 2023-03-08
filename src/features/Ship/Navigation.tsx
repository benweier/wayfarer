import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { SHIP_NAV_FLIGHT_MODE, SHIP_NAV_STATUS } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { NavigationResponse, NavigationRoute } from '@/types/spacetraders'

export const Status = ({ nav }: { nav: NavigationResponse }) => {
  return (
    <div className="flex flex-row items-end gap-2">
      <div className="flex gap-8">
        <div>
          <div className="text-xs font-medium uppercase opacity-60">System</div>
          <div className="font-semibold">
            <Link className="link" to={`${ROUTES.SYSTEMS}/${nav.systemSymbol}`}>
              {nav.systemSymbol}
            </Link>
          </div>
        </div>
        <div>
          <div className="text-xs font-medium uppercase opacity-60">Waypoint</div>
          <div className="font-semibold">
            <Link className="link" to={`${ROUTES.SYSTEMS}/${nav.systemSymbol}/waypoint/${nav.waypointSymbol}`}>
              {nav.waypointSymbol}
            </Link>
          </div>
        </div>
      </div>
      <div className="rounded bg-black py-1 px-2 text-xs font-bold">{SHIP_NAV_STATUS[nav.status] ?? nav.status}</div>
      <div className="rounded bg-black py-1 px-2 text-xs font-bold">
        {SHIP_NAV_FLIGHT_MODE[nav.flightMode] ?? nav.flightMode}
      </div>
    </div>
  )
}

export const Route = ({ route }: { route: NavigationRoute }) => {
  const arrival = new Date(route.arrival)

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col items-start">
        <div className="text-xs font-medium uppercase opacity-60">Route</div>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">
            <Link className="link" to={`${ROUTES.SYSTEMS}/${route.departure.systemSymbol}`}>
              {route.departure.systemSymbol}
            </Link>{' '}
            •{' '}
            <Link
              className="link"
              to={`${ROUTES.SYSTEMS}/${route.departure.systemSymbol}/waypoint/${route.departure.symbol}`}
            >
              {route.departure.symbol}
            </Link>
          </div>
          <div>
            <ChevronRightIcon className="h-4 w-4 opacity-60" />
          </div>
          <div className="text-sm font-medium">
            <Link className="link" to={`${ROUTES.SYSTEMS}/${route.destination.systemSymbol}`}>
              {route.destination.systemSymbol}
            </Link>{' '}
            •{' '}
            <Link
              className="link"
              to={`${ROUTES.SYSTEMS}/${route.destination.systemSymbol}/waypoint/${route.destination.symbol}`}
            >
              {route.destination.symbol}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-xs font-medium uppercase opacity-60">
          {Date.now() < arrival.getTime() ? 'Arrives' : 'Arrived'}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">
            {arrival.toLocaleDateString()} {arrival.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  )
}
