import * as ScrollArea from '@radix-ui/react-scroll-area'
import { cx } from 'class-variance-authority'
import type { PropsWithChildren } from 'react'

export const Viewport = ({
  className,
  children,
}: PropsWithChildren<{
  className?: string
}>) => {
  return (
    <ScrollArea.Viewport
      className={cx(
        'relative h-full w-full max-h-[var(--scroll-area-max-height)] max-w-[var(--scroll-area-max-width)]',
        className,
      )}
    >
      {children}
    </ScrollArea.Viewport>
  )
}
