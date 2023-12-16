import { type FC, createContext } from 'react'
import { type ShipResponse, type WaypointResponse } from '@/types/spacetraders'

export const WaypointNavigationActionContext = createContext<{
  Navigate?: FC<{ ship: ShipResponse; waypoint: WaypointResponse; distance: number }>
}>({})
