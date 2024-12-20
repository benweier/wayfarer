import { useImperativeHandle, useState } from 'react'
import { createStore } from 'zustand'
import { Root } from './drawer-root.component'
import { DrawerContext } from './drawer.context'
import type { DrawerProps, DrawerStore } from './drawer.types'

export const Drawer = ({ ref, trigger, defaultOpen = false, children, ...props }: DrawerProps) => {
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
      <Root trigger={trigger} {...props}>
        {children}
      </Root>
    </DrawerContext>
  )
}
