import { createContext } from 'react'
import type { StoreApi } from 'zustand'
import type { CollapsibleStore } from './collapsible.types'

export const CollapsibleContext = createContext<StoreApi<CollapsibleStore> | null>(null)
