import { cx } from '@/utilities/cx'
import { WaypointTagProps } from './waypoint-tag.types'

const WAYPOINT_TYPE_STYLES: Record<string, string> = {
  MOON: 'bg-slate-500 text-slate-50',
  GAS_GIANT: 'bg-orange-600 text-orange-100',
  NEBULA: 'bg-yellow-300 text-yellow-950',
  ASTEROID_FIELD: 'bg-lime-300 text-lime-950',
  PLANET: 'bg-emerald-600 text-emerald-50',
  DEBRIS_FIELD: 'bg-cyan-300 text-cyan-950',
  ORBITAL_STATION: 'bg-fuchsia-600 text-fuchsia-50',
  JUMP_GATE: 'bg-zinc-100 text-zinc-950',
  GRAVITY_WELL: 'bg-gray-950 text-gray-50',
}

export const WaypointTag = ({ type, children }: WaypointTagProps) => {
  return (
    <div
      className={cx(
        'rounded-sm px-2 py-1 text-xs font-bold uppercase leading-none tracking-wide',
        WAYPOINT_TYPE_STYLES[type],
      )}
    >
      {children}
    </div>
  )
}
