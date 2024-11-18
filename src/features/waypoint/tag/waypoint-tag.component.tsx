import { clsx } from '@/utilities/clsx.helper'
import type { WaypointTagProps } from './waypoint-tag.types'

export const WaypointTag = ({ type, className, children, ...props }: WaypointTagProps) => {
  return (
    <div className={clsx('waypoint-tag', className)} data-waypoint-type={type} {...props}>
      {children}
    </div>
  )
}
