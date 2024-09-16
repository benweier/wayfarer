import { cx } from 'class-variance-authority'
import { type HTMLAttributes, use } from 'react'
import { FormControlContext } from './form-control.component'

export const Hint = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const ctx = use(FormControlContext)

  return (
    <div
      {...props}
      id={ctx?.name ? `${ctx.name}-description` : undefined}
      className={cx('typography-sm mx-1 text-foreground-secondary', className)}
    />
  )
}
