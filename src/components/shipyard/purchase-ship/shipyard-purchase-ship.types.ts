import type { ShipyardShip } from '@/types/spacetraders'
import type { ComponentPropsWithRef, ReactNode } from 'react'

export type ShipyardPurchaseShipProps = {
  ship: ShipyardShip
  waypointSymbol: string
  disabled?: boolean
  children?: (props: ComponentPropsWithRef<'button'>) => ReactNode
}
