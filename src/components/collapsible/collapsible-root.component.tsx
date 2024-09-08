import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { createStore } from 'zustand'
import { CollapsibleContext } from './collapsible.context'
import type { CollapsibleRootProps, CollapsibleStore } from './collapsible.types'
import { useCollapsibleContext } from './use-collapsible-store.hook'

export const Root = ({ defaultOpen = false, disabled, onOpenChange, trigger, children }: CollapsibleRootProps) => {
  const [store] = useState(() => {
    return createStore<CollapsibleStore>((set) => ({
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

  return (
    <CollapsibleContext value={store}>
      <CollapsibleRoot disabled={disabled} onOpenChange={onOpenChange}>
        {trigger}

        {children}
      </CollapsibleRoot>
    </CollapsibleContext>
  )
}

const CollapsibleRoot = ({ disabled, onOpenChange, children }: Collapsible.CollapsibleProps) => {
  const { isOpen } = useCollapsibleContext()

  return (
    <Collapsible.Root open={isOpen} disabled={disabled} onOpenChange={onOpenChange}>
      {children}
    </Collapsible.Root>
  )
}
