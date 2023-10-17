import { type PropsWithChildren } from 'react'
import { cx } from '@/utilities/cx'

export const Card = ({ className, children }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cx(
        'relative z-auto rounded border bg-zinc-100/50 p-4 dark:border-zinc-700/50 dark:bg-zinc-700/20',
        className,
      )}
    >
      {children}
    </div>
  )
}
