import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useSystemWaypointContext } from '@/context/system-waypoint.context'
import { getJumpGate } from '@/services/api/spacetraders'

export const WaypointJumpGate = () => {
  const { systemID, waypointID } = useSystemWaypointContext()
  const { data, isSuccess } = useQuery({
    queryKey: ['jump-gate', systemID, waypointID],
    queryFn: ({ signal }) => getJumpGate({ path: { system: systemID, waypoint: waypointID } }, { signal }),
  })

  if (!isSuccess) return null

  const jumpgate = data.data

  return (
    <div className="grid gap-4">
      <div className="text-headline text-center">Connected Systems</div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        {jumpgate.connectedSystems.map((system) => {
          return (
            <div
              key={system.symbol}
              className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 px-4 py-3 dark:bg-opacity-10"
            >
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
        })}
      </div>
    </div>
  )
}
