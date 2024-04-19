import type { ContractResponse } from '@/types/spacetraders'
import { type FC, createContext } from 'react'

export const ContractListContext = createContext<{
  Action?: FC<{ contract: ContractResponse }>
}>({})
