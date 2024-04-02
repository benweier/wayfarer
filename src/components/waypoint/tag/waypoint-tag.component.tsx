import { cx } from 'class-variance-authority'
import styles from './waypoint-tag.module.css'
import { type WaypointTagProps } from './waypoint-tag.types'

export const WaypointTag = ({ type, className, children, ...props }: WaypointTagProps) => {
  return (
    <div className={cx(styles['waypoint-tag'], className)} data-waypoint-type={type} {...props}>
      {children}
    </div>
  )
}
