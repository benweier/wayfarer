import { useSuspenseQuery } from '@tanstack/react-query'
import { useDeferredValue, useState } from 'react'
import { useFleetResponse } from '@/context/fleet.context'
import { useSystemResponse } from '@/context/system.context'
import { getShipPresence } from '@/features/ship/utilities/get-ship-presence.helper'
import { getWaypointListQuery } from '@/services/api/spacetraders/waypoints'
import { WaypointListTable } from './waypoint-list.table'

export const WaypointList = () => {
  const system = useSystemResponse()
  const ships = useFleetResponse()
  const { data } = useSuspenseQuery(getWaypointListQuery({ systemSymbol: system.symbol }))
  const presence = getShipPresence(ships, 'waypointSymbol')
  const [search, setSearch] = useState('')
  const rows = useDeferredValue(
    data.data
      .filter((waypoint) => (search.length > 0 ? waypoint.symbol.toLowerCase().includes(search.toLowerCase()) : true))
      .map((waypoint) => ({ waypoint, presence: presence.get(waypoint.symbol) ?? 0 })),
  )

  return (
    <div className="space-y-4">
      <input
        className="input w-full md:w-1/2 xl:w-1/3"
        type="text"
        placeholder="Search By Symbol"
        onChange={(event) => setSearch(event.target.value)}
      />
      <WaypointListTable data={rows} />
    </div>
  )
}
