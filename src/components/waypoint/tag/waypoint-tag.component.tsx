import { cx } from 'class-variance-authority'
import { type WaypointTagProps } from './waypoint-tag.types'

const ASTEROID_CLASSES = 'bg-stone-200 dark:bg-stone-600 dark:text-stone-100 text-stone-900'
const WAYPOINT_TYPE_STYLES: Record<string, string> = {
  MOON: 'bg-slate-500 text-slate-50',
  GAS_GIANT: 'bg-orange-700 text-orange-50',
  NEBULA: 'bg-amber-400 text-amber-950',
  ASTEROID_FIELD: ASTEROID_CLASSES,
  ASTEROID_BASE: ASTEROID_CLASSES,
  ASTEROID: ASTEROID_CLASSES,
  ENGINEERED_ASTEROID: ASTEROID_CLASSES,
  FUEL_STATION: 'bg-lime-300 text-lime-950',
  PLANET: 'bg-emerald-600 text-emerald-50',
  DEBRIS_FIELD: 'bg-teal-300 text-teal-950',
  ORBITAL_STATION: 'bg-fuchsia-600 text-fuchsia-50',
  JUMP_GATE: 'bg-gray-50 text-gray-950',
  GRAVITY_WELL: 'bg-gray-950 text-gray-50',
}

export const WaypointTag = ({ type, children }: WaypointTagProps) => {
  return (
    <div className={cx('rounded-sm px-2 py-0.5 text-xs font-bold uppercase', WAYPOINT_TYPE_STYLES[type])}>
      {children}
    </div>
  )
}
