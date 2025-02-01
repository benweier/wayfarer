import { createContext, use } from 'react'
import type { ShipResponse } from '@/types/spacetraders'

export const FleetContext = createContext<ShipResponse[]>([])

export const useFleetResponse = () => {
  return use(FleetContext)
}
