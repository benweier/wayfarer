import type { PropsWithChildren } from 'react'
import { Drawer } from 'vaul'
import type { DrawerRootProps } from './drawer.types'
import { useDrawerContext } from './use-drawer-store.hook'

export const Root = ({ trigger, modal = true, direction = 'bottom', children }: PropsWithChildren<DrawerRootProps>) => {
  const drawer = useDrawerContext()

  return (
    <Drawer.Root
      open={drawer.isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) drawer.actions.close()
      }}
      direction={direction}
      modal={modal}
    >
      {trigger}

      <Drawer.Portal>{children}</Drawer.Portal>
    </Drawer.Root>
  )
}
