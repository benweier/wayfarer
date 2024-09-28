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
        open: () => {
          set({ isOpen: true })
        },
        close: () => {
          set({ isOpen: false })
        },
        toggle: () => {
          set(({ isOpen }) => ({ isOpen: !isOpen }))
        },
      },
    }))
  })

  useImperativeHandle(ref, () => {
    const { actions } = store.getState()

    return actions
  })

  return (
    <DrawerContext value={store}>
      <Root trigger={trigger} direction={direction}>
        {children}
      </Root>
    </DrawerContext>
  )
}
