import { useSuspenseQuery } from '@tanstack/react-query'
import { useFleetResponse } from '@/context/fleet.context'
import { WaypointNavigationActionContext } from '@/context/waypoint-navigation-action.context'
import { ShipStatus } from '@/features/ship/status'
import { getShipPresence } from '@/features/ship/utilities/get-ship-presence.helper'
import { WaypointNavigationAction } from '@/features/waypoint/navigation/waypoint-navigation.action'
import { getWaypointListQuery } from '@/services/api/spacetraders'
import { WaypointNavigationTable } from './waypoint-navigation.table'
import { type WaypointNavigationProps } from './waypoint-navigation.types'

export const WaypointNavigation = ({ ship }: WaypointNavigationProps) => {
  const ships = useFleetResponse()
  const { data } = useSuspenseQuery(getWaypointListQuery({ systemSymbol: ship.nav.systemSymbol }))
  const waypoints = data.data
  const activeWaypoint = waypoints.find((waypoint) => waypoint.symbol === ship.nav.waypointSymbol)
  const presence = getShipPresence(ships)

  return (
    <div className="space-y-4">
      <ShipStatus ship={ship} />

      <WaypointNavigationActionContext.Provider value={{ Navigate: WaypointNavigationAction }}>
        <WaypointNavigationTable
          data={waypoints.map((waypoint) => ({
            waypoint,
            ship,
            activeWaypoint,
            presence: presence.get(waypoint.symbol) ?? 0,
          }))}
        />
      </WaypointNavigationActionContext.Provider>
    </div>
  )
}
