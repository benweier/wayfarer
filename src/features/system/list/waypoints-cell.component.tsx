import { Link } from '@tanstack/react-router'
import { cx } from 'class-variance-authority'
import { WAYPOINT_TYPE_STYLES } from '@/config/waypoint.styles'
import { systemRoute } from '@/routes/system.route'
import { waypointRoute } from '@/routes/waypoint.route'
import { type SystemWaypoint } from '@/types/spacetraders'
import { chunk } from '@/utilities/chunk.helper'

const EXCLUDED_WAYPOINTS = new Set(['ASTEROID', 'ENGINEERED_ASTEROID', 'ASTEROID_BASE'])

export const SystemWaypointsCell = ({
  systemSymbol,
  waypoints,
}: {
  systemSymbol: string
  waypoints: SystemWaypoint[]
}) => {
  const values = waypoints.reduce<{
    waypoints: Array<{
      symbol: string
      type: string
      label: string | number
    }>
    asteroids: {
      symbol: string
      type: string
      label: number
    }
  }>(
    (result, waypoint) => {
      if (EXCLUDED_WAYPOINTS.has(waypoint.type)) {
        result.asteroids.label += 1

        return result
      }

      result.waypoints.push({
        symbol: waypoint.symbol,
        type: waypoint.type,
        label: waypoint.type.charAt(0),
      })

      return result
    },
    {
      waypoints: [],
      asteroids: {
        symbol: 'ASTEROIDS',
        type: 'ASTEROID',
        label: 0,
      },
    },
  )
  const pages = chunk(values.waypoints, 10)

  switch (pages.length) {
    case 0: {
      pages.push([values.asteroids])
      break
    }

    case 1: {
      pages[0].push(values.asteroids)
      break
    }

    default: {
      const lastPage = pages.at(-1)

      if (lastPage !== undefined && lastPage.length < 3) {
        const popped = pages.pop()

        if (popped) pages[pages.length - 1] = pages[pages.length - 1].concat(popped)
      }

      pages[pages.length - 1].push(values.asteroids)
      break
    }
  }

  return (
    <div className="relative isolate list-none -space-y-1.5">
      {pages.map((page, index) => {
        return (
          <div key={index} className="flex items-center justify-end -space-x-1.5">
            {page.map((waypoint) => {
              if (waypoint.type !== 'ASTEROID') {
                return (
                  <Link
                    key={waypoint.symbol}
                    to={waypointRoute.to}
                    params={{ systemSymbol, waypointSymbol: waypoint.symbol }}
                    className={cx(
                      'flex size-7 items-center justify-center rounded-full border-2 border-zinc-50 transition duration-100 ease-in-out hover:z-0 hover:scale-125 dark:border-zinc-800',
                      WAYPOINT_TYPE_STYLES[waypoint.type],
                    )}
                  >
                    <span className="text-sm font-medium" aria-hidden>
                      {waypoint.label}
                    </span>
                    <span className="sr-only">
                      {waypoint.type} {waypoint.symbol}
                    </span>
                  </Link>
                )
              }

              if (waypoint.label === 0) return null

              return (
                <Link
                  key={waypoint.symbol}
                  to={systemRoute.to}
                  params={{ systemSymbol }}
                  className={cx(
                    'flex size-7 items-center justify-center rounded-full border-2 border-zinc-50 transition duration-100 ease-in-out hover:z-0 hover:scale-125 dark:border-zinc-800',
                    WAYPOINT_TYPE_STYLES[waypoint.type],
                  )}
                >
                  <span className="text-sm font-medium" aria-hidden>
                    {waypoint.label}
                  </span>
                  <span className="sr-only">
                    {waypoint.label} {waypoint.symbol}
                  </span>
                </Link>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
