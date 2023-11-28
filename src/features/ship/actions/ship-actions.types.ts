import { type ComponentPropsWithRef, type ReactNode } from 'react'
import { type ShipResponse } from '@/types/spacetraders'

export type ShipActionProps<T = unknown> = {
  ship: ShipResponse
  disabled?: boolean
  children: (props: ComponentPropsWithRef<'button'>) => ReactNode
} & T
