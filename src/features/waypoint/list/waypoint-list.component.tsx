import { useFleetResponse } from '@/context/fleet.context'
import { useSystemResponse } from '@/context/system.context'
import { WaypointItem } from '@/features/waypoint/item'
import { type WaypointListProps } from './waypoint-list.types'

export const WaypointList = ({ Waypoint = WaypointItem }: WaypointListProps) => {
  const system = useSystemResponse()
  const ships = useFleetResponse()
  const presence = new Set(ships.map((ship) => ship.nav.waypointSymbol))

  return (
    <ul className="grid grid-cols-1 gap-1 lg:grid-cols-3">
      {system.waypoints.map((waypoint) => (
        <li key={waypoint.symbol}>
          <Waypoint systemSymbol={system.symbol} waypoint={waypoint} hasShipPresence={presence.has(waypoint.symbol)} />
        </li>
      ))}
    </ul>
  )
}
