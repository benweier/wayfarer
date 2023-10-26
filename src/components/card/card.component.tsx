import { cx } from 'class-variance-authority'
import { type PropsWithChildren } from 'react'

export const Card = ({ className, children }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cx(
        'relative z-auto rounded border bg-zinc-100/50 p-3 dark:border-zinc-700/50 dark:bg-zinc-700/20',
        className,
      )}
    >
      {children}
    </div>
  )
}
