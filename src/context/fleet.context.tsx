import type { ShipResponse } from '@/types/spacetraders'
import { createContext, use } from 'react'

export const FleetContext = createContext<ShipResponse[]>([])

export const useFleetResponse = () => {
  return use(FleetContext)
}
