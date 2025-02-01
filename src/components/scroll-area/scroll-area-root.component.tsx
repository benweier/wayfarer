import * as ScrollArea from '@radix-ui/react-scroll-area'
import { cx } from '@/utilities/cx.helper'
import type { CSSProperties, PropsWithChildren } from 'react'

export const Root = ({
  className,
  height = 'auto',
  width = 'auto',
  children,
}: PropsWithChildren<{
  className?: string
  height?: CSSProperties['height']
  width?: CSSProperties['width']
}>) => {
  return (
    <ScrollArea.Root
      className={cx('h-full w-full overflow-hidden', className)}
      type="scroll"
      style={{
        '--scroll-area-max-height': typeof height === 'number' ? `${height}px` : height,
        '--scroll-area-max-width': typeof width === 'number' ? `${width}px` : width,
      }}
    >
      {children}
    </ScrollArea.Root>
  )
}
