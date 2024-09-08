import { invariant } from '@epic-web/invariant'
import { use } from 'react'
import { useStore } from 'zustand'
import { CollapsibleContext } from './collapsible.context'
import type { CollapsibleStore } from './collapsible.types'

export const useCollapsibleContext = <T = CollapsibleStore>(
  selector: (state: CollapsibleStore) => T = (state) => state as T,
): T => {
  const store = use(CollapsibleContext)

  invariant(store !== null, '`useCollapsibleContext` must be used within a `CollapsibleContext` Provider')

  return useStore(store, selector)
}

export const useCollapsibleActions = () => {
  return useCollapsibleContext((state) => state.actions)
}
