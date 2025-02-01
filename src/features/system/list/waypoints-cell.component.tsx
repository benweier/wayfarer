import { Link } from '@tanstack/react-router'
import { WaypointTag } from '@/features/waypoint/tag'
import { chunk } from '@/utilities/chunk.helper'
import type { SystemWaypoint } from '@/types/spacetraders'

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
    <div className="-space-y-1.5 relative isolate list-none">
      {pages.map((page, index) => {
        const key = `page-${index}`

        return (
          <div key={key} className="-space-x-1.5 flex items-center justify-end">
            {page.map((waypoint) => {
              if (waypoint.type !== 'ASTEROID') {
                return (
                  <Link
                    key={waypoint.symbol}
                    to="/systems/$systemSymbol/waypoint/$waypointSymbol"
                    params={{ systemSymbol, waypointSymbol: waypoint.symbol }}
                  >
                    <WaypointTag
                      type={waypoint.type}
                      className="flex size-7 items-center justify-center border-2 border-border-primary transition duration-100 ease-in-out hover:z-0 hover:scale-125"
                      style={{ '--waypoint-tag-radius': 'var(--radius-full)' }}
                    >
                      <span className="text-sm font-medium" aria-hidden="true">
                        {waypoint.label}
                      </span>
                      <span className="sr-only">
                        {waypoint.type} {waypoint.symbol}
                      </span>
                    </WaypointTag>
                  </Link>
                )
              }

              if (waypoint.label === 0) return null

              return (
                <Link key={waypoint.symbol} to="/systems/$systemSymbol" params={{ systemSymbol }}>
                  <WaypointTag
                    type="ASTEROID"
                    className="flex size-7 items-center justify-center border-2 border-border-primary transition duration-100 ease-in-out hover:z-0 hover:scale-125"
                    style={{ '--waypoint-tag-radius': 'var(--radius-full)' }}
                  >
                    <span className="text-sm font-medium" aria-hidden="true">
                      {waypoint.label}
                    </span>
                    <span className="sr-only">
                      {waypoint.type} {waypoint.symbol}
                    </span>
                  </WaypointTag>
                </Link>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
