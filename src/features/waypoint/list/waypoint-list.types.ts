import { type FC } from 'react'
import { type WaypointItemProps } from '@/features/waypoint/item'
import { type WaypointResponse } from '@/types/spacetraders'

export type WaypointListProps = {
  Waypoint?: FC<WaypointItemProps>
}

export type WaypointListTableSchema = {
  waypoint: WaypointResponse
  presence: number
}

export type WaypointListTableProps = {
  data: WaypointListTableSchema[]
}
