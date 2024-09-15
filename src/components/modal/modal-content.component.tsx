import * as ScrollArea from '@/components/scroll-area'
import type { PropsWithChildren, ReactNode } from 'react'

export const Content = ({
  header,
  footer,
  children,
}: PropsWithChildren<{ header?: ReactNode; footer?: ReactNode }>) => {
  return (
    <ScrollArea.Root height="var(--dialog-content-max-height)">
      <ScrollArea.Viewport className="p-6">
        {header && <div className="-top-6 sticky z-40">{header}</div>}
        {children}
        {footer && <div className="-bottom-6 sticky z-40">{footer}</div>}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" />
    </ScrollArea.Root>
  )
}
