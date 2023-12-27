import { useSuspenseQuery } from '@tanstack/react-query'
import { type PropsWithChildren, createContext, useContext } from 'react'
import { getShipListQuery } from '@/services/api/spacetraders'
import { type ShipResponse } from '@/types/spacetraders'

const FleetStoreContext = createContext<ShipResponse[]>([])

export const useFleetResponse = () => {
  return useContext(FleetStoreContext)
}

export const FleetStore = ({ children }: PropsWithChildren) => {
  const { data } = useSuspenseQuery(getShipListQuery())

  return <FleetStoreContext.Provider value={data.data}>{children}</FleetStoreContext.Provider>
}
