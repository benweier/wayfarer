import { FormControlContext } from '@/components/forms/form-control.component'
import { cx } from 'class-variance-authority'
import { type HTMLAttributes, use } from 'react'

export const Hint = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const ctx = use(FormControlContext)

  return (
    <div
      {...props}
      id={ctx?.name ? `${ctx.name}-description` : undefined}
      className={cx('typography-sm text-foreground-secondary mx-1', className)}
    />
  )
}
