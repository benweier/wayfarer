import { createContext } from 'react'
import type { CollapsibleStore } from './collapsible.types'
import type { StoreApi } from 'zustand'

export const CollapsibleContext = createContext<StoreApi<CollapsibleStore> | null>(null)
