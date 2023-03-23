import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useRouteTransit } from '@/components/Ship/useRouteTransit'
import { SHIP_NAV_FLIGHT_MODE, SHIP_NAV_STATUS } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { NavigationResponse } from '@/types/spacetraders'

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
        {SHIP_NAV_STATUS.get(nav.status) ?? nav.status}
      </div>
      <div className="text-primary text-inverse my-0.5 rounded-full bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
        {SHIP_NAV_FLIGHT_MODE.get(nav.flightMode) ?? nav.flightMode}
      </div>
    </div>
  )
}

export const Route = ({ nav }: { nav: NavigationResponse }) => {
  const transit = useRouteTransit()

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
          <div>
            <ChevronRightIcon className="text-secondary h-4 w-4" />
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
              {transit.remainingSeconds > 0 ? 'Arriving' : 'Arrived'}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">
                {transit.arrival.toLocaleDateString()} {transit.arrival.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <div className="h-1 grow rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-green-500"
              style={{ width: `${(transit.remainingSeconds / transit.totalSeconds) * 100}%` }}
            />
          </div>
          <div className="text-secondary text-sm">
            {transit.remainingSeconds === 0 ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            ) : (
              `${transit.remainingSeconds} s`
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
