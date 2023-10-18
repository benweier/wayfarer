import { useSuspenseQuery } from '@tanstack/react-query'
import { useFleetResponse } from '@/context/fleet.context'
import { useSystemResponse } from '@/context/system.context'
import { WaypointItem } from '@/features/waypoint/item'
import { getWaypointListQuery } from '@/services/api/spacetraders'
import { type WaypointListProps } from './waypoint-list.types'

export const WaypointList = ({ Waypoint = WaypointItem }: WaypointListProps) => {
  const system = useSystemResponse()
  const ships = useFleetResponse()
  const { data } = useSuspenseQuery({
    queryKey: getWaypointListQuery.getQueryKey({ systemSymbol: system.symbol }),
    queryFn: getWaypointListQuery.queryFn,
  })
  const waypoints = data.data
  const presence = new Set(ships.map((ship) => ship.nav.waypointSymbol))

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
      {waypoints.map((waypoint) => (
        <Waypoint
          key={waypoint.symbol}
          systemSymbol={system.symbol}
          waypoint={waypoint}
          hasShipPresence={presence.has(waypoint.symbol)}
        />
      ))}
    </div>
  )
}
