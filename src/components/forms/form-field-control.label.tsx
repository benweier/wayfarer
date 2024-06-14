import { FieldControlContext } from '@/components/forms/form-field-control.component'
import { type HTMLAttributes, use } from 'react'

export const FieldLabel = (props: HTMLAttributes<HTMLLabelElement>) => {
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
