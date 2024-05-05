import * as ScrollArea from '@/components/scroll-area'
import { cx } from 'class-variance-authority'
import type { PropsWithChildren } from 'react'
import { Drawer } from 'vaul'
import type { DrawerContentProps } from './drawer.types'

export const Content = ({
  className,
  height = 'auto',
  width = 'auto',
  children,
}: PropsWithChildren<DrawerContentProps>) => {
  return (
    <Drawer.Content
      style={{
        '--drawer-max-height': typeof height === 'number' ? `${height}px` : height,
        '--drawer-max-width': typeof width === 'number' ? `${width}px` : width,
      }}
      className={cx(
        'drawer bg-background-primary/90 backdrop-blur-lg max-h-[var(--drawer-max-height)] max-w-[var(--drawer-max-width)] z-50 fixed ring-3 ring-border-primary/20',
        className,
      )}
    >
      <ScrollArea.Root height={height} width={width}>
        <ScrollArea.Viewport className="flex items-stretch justify-stretch mx-auto">{children}</ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" />
      </ScrollArea.Root>
    </Drawer.Content>
  )
}
