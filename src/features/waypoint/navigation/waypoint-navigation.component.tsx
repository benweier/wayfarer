import { useFleetResponse } from '@/context/fleet.context'
import { WaypointNavigationActionContext } from '@/context/waypoint-navigation-action.context'
import { ShipStatus } from '@/features/ship/status'
import { getShipPresence } from '@/features/ship/utilities/get-ship-presence.helper'
import { WaypointNavigationAction } from '@/features/waypoint/navigation/waypoint-navigation.action'
import { getWaypointListQuery } from '@/services/api/spacetraders'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useDeferredValue, useState } from 'react'
import { WaypointNavigationTable } from './waypoint-navigation.table'
import type { WaypointNavigationProps } from './waypoint-navigation.types'

const WAYPOINT_NAVIGATION_CONTEXT = {
  Navigate: WaypointNavigationAction,
}

export const WaypointNavigation = ({ ship }: WaypointNavigationProps) => {
  const ships = useFleetResponse()
  const { data } = useSuspenseQuery(getWaypointListQuery({ systemSymbol: ship.nav.systemSymbol }))
  const [search, setSearch] = useState('')
  const activeWaypoint = data.data.find((waypoint) => waypoint.symbol === ship.nav.waypointSymbol)
  const presence = getShipPresence(ships, 'waypointSymbol')
  const rows = useDeferredValue(
    data.data
      .filter((waypoint) => (search.length > 0 ? waypoint.symbol.toLowerCase().includes(search.toLowerCase()) : true))
      .map((waypoint) => ({
        waypoint,
        ship,
        activeWaypoint,
        presence: presence.get(waypoint.symbol) ?? 0,
      })),
  )

  return (
    <div className="space-y-4">
      <ShipStatus ship={ship} />

      <input
        className="input w-full md:w-1/2 xl:w-1/3"
        type="text"
        placeholder="Search By Symbol"
        onChange={(event) => setSearch(event.target.value)}
      />

      <WaypointNavigationActionContext.Provider value={WAYPOINT_NAVIGATION_CONTEXT}>
        <WaypointNavigationTable data={rows} />
      </WaypointNavigationActionContext.Provider>
    </div>
  )
}
