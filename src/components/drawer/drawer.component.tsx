import { Root } from './drawer-root.component'
import { DrawerContext } from './drawer.context'
import { useCreateDrawerStore } from './use-drawer-store.hook'
import type { DrawerProps } from './drawer.types'

export const Drawer = ({ ref, trigger, defaultOpen = false, children, ...props }: DrawerProps) => {
  const store = useCreateDrawerStore(ref, { defaultOpen })

  return (
    <DrawerContext value={store}>
      <Root trigger={trigger} {...props}>
        {children}
      </Root>
    </DrawerContext>
  )
}
