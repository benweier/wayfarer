import { useSuspenseQuery } from '@tanstack/react-query'
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

  return <WaypointNavigationTable data={waypoints.map((waypoint) => ({ waypoint, ship, activeWaypoint }))} />
}
