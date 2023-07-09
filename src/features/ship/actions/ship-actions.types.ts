import { ComponentPropsWithRef, ReactNode } from 'react'
import { ShipResponse } from '@/types/spacetraders'

export type ShipActionProps<T = unknown> = {
  ship: ShipResponse
  disabled?: boolean
  children?: (props: ComponentPropsWithRef<'button'>) => ReactNode
} & T
