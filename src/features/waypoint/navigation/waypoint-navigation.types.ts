import { type ShipResponse, type WaypointResponse } from '@/types/spacetraders'

export type WaypointNavigationProps = { ship: ShipResponse }

export type WaypointNavigationTableProps = {
  data: WaypointNavigationTableRow[]
}

export type WaypointNavigationTableRow = {
  waypoint: WaypointResponse
  ship: ShipResponse
  activeWaypoint?: WaypointResponse
}

export type WaypointNavigationActionProps = {
  ship: ShipResponse
  waypoint: WaypointResponse
  distance: number
}
