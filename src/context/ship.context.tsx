import { useSuspenseQuery } from '@tanstack/react-query'
import { createContext, useContext } from 'react'
import { getShipByIdQuery } from '@/services/api/spacetraders'
import { type ShipResponse } from '@/types/spacetraders'

const ShipStoreContext = createContext<ShipResponse | null>(null)

export const useShipResponse = () => {
  const ship = useContext(ShipStoreContext)

  if (!ship) throw new Error('ShipStoreContext is missing a ship value.')

  return ship
}

export const ShipStore = ({
  shipSymbol,
  children,
}: WithChildren<{
  shipSymbol: string
}>) => {
  const { data } = useSuspenseQuery({
    queryKey: getShipByIdQuery.getQueryKey({ shipSymbol }),
    queryFn: getShipByIdQuery.queryFn,
  })

  return <ShipStoreContext.Provider value={data.data}>{children}</ShipStoreContext.Provider>
}
