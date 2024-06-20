import { type HTMLAttributes, use } from 'react'
import { FieldControlContext } from './field-control.component'

export const Label = (props: HTMLAttributes<HTMLLabelElement>) => {
  const ctx = use(FieldControlContext)

  return (
    <label
      className="label mx-1"
      id={ctx?.field.name ? `${ctx.field.name}-label` : undefined}
      htmlFor={ctx?.field.name}
      {...props}
    />
  )
}
