import { Drawer } from 'vaul'
import { useDrawerContext } from './use-drawer-store.hook'
import type { DrawerRootProps } from './drawer.types'
import type { PropsWithChildren } from 'react'

export const Root = ({
  trigger,
  shouldScaleBackground,
  modal = true,
  direction = 'bottom',
  children,
}: PropsWithChildren<DrawerRootProps>) => {
  const drawer = useDrawerContext()

  return (
    <Drawer.Root
      open={drawer.isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) drawer.actions.close()
      }}
      direction={direction}
      modal={modal}
      shouldScaleBackground={shouldScaleBackground}
      setBackgroundColorOnScale={false}
    >
      {trigger}

      <Drawer.Portal>{children}</Drawer.Portal>
    </Drawer.Root>
  )
}
