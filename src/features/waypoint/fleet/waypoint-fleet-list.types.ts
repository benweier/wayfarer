import { type FC } from 'react'
import { type ShipResponse } from '@/types/spacetraders'

export type WaypointFleetListProps = {
  Item?: FC<{ ship: ShipResponse }>
}
