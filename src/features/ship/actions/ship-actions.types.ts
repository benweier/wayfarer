import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ShipResponse } from '@/types/spacetraders'

export type ShipActionProps<T = unknown> = {
  ship: ShipResponse
  children?: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
} & T
