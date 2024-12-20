import { cx } from '@/utilities/cx.helper'
import { type HTMLAttributes, use } from 'react'
import { FieldControlContext } from './field-control.component'

export const Hint = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const ctx = use(FieldControlContext)

  return (
    <div
      {...props}
      id={ctx?.field.name ? `${ctx.field.name}-description` : undefined}
      className={cx('typography-sm mx-1 text-foreground-secondary', className)}
    />
  )
}
