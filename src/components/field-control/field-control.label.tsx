import { useFieldControl } from './field-control.context'
import type { HTMLAttributes } from 'react'

export const Label = (props: HTMLAttributes<HTMLLabelElement>) => {
  const ctx = useFieldControl()

  return (
    <label
      className="label mx-1"
      id={ctx?.field.name ? `${ctx.field.name}-label` : undefined}
      htmlFor={ctx?.field.name}
      {...props}
    />
  )
}
