import { createContext } from 'react'
import type { StoreApi } from 'zustand'
import type { DrawerStore } from './drawer.types'

export const DrawerContext = createContext<StoreApi<DrawerStore> | null>(null)
