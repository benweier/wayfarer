import { useSuspenseQuery } from '@tanstack/react-query'
import { useFleetResponse } from '@/context/fleet.context'
import { useSystemResponse } from '@/context/system.context'
import { getShipPresence } from '@/features/ship/utilities/get-ship-presence.helper'
import { getWaypointListQuery } from '@/services/api/spacetraders'
import { WaypointListTable } from './waypoint-list.table'

export const WaypointList = () => {
  const system = useSystemResponse()
  const ships = useFleetResponse()
  const { data } = useSuspenseQuery(getWaypointListQuery({ systemSymbol: system.symbol }))
  const waypoints = data.data
  const presence = getShipPresence(ships, 'waypointSymbol')

  return (
    <WaypointListTable
      data={waypoints.map((waypoint) => ({ waypoint, presence: presence.get(waypoint.symbol) ?? 0 }))}
    />
  )
}
