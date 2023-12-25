import { useSuspenseQuery } from '@tanstack/react-query'
import { type PropsWithChildren, createContext, useContext } from 'react'
import { getSystemByIdQuery } from '@/services/api/spacetraders'
import { type SystemResponse } from '@/types/spacetraders'

export type SystemStoreProps = {
  systemSymbol: string
}
export const SystemContext = createContext<{ systemSymbol: string } | null>(null)

export const useSystemContext = () => {
  const ctx = useContext(SystemContext)

  if (!ctx) throw new Error('SystemContext is missing a value.')

  return ctx
}

const SystemStoreContext = createContext<SystemResponse | null>(null)

export const useSystemResponse = () => {
  const system = useContext(SystemStoreContext)

  if (!system) throw new Error('SystemStoreContext is missing a system value.')

  return system
}

export const SystemStore = ({ systemSymbol, children }: PropsWithChildren<SystemStoreProps>) => {
  const { data } = useSuspenseQuery({
    queryKey: getSystemByIdQuery.getQueryKey({ systemSymbol }),
    queryFn: getSystemByIdQuery.queryFn,
  })

  return <SystemStoreContext.Provider value={data.data}>{children}</SystemStoreContext.Provider>
}
