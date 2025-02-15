import { cx } from '@/utilities/cx.helper'
import type { PropsWithChildren } from 'react'

export const Card = ({ className, children }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cx('border-border-primary bg-background-secondary relative rounded border-1 p-3', className)}>
      {children}
    </div>
  )
}
