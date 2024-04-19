import type { WaypointResponse } from '@/types/spacetraders'

export type WaypointListTableSchema = {
  waypoint: WaypointResponse
  presence: number
}

export type WaypointListTableProps = {
  data: WaypointListTableSchema[]
}
