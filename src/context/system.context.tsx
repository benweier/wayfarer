import { createContext, use } from 'react'
import type { SystemResponse } from '@/types/spacetraders'

export const SystemContext = createContext<SystemResponse | null>(null)

export const useSystemResponse = () => {
  const system = use(SystemContext)

  if (!system) throw new Error('SystemContext is missing a value.')

  return system
}
