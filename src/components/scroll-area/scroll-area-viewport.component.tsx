import * as ScrollArea from '@radix-ui/react-scroll-area'
import { cx } from '@/utilities/cx.helper'
import type { PropsWithChildren } from 'react'

export const Viewport = ({ className, children }: PropsWithChildren<WithClassName>) => {
  return (
    <ScrollArea.Viewport
      className={cx(
        'relative h-full max-h-[var(--scroll-area-max-height)] w-full max-w-[var(--scroll-area-max-width)]',
        className,
      )}
    >
      {children}
    </ScrollArea.Viewport>
  )
}
