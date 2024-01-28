import { type ComponentPropsWithRef, type ReactNode, type RefAttributes } from 'react'
import { type ShipResponse } from '@/types/spacetraders'

export type ShipActionProps<T = unknown> = {
  ship: ShipResponse
  disabled?: boolean
  children: (props: ComponentPropsWithRef<'button'>) => ReactNode
} & T

export type ShipAction<OnClickArgs = never, R = unknown, T = unknown> = {
  ship: ShipResponse
  disabled?: boolean
  children: (
    args: RefAttributes<HTMLButtonElement> & {
      disabled: boolean
      execute: (...args: OnClickArgs[]) => R
    },
  ) => ReactNode
} & T
