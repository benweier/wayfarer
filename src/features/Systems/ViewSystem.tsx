import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { SYSTEM_TYPE, WAYPOINT_TYPE } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { getShipsList, getSystemById } from '@/services/api/spacetraders'
import { cx } from '@/utilities/cx'

export const ViewSystem = ({ id }: { id: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['system', id],
    queryFn: ({ signal }) => getSystemById({ path: id }, { signal }),
  })
  const fleetQuery = useQuery({
    queryKey: ['ships'],
    queryFn: ({ signal }) => getShipsList(undefined, { signal }),
    select: (response) => {
      return response.data.reduce<Set<string>>((result, ship) => {
        result.add(ship.nav.waypointSymbol)
        return result
      }, new Set())
    },
  })

  if (!isSuccess) return null

  const system = data.data

  return (
    <div key={system.symbol} className="grid gap-8">
      <div className="flex flex-row items-center justify-start gap-4">
        <div className="truncate text-xl font-semibold">{SYSTEM_TYPE[system.type] ?? system.type}</div>
        <div className="truncate text-lg font-light">
          ({system.x}, {system.y})
        </div>
      </div>
      <div className={cx('grid gap-1 md:grid-cols-2 lg:grid-cols-4')}>
        {system.waypoints.map((waypoint) => {
          return (
            <div
              key={waypoint.symbol}
              className={cx('flex flex-col gap-2 rounded border-2 bg-zinc-200/50 p-4 shadow-sm dark:bg-zinc-700/25', {
                'border-transparent': !fleetQuery.data?.has(waypoint.symbol),
                'border-blue-500': fleetQuery.data?.has(waypoint.symbol),
              })}
            >
              <div className="grid gap-1">
                <div className="text-center text-lg font-black leading-none">
                  <Link className="link" to={`${ROUTES.SYSTEMS}/${system.symbol}/waypoint/${waypoint.symbol}`}>
                    {waypoint.symbol}
                  </Link>
                </div>
                <div className="text-center text-xs">
                  <span className="font-medium">{WAYPOINT_TYPE[waypoint.type]}</span>{' '}
                  <span className="font-light">
                    ({waypoint.x}, {waypoint.y})
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
