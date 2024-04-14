import { cx } from 'class-variance-authority'
import { type PropsWithChildren } from 'react'

export const ItemIcon = ({ className, children }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cx('absolute inset-y-0 left-1 flex w-6 items-center justify-center', className)}>{children}</div>
  )
}
