import { useDrawerContext } from '@/components/drawer/use-drawer-store.hook'
import type { PropsWithChildren, ReactNode } from 'react'
import { Drawer } from 'vaul'

export const Root = ({
  trigger,
  direction = 'bottom',
  children,
}: PropsWithChildren<{
  trigger: ReactNode
  direction?: 'left' | 'right' | 'bottom'
}>) => {
  const drawer = useDrawerContext()

  return (
    <Drawer.Root
      open={drawer.isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) drawer.actions.closeDrawer()
      }}
      direction={direction}
      modal={false}
    >
      {trigger}

      <Drawer.Portal>{children}</Drawer.Portal>
    </Drawer.Root>
  )
}
