import { type FC, createContext } from 'react'
import { type ContractResponse } from '@/types/spacetraders'

export const ContractListContext = createContext<{
  Action?: FC<{ contract: ContractResponse }>
}>({})
