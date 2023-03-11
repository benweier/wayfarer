import { Link } from 'react-router-dom'
import { WAYPOINT_TYPE } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { SystemWaypoint, SystemsResponse } from '@/types/spacetraders'

const Waypoint = ({ systemID, waypoint }: { systemID: string; waypoint: SystemWaypoint }) => {
  return (
    <div className="flex flex-col items-center justify-between gap-2 rounded bg-zinc-200/50 p-4 shadow-sm dark:bg-zinc-700/25 md:flex-row md:flex-wrap">
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

export const SystemWaypoints = ({ system }: { system: SystemsResponse }) => {
  return (
    <div className="grid grid-cols-1 gap-1 lg:grid-cols-3">
      {system.waypoints.map((waypoint) => (
        <Waypoint key={waypoint.symbol} systemID={system.symbol} waypoint={waypoint} />
      ))}
    </div>
  )
}
