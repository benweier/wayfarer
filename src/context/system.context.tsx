import { createContext, useContext } from 'react'

export const SystemContext = createContext<{ systemID: string } | null>(null)

export const useSystemContext = () => {
  const ctx = useContext(SystemContext)

  if (!ctx) throw new Error('SystemContext is missing a value.')

  return ctx
}
