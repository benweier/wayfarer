import { cx } from '@/utilities/cx.helper'
import type { PropsWithChildren } from 'react'

export const Card = ({ className, children }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cx(
        'relative z-auto rounded border-1 p-3 border-border-primary accent-background-secondary',
        className,
      )}
    >
      {children}
    </div>
  )
}
