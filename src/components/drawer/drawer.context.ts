import { createContext } from 'react'
import type { DrawerStore } from './drawer.types'
import type { StoreApi } from 'zustand'

export const DrawerContext = createContext<StoreApi<DrawerStore> | null>(null)
