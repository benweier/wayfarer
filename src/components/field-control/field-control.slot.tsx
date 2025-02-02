import { useFieldControl } from '@/components/field-control/field-control.context'
import type { ReactNode } from 'react'
import type { FieldValues, Path, UseControllerReturn } from 'react-hook-form'

export function Slot<T extends FieldValues = FieldValues, N extends Path<T> = Path<T>>({
  children,
}: {
  children?: (ctx: UseControllerReturn<T, N>) => ReactNode
}) {
  const ctx = useFieldControl<T, N>()

  if (!ctx) return null

  return children?.(ctx)
}
