import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getJumpGate } from '@/services/api/spacetraders'

export const WaypointJumpGate = ({ systemID, waypointID }: { systemID: string; waypointID: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['jump-gate', systemID, waypointID],
    queryFn: ({ signal }) => getJumpGate({ path: { system: systemID, waypoint: waypointID } }, { signal }),
  })

  if (!isSuccess) return null

  const jumpgate = data.data

  return (
    <div className="grid gap-8">
      <div className="text-headline">Range: {jumpgate.jumpRange}</div>
      <div>
        <div className="text-headline">Connected Systems</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {jumpgate.connectedSystems.map((system) => {
            return (
              <Link key={system.symbol} className="link" to={`/systems/${system.symbol}`}>
                {system.symbol}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
