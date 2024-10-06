import type { PropsWithChildren } from 'react'
import { Drawer } from 'vaul'
import { useDrawerActions } from './use-drawer-store.hook'

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
