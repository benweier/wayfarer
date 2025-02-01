import { useSuspenseQuery } from '@tanstack/react-query'
import { createContext, use } from 'react'
import { getShipByIdQuery } from '@/services/api/spacetraders/fleet'
import type { ShipResponse } from '@/types/spacetraders'
import type { PropsWithChildren } from 'react'

export type ShipStoreProps = {
  shipSymbol: string
}

export const ShipContext = createContext<ShipResponse | undefined>(undefined)

export const useShipResponse = () => {
  const ship = use(ShipContext)

  if (!ship) throw new Error('ShipContext is missing a ship value.')

  return ship
}

export const ShipStore = ({ shipSymbol, children }: PropsWithChildren<ShipStoreProps>) => {
  const { data } = useSuspenseQuery(getShipByIdQuery({ shipSymbol }))

  return <ShipContext value={data.data}>{children}</ShipContext>
}
