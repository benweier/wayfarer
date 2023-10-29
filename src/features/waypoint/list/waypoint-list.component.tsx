import { useSuspenseQuery } from '@tanstack/react-query'
import { useFleetResponse } from '@/context/fleet.context'
import { useSystemResponse } from '@/context/system.context'
import { getWaypointListQuery } from '@/services/api/spacetraders'
import { WaypointListTable } from './waypoint-table.component'

export const WaypointList = () => {
  const system = useSystemResponse()
  const ships = useFleetResponse()
  const { data } = useSuspenseQuery({
    queryKey: getWaypointListQuery.getQueryKey({ systemSymbol: system.symbol }),
    queryFn: getWaypointListQuery.queryFn,
  })
  const waypoints = data.data
  const presence = new Set(ships.map((ship) => ship.nav.waypointSymbol))

  return (
    <WaypointListTable data={waypoints.map((waypoint) => ({ waypoint, presence: presence.has(waypoint.symbol) }))} />
  )
}
