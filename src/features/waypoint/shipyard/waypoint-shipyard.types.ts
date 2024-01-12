import { type ShipyardShip } from '@/types/spacetraders'

export type WaypointShipyardTableSchema = {
  type: string
  ship?: ShipyardShip
}

export type WaypointShipyardTableProps = {
  data: WaypointShipyardTableSchema[]
}
