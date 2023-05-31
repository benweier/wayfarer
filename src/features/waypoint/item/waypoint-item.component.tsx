import { Link } from 'react-router-dom'
import { WAYPOINT_TYPE } from '@/config/constants'
import { ROUTES } from '@/config/routes'
import { cx } from '@/utilities/cx'
import { WaypointItemProps } from './waypoint-item.types'

const WAYPOINT_TYPE_STYLES: Record<string, string> = {
  MOON: 'bg-slate-500 text-slate-200',
  GAS_GIANT: 'bg-orange-600 text-orange-100',
  NEBULA: 'bg-yellow-300 text-yellow-900',
  ASTEROID_FIELD: 'bg-lime-300 text-lime-900',
  PLANET: 'bg-emerald-600 text-emerald-50',
  DEBRIS_FIELD: 'bg-cyan-300 text-cyan-900',
  ORBITAL_STATION: 'bg-fuchsia-600 text-fuchsia-100',
  JUMP_GATE: 'bg-zinc-100 text-zinc-900',
  GRAVITY_WELL: 'bg-zinc-900 text-zinc-50',
}

export const WaypointItem = ({ systemID, waypoint }: WaypointItemProps) => {
  return (
    <div className="flex flex-col justify-between rounded bg-zinc-200/50 p-4 shadow-sm dark:bg-zinc-700/25">
      <div>
        <Link className="link text-lg" to={`${ROUTES.SYSTEMS}/${systemID}/waypoint/${waypoint.symbol}`}>
          {waypoint.symbol}
        </Link>
      </div>
      <div className="flex items-center justify-between gap-1">
        <span
          className={cx(
            'rounded-sm px-2 py-1 text-xs font-bold uppercase leading-none',
            WAYPOINT_TYPE_STYLES[waypoint.type],
          )}
        >
          {WAYPOINT_TYPE.get(waypoint.type) ?? waypoint.type}
        </span>

        <span className="text-secondary text-sm">
          ({waypoint.x}, {waypoint.y})
        </span>
      </div>
    </div>
  )
}
