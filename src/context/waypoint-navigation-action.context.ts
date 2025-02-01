import { createContext } from 'react'
import type { ShipResponse, WaypointResponse } from '@/types/spacetraders'
import type { FC } from 'react'

export const WaypointNavigationActionContext = createContext<{
  Navigate?: FC<{ ship: ShipResponse; waypoint: WaypointResponse; distance: number }>
}>({})
