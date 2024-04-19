import { createContext } from 'react'
import type { StoreApi } from 'zustand/vanilla'
import type { ModalStore } from './modal.types'

export const ModalContext = createContext<StoreApi<ModalStore> | null>(null)
