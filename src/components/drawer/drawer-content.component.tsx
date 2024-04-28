import * as ScrollArea from '@/components/scroll-area'
import { cx } from 'class-variance-authority'
import type { CSSProperties, PropsWithChildren } from 'react'
import { Drawer } from 'vaul'

export const Content = ({
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
    <Drawer.Content
      style={{
        '--drawer-max-height': typeof height === 'number' ? `${height}px` : height,
        '--drawer-max-width': typeof width === 'number' ? `${width}px` : width,
      }}
      className={cx(
        'drawer bg-background-primary max-h-[var(--drawer-max-height)] max-w-[var(--drawer-max-width)] z-50 fixed border-1 border-border-primary',
        className,
      )}
    >
      <ScrollArea.Root height={height} width={width}>
        <ScrollArea.Viewport className="p-6 mx-auto">{children}</ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" />
      </ScrollArea.Root>
    </Drawer.Content>
  )
}
