import { FormControlContext } from '@/components/forms/form-control.component'
import { type HTMLAttributes, use } from 'react'

export const Label = (props: HTMLAttributes<HTMLLabelElement>) => {
  const ctx = use(FormControlContext)

  return (
    <label className="label mx-1" id={ctx?.name ? `${ctx.name}-label` : undefined} htmlFor={ctx?.name} {...props} />
  )
}
