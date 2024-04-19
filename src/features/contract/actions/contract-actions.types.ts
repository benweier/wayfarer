import type { ContractResponse } from '@/types/spacetraders'
import type { ReactNode, RefAttributes } from 'react'

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
