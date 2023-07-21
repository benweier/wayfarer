import { Link } from 'react-router-dom'
import { type WaypointJumpGateItemProps } from './waypoint-jumpgate.types'

export const WaypointJumpGateItem = ({ system }: WaypointJumpGateItemProps) => {
  return (
    <div key={system.symbol} className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 px-4 py-3 dark:bg-opacity-10">
      <div>
        <Link key={system.symbol} className="link font-semibold" to={`/systems/${system.symbol}`}>
          {system.symbol}
        </Link>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="text-secondary text-sm">Distance: {system.distance}</div>
        <div className="text-secondary text-sm">
          ({system.x}, {system.y})
        </div>
      </div>
    </div>
  )
}
