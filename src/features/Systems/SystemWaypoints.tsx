import { Link } from 'react-router-dom'
import { WAYPOINT_TYPE } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { SystemWaypoint, SystemsResponse } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'

const Waypoint = ({ systemID, waypoint }: { systemID: string; waypoint: SystemWaypoint }) => {
  return (
    <div className="flex flex-col justify-between rounded bg-zinc-200/50 p-4 shadow-sm dark:bg-zinc-700/25">
      <div>
        <Link className="link text-lg" to={`${ROUTES.SYSTEMS}/${systemID}/waypoint/${waypoint.symbol}`}>
          {waypoint.symbol}
        </Link>
      </div>
      <div className="flex items-center justify-between gap-1">
        <span
          className={cx('rounded-sm px-2 py-1 text-xs font-bold uppercase leading-none', {
            'bg-slate-500 text-slate-200': waypoint.type === 'MOON',
            'bg-orange-600 text-orange-100': waypoint.type === 'GAS_GIANT',
            'bg-yellow-300 text-yellow-900': waypoint.type === 'NEBULA',
            'bg-lime-300 text-lime-900': waypoint.type === 'ASTEROID_FIELD',
            'bg-emerald-600 text-emerald-50': waypoint.type === 'PLANET',
            'bg-cyan-300 text-cyan-900': waypoint.type === 'DEBRIS_FIELD',
            'bg-fuchsia-600 text-fuchsia-100': waypoint.type === 'ORBITAL_STATION',
            'bg-zinc-100 text-zinc-900': waypoint.type === 'JUMP_GATE',
            'bg-zinc-900 text-zinc-50': waypoint.type === 'GRAVITY_WELL',
          })}
        >
          {WAYPOINT_TYPE[waypoint.type]}
        </span>

        <span className="text-secondary text-sm">
          ({waypoint.x}, {waypoint.y})
        </span>
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
