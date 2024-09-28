import { useDrawerActions } from '@/components/drawer/use-drawer-store.hook'
import type { PropsWithChildren } from 'react'
import { Drawer } from 'vaul'

export const Trigger = ({ children }: PropsWithChildren) => {
  const actions = useDrawerActions()

  return (
    <Drawer.Trigger
      asChild
      onClick={() => {
        actions.open()
      }}
    >
      {children}
    </Drawer.Trigger>
  )
}
