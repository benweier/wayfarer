import { type ShipResponse, type WaypointResponse } from '@/types/spacetraders'

export type WaypointNavigationProps = { ship: ShipResponse }

export type WaypointNavigationTableProps = {
  data: NavigationTableRow[]
}

export type NavigationTableRow = { waypoint: WaypointResponse; ship: ShipResponse; activeWaypoint?: WaypointResponse }
