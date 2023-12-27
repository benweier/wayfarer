import { useSuspenseQuery } from '@tanstack/react-query'
import { type PropsWithChildren, createContext, useContext } from 'react'
import { getShipByIdQuery } from '@/services/api/spacetraders'
import { type ShipResponse } from '@/types/spacetraders'

export type ShipStoreProps = {
  shipSymbol: string
}

export const ShipContext = createContext<ShipResponse | undefined>(undefined)

export const useShipResponse = () => {
  const ship = useContext(ShipContext)

  if (!ship) throw new Error('ShipContext is missing a ship value.')

  return ship
}

export const ShipStore = ({ shipSymbol, children }: PropsWithChildren<ShipStoreProps>) => {
  const { data } = useSuspenseQuery(getShipByIdQuery({ shipSymbol }))

  return <ShipContext.Provider value={data.data}>{children}</ShipContext.Provider>
}
