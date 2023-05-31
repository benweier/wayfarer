import { Link } from 'react-router-dom'
import { JumpGateConnectedSystem } from '@/types/spacetraders'

export const WaypointJumpGateItem = ({ system }: { system: JumpGateConnectedSystem }) => {
  return (
    <div key={system.symbol} className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 px-4 py-3 dark:bg-opacity-10">
      <Link key={system.symbol} className="link font-semibold" to={`/systems/${system.symbol}`}>
        {system.symbol}
      </Link>
      <div className="flex items-center justify-between gap-4">
        <div className="text-secondary text-sm">Distance: {system.distance}</div>
        <div className="text-secondary text-sm">
          ({system.x}, {system.y})
        </div>
      </div>
    </div>
  )
}
