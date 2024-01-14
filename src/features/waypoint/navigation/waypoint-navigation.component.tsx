import { useSuspenseQuery } from '@tanstack/react-query'
import { useFleetResponse } from '@/context/fleet.context'
import { WaypointNavigationActionContext } from '@/context/waypoint-navigation-action.context'
import { ShipStatus } from '@/features/ship/status'
import { WaypointNavigationAction } from '@/features/waypoint/navigation/waypoint-navigation.action'
import { getWaypointListQuery } from '@/services/api/spacetraders'
import { type ShipResponse } from '@/types/spacetraders'
import { WaypointNavigationTable } from './waypoint-navigation.table'
import { type WaypointNavigationProps } from './waypoint-navigation.types'

const getShipPresence = (ships: ShipResponse[]) => {
  console.log(ships)

  return ships.reduce<Map<string, number>>((result, ship) => {
    const { waypointSymbol } = ship.nav

    if (result.has(waypointSymbol)) {
      const count = result.get(waypointSymbol) ?? 0

      result.set(waypointSymbol, count + 1)

      return result
    }

    result.set(waypointSymbol, 1)

    return result
  }, new Map())
}

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
