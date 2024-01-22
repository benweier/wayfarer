import { createContext, useContext } from 'react'
import { type WaypointResponse } from '@/types/spacetraders'

export const WaypointContext = createContext<WaypointResponse | undefined>(undefined)

export const useWaypointResponse = () => {
  const waypoint = useContext(WaypointContext)

  if (!waypoint) throw new Error('WaypointContext is missing a value.')

  return waypoint
}
