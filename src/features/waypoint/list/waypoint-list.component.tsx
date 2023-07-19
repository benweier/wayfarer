import { useQuery } from '@tanstack/react-query'
import { useSystemContext } from '@/context/system.context'
import { WaypointItem } from '@/features/waypoint/item'
import { getSystemById } from '@/services/api/spacetraders'
import { WaypointListProps } from './waypoint-list.types'

export const WaypointList = ({ Waypoint = WaypointItem }: WaypointListProps) => {
  const { systemSymbol } = useSystemContext()
  const { isSuccess, data } = useQuery({
    queryKey: ['system', systemSymbol],
    queryFn: ({ signal }) => getSystemById({ path: { systemSymbol } }, { signal }),
  })

  if (!isSuccess) return null

  const system = data.data

  return (
    <div className="grid grid-cols-1 gap-1 lg:grid-cols-3">
      {system.waypoints.map((waypoint) => (
        <Waypoint key={waypoint.symbol} systemSymbol={system.symbol} waypoint={waypoint} />
      ))}
    </div>
  )
}
