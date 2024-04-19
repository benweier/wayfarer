import type { ShipResponse } from '@/types/spacetraders'
import { createContext, useContext } from 'react'

export const FleetContext = createContext<ShipResponse[]>([])

export const useFleetResponse = () => {
  return useContext(FleetContext)
}
