import { ComponentPropsWithRef, ReactNode } from 'react'
import { ShipResponse } from '@/types/spacetraders'

export type ShipActionProps<T = unknown> = {
  ship: ShipResponse
  children?: (props: ComponentPropsWithRef<'button'>) => ReactNode
} & T
