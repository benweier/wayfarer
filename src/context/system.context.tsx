import { useSuspenseQuery } from '@tanstack/react-query'
import { type PropsWithChildren, createContext, useContext } from 'react'
import { getSystemByIdQuery } from '@/services/api/spacetraders'
import { type SystemResponse } from '@/types/spacetraders'

export type SystemStoreProps = {
  systemSymbol: string
}
export const SystemSymbolContext = createContext<{ systemSymbol: string } | null>(null)

export const useSystemSymbolContext = () => {
  const ctx = useContext(SystemSymbolContext)

  if (!ctx) throw new Error('SystemSymbolContext is missing a value.')

  return ctx
}

export const SystemStoreContext = createContext<SystemResponse | null>(null)

export const useSystemResponse = () => {
  const system = useContext(SystemStoreContext)

  if (!system) throw new Error('SystemStoreContext is missing a system value.')

  return system
}

export const SystemStore = ({ systemSymbol, children }: PropsWithChildren<SystemStoreProps>) => {
  const { data } = useSuspenseQuery(getSystemByIdQuery({ systemSymbol }))

  return <SystemStoreContext.Provider value={data.data}>{children}</SystemStoreContext.Provider>
}
