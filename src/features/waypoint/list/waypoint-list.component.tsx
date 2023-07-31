import { useSystemResponse } from '@/context/system.context'
import { WaypointItem } from '@/features/waypoint/item'
import { type WaypointListProps } from './waypoint-list.types'

export const WaypointList = ({ Waypoint = WaypointItem }: WaypointListProps) => {
  const system = useSystemResponse()

  return (
    <div className="grid grid-cols-1 gap-1 lg:grid-cols-3">
      {system.waypoints.map((waypoint) => (
        <Waypoint key={waypoint.symbol} systemSymbol={system.symbol} waypoint={waypoint} />
      ))}
    </div>
  )
}
