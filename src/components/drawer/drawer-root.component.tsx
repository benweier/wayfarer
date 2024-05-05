import { useDrawerContext } from '@/components/drawer/use-drawer-store.hook'
import type { PropsWithChildren } from 'react'
import { Drawer } from 'vaul'
import type { DrawerRootProps } from './drawer.types'

export const Root = ({ trigger, direction = 'bottom', children }: PropsWithChildren<DrawerRootProps>) => {
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
