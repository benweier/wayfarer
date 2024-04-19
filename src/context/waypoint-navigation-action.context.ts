import type { ShipResponse, WaypointResponse } from '@/types/spacetraders'
import { type FC, createContext } from 'react'

export const WaypointNavigationActionContext = createContext<{
  Navigate?: FC<{ ship: ShipResponse; waypoint: WaypointResponse; distance: number }>
}>({})
