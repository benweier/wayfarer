import type { ShipResponse } from '@/types/spacetraders'
import type { ReactNode } from 'react'

export type ShipActionProps<R = unknown, T = unknown, V = void> = {
  ship: ShipResponse
  disabled?: boolean
  children: (args: { disabled: boolean; execute: (values: V) => R }) => ReactNode
} & T
