import { createContext, use } from 'react'
import type { FieldValues, Path, UseControllerReturn } from 'react-hook-form'

export const FieldControlContext = createContext<UseControllerReturn<any, any> | null>(null)

export function useFieldControl<
  T extends FieldValues = FieldValues,
  N extends Path<T> = Path<T>,
>(): UseControllerReturn<T, N> {
  const ctx = use(FieldControlContext)

  if (!ctx) {
    throw new Error('useFieldControl must be used within a FieldControlContext Provider')
  }

  return ctx
}
