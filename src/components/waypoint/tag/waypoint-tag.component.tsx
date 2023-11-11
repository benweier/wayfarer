import { cx } from 'class-variance-authority'
import { WAYPOINT_TYPE_STYLES } from '@/config/waypoint.styles'
import { type WaypointTagProps } from './waypoint-tag.types'

export const WaypointTag = ({ type, children }: WaypointTagProps) => {
  return (
    <div className={cx('inline-block rounded-sm px-2 py-0.5 text-xs font-bold uppercase', WAYPOINT_TYPE_STYLES[type])}>
      {children}
    </div>
  )
}
