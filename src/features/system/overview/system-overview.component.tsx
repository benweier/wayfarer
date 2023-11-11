import { cx } from 'class-variance-authority'
import { WAYPOINT_TYPE_STYLES } from '@/config/waypoint.styles'
import { type SystemWaypoint } from '@/types/spacetraders'

export const SystemOverview = ({ waypoints }: { waypoints: SystemWaypoint[] }) => {
  return (
    <div className="py-4">
      <div className="flex flex-row flex-nowrap gap-4">
        {waypoints
          .filter((waypoint) => waypoint.type !== 'ASTEROID')
          .sort((a, b) => {
            const ad = a.x * a.x + a.y * a.y
            const bd = b.x * b.x + b.y * b.y
            const d = ad - bd

            if (d === 0) {
              return a.symbol.localeCompare(b.symbol)
            }

            return d
          })
          .map((waypoint) => {
            return (
              <div key={waypoint.symbol} className={cx('h-5 w-5 rounded-full', WAYPOINT_TYPE_STYLES[waypoint.type])}>
                <span className="sr-only">{waypoint.symbol}</span>
              </div>
            )
          })}
      </div>
    </div>
  )
}
