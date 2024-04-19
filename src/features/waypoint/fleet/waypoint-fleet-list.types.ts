import type { ShipResponse } from '@/types/spacetraders'
import type { FC } from 'react'

export type WaypointFleetListProps = {
  Item?: FC<{ ship: ShipResponse }>
}
