import { DrawerContext } from '@/components/drawer/drawer.context'
import type { DrawerImperativeRef, DrawerProps, DrawerStore } from '@/components/drawer/drawer.types'
import { type PropsWithChildren, type RefAttributes, useImperativeHandle, useState } from 'react'
import { createStore } from 'zustand'
import { Root } from './drawer-root.component'

export const Drawer = ({
  ref,
  trigger,
  defaultOpen = false,
  direction = 'bottom',
  children,
}: PropsWithChildren<DrawerProps & RefAttributes<DrawerImperativeRef>>) => {
  const [store] = useState(() => {
    return createStore<DrawerStore>((set) => ({
      isOpen: defaultOpen,
      actions: {
        openDrawer: () => {
          set({ isOpen: true })
        },
        closeDrawer: () => {
          set({ isOpen: false })
        },
      },
    }))
  })

  useImperativeHandle(ref, () => ({
    openDrawer: () => {
      store.setState({ isOpen: true })
    },
    closeDrawer: () => {
      store.setState({ isOpen: false })
    },
  }))

  return (
    <DrawerContext value={store}>
      <Root trigger={trigger} direction={direction}>
        {children}
      </Root>
    </DrawerContext>
  )
}
