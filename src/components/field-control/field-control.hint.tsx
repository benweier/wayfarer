import { cx } from 'class-variance-authority'
import { type HTMLAttributes, use } from 'react'
import { FieldControlContext } from './field-control.component'

export const Hint = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const ctx = use(FieldControlContext)

  return (
    <div
      {...props}
      id={ctx?.field.name ? `${ctx.field.name}-description` : undefined}
      className={cx('typography-sm text-foreground-secondary mx-1', className)}
    />
  )
}
