import { type ReactNode, type RefAttributes } from 'react'
import { type ContractResponse } from '@/types/spacetraders'

export type ContractActionProps<OnClickArgs = never, R = unknown, T = unknown> = {
  contract: ContractResponse
  disabled?: boolean
  children: (
    args: RefAttributes<HTMLButtonElement> & {
      disabled: boolean
      execute: (...args: OnClickArgs[]) => R
    },
  ) => ReactNode
} & T
