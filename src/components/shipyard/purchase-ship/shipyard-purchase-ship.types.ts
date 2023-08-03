import { type ComponentPropsWithRef, type ReactNode } from 'react'
import { type ShipyardShip } from '@/types/spacetraders'

export type ShipyardPurchaseShipProps = {
  ship: ShipyardShip
  waypointSymbol: string
  disabled?: boolean
  children?: (props: ComponentPropsWithRef<'button'>) => ReactNode
}
