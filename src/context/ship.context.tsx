import { useSuspenseQuery } from '@tanstack/react-query'
import { type PropsWithChildren, createContext, useContext } from 'react'
import { getShipByIdQuery } from '@/services/api/spacetraders'
import { type ShipResponse } from '@/types/spacetraders'

export type ShipStoreProps = {
  shipSymbol: string
}

const ShipStoreContext = createContext<ShipResponse | null>(null)

export const useShipResponse = () => {
  const ship = useContext(ShipStoreContext)

  if (!ship) throw new Error('ShipStoreContext is missing a ship value.')

  return ship
}

export const ShipStore = ({ shipSymbol, children }: PropsWithChildren<ShipStoreProps>) => {
  const { data } = useSuspenseQuery({
    queryKey: getShipByIdQuery.getQueryKey({ shipSymbol }),
    queryFn: getShipByIdQuery.queryFn,
  })

  return <ShipStoreContext.Provider value={data.data}>{children}</ShipStoreContext.Provider>
}
