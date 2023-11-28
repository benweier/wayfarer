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
  const presence = new Map(
    ships.reduce((result, ship) => {
      const { waypointSymbol } = ship.nav

      if (result.has(waypointSymbol)) {
        result.set(waypointSymbol, (result.get(waypointSymbol) ?? 0) + 1)
      }

      result.set(waypointSymbol, 1)

      return result
    }, new Map<string, number>()),
  )

  return (
    <WaypointListTable
      data={waypoints.map((waypoint) => ({ waypoint, presence: presence.get(waypoint.symbol) ?? 0 }))}
    />
  )
}
