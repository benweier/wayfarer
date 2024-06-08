import { FormControlContext } from '@/components/forms/form-control.component'
import { type InputHTMLAttributes, type RefAttributes, use } from 'react'

export const Input = (props: InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>) => {
  const ctx = use(FormControlContext)

  return (
    <input
      {...ctx}
      id={ctx?.name}
      className="input"
      {...props}
      aria-labelledby={ctx?.name ? `${ctx.name}-label` : undefined}
      aria-describedby={ctx?.name ? `${ctx.name}-description` : undefined}
    />
  )
}
