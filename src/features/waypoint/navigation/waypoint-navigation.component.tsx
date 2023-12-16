import { useSuspenseQuery } from '@tanstack/react-query'
import { WaypointNavigationActionContext } from '@/context/waypoint-navigation-action.context'
import { ShipStatus } from '@/features/ship/status'
import { WaypointNavigationAction } from '@/features/waypoint/navigation/waypoint-navigation.action'
import { getWaypointListQuery } from '@/services/api/spacetraders'
import { WaypointNavigationTable } from './waypoint-navigation.table'
import { type WaypointNavigationProps } from './waypoint-navigation.types'

export const WaypointNavigation = ({ ship }: WaypointNavigationProps) => {
  const { data } = useSuspenseQuery({
    queryKey: getWaypointListQuery.getQueryKey({ systemSymbol: ship.nav.systemSymbol }),
    queryFn: getWaypointListQuery.queryFn,
  })
  const waypoints = data.data
  const activeWaypoint = waypoints.find((waypoint) => waypoint.symbol === ship.nav.waypointSymbol)

  return (
    <div className="space-y-4">
      <ShipStatus ship={ship} />

      <WaypointNavigationActionContext.Provider value={{ Navigate: WaypointNavigationAction }}>
        <WaypointNavigationTable data={waypoints.map((waypoint) => ({ waypoint, ship, activeWaypoint }))} />
      </WaypointNavigationActionContext.Provider>
    </div>
  )
}
