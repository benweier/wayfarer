import { FormControlContext } from '@/components/forms/form-control.component'
import { type HTMLAttributes, use } from 'react'

export const Hint = (props: HTMLAttributes<HTMLDivElement>) => {
  const ctx = use(FormControlContext)

  return (
    <div
      id={ctx?.name ? `${ctx.name}-description` : undefined}
      className="typography-sm text-foreground-secondary mx-1"
      {...props}
    />
  )
}
