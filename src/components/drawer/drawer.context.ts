import { createContext } from 'react'
import type { StoreApi } from 'zustand/vanilla'
import type { DrawerStore } from './drawer.types'

export const DrawerContext = createContext<StoreApi<DrawerStore> | null>(null)
