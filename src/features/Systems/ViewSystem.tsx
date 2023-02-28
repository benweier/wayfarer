import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { SYSTEM_TYPE, WAYPOINT_TYPE } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { getShipsList, getSystemById } from '@/services/api/spacetraders'
import { SystemWaypoint } from '@/types/spacetraders'
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
      <div className={cx('grid gap-1')}>
        {system.waypoints.map((waypoint) => {
          return (
            <Waypoint
              key={waypoint.symbol}
              systemID={system.symbol}
              waypoint={waypoint}
              hasShipPresence={fleetQuery.data?.has(waypoint.symbol)}
            />
          )
        })}
      </div>
    </div>
  )
}

const Waypoint = ({
  systemID,
  waypoint,
  hasShipPresence = false,
}: {
  systemID: string
  waypoint: SystemWaypoint
  hasShipPresence?: boolean
}) => {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-between gap-2 rounded border-2 bg-zinc-200/50 p-4 shadow-sm dark:bg-zinc-700/25 md:flex-row md:flex-wrap',
        {
          'border-transparent': !hasShipPresence,
          'border-blue-500': hasShipPresence,
        },
      )}
    >
      <div className="flex gap-1">
        <div className="text-lg font-black leading-none">
          <Link className="link" to={`${ROUTES.SYSTEMS}/${systemID}/waypoint/${waypoint.symbol}`}>
            {waypoint.symbol}
          </Link>
          <div className="text-base">
            <span className="font-medium">{WAYPOINT_TYPE[waypoint.type]}</span>{' '}
            <span className="font-light">
              ({waypoint.x}, {waypoint.y})
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
