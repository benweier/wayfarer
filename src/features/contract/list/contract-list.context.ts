import { createContext } from 'react'
import type { ContractResponse } from '@/types/spacetraders'
import type { FC } from 'react'

export const ContractListContext = createContext<{
  Action?: FC<{ contract: ContractResponse }>
}>({})
