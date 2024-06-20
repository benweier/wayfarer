import { type HTMLAttributes, use } from 'react'
import { FormControlContext } from './form-control.component'

export const Label = (props: HTMLAttributes<HTMLLabelElement>) => {
  const ctx = use(FormControlContext)

  return (
    <label className="label mx-1" id={ctx?.name ? `${ctx.name}-label` : undefined} htmlFor={ctx?.name} {...props} />
  )
}
