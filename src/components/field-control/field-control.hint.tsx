import { cx } from '@/utilities/cx.helper'
import { useFieldControl } from './field-control.context'
import type { HTMLAttributes } from 'react'

export const Hint = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const ctx = useFieldControl()

  return (
    <div
      {...props}
      id={ctx?.field.name ? `${ctx.field.name}-description` : undefined}
      className={cx('text-sm mx-1 text-foreground-secondary', className)}
    />
  )
}
