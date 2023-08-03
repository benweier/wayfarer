import { type FC } from 'react'
import { type ShipyardShip } from '@/types/spacetraders'

export type WaypointShipyardListProps = {
  ShipyardItem?: FC<WaypointShipyardItemProps>
}

export type WaypointShipyardItemProps = { ship: ShipyardShip }
