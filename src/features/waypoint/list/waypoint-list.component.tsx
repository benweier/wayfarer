import { useFleetResponse } from '@/context/fleet.context'
import { useSystemResponse } from '@/context/system.context'
import { WaypointItem } from '@/features/waypoint/item'
import { type WaypointListProps } from './waypoint-list.types'

export const WaypointList = ({ Waypoint = WaypointItem }: WaypointListProps) => {
  const system = useSystemResponse()
  const ships = useFleetResponse()

  const presence = new Set(ships.map((ship) => ship.nav.waypointSymbol))

  return (
    <div className="grid grid-cols-1 gap-1 lg:grid-cols-3">
      {system.waypoints.map((waypoint) => (
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
