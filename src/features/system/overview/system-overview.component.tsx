import { WAYPOINT_TYPE_STYLES } from '@/config/waypoint.styles'
import type { SystemResponse } from '@/types/spacetraders'
import { cx } from 'class-variance-authority'

export const SystemOverview = ({ system }: { system: SystemResponse }) => {
  return (
    <div className="flex gap-4 overflow-x-auto py-4">
      {system.waypoints
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
            <div key={waypoint.symbol}>
              <div className="w-48">
                <div className={cx('size-5 rounded-full', WAYPOINT_TYPE_STYLES[waypoint.type])}>
                  <span className="sr-only">{waypoint.symbol}</span>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
