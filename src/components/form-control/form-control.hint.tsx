import { use } from 'react'
import { cx } from '@/utilities/cx.helper'
import { FormControlContext } from './form-control.component'
import type { HTMLAttributes } from 'react'

export const Hint = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const ctx = use(FormControlContext)

  return (
    <div
      {...props}
      id={ctx?.name ? `${ctx.name}-description` : undefined}
      className={cx('text-sm mx-1 text-foreground-secondary', className)}
    />
  )
}
