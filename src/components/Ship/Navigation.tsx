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
          <div className="text-secondary text-xs uppercase">System</div>
          <div className="font-semibold leading-snug">
            <Link className="link" to={`${ROUTES.SYSTEMS}/${nav.systemSymbol}`}>
              {nav.systemSymbol}
            </Link>
          </div>
        </div>
        <div>
          <div className="text-secondary text-xs uppercase">Waypoint</div>
          <div className="font-semibold leading-snug">
            <Link className="link" to={`${ROUTES.SYSTEMS}/${nav.systemSymbol}/waypoint/${nav.waypointSymbol}`}>
              {nav.waypointSymbol}
            </Link>
          </div>
        </div>
      </div>
      <div className="text-primary text-inverse my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
        {SHIP_NAV_STATUS[nav.status] ?? nav.status}
      </div>
      <div className="text-primary text-inverse my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
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
        <div className="text-secondary text-xs uppercase">Route</div>
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
            <ChevronRightIcon className="text-secondary h-4 w-4" />
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
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-8">
          <div className="flex flex-col items-start">
            <div className="text-secondary text-xs uppercase">Departed</div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">---</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-secondary text-xs uppercase">
              {Date.now() < arrival.getTime() ? 'Arriving' : 'Arrived'}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">
                {arrival.toLocaleDateString()} {arrival.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="h-1 w-full rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-green-500" style={{ width: `${100}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
