import { cx } from 'class-variance-authority'
import { WAYPOINT_TYPE_STYLES } from '@/config/waypoint.styles'
import { type WaypointTagProps } from './waypoint-tag.types'

export const WaypointTag = ({ type, children }: WaypointTagProps) => {
  return <div className={cx('rounded-sm py-0.5 px-2 text-xs font-bold', WAYPOINT_TYPE_STYLES[type])}>{children}</div>
}
