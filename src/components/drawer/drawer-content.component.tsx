import { Drawer } from 'vaul'
import * as ScrollArea from '@/components/scroll-area'
import { cx } from '@/utilities/cx.helper'
import type { DrawerContentProps } from './drawer.types'
import type { PropsWithChildren } from 'react'

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
        'z-40 max-h-(--drawer-max-height) max-w-(--drawer-max-width) bg-background-primary/90 ring-3 ring-border-primary/20 backdrop-blur-lg',
        className,
      )}
    >
      <ScrollArea.Root height={height} width={width}>
        <ScrollArea.Viewport className="mx-auto flex items-stretch justify-stretch">{children}</ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" />
      </ScrollArea.Root>
    </Drawer.Content>
  )
}
