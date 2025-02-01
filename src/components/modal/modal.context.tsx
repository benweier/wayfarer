import { createContext } from 'react'
import type { ModalStore } from './modal.types'
import type { StoreApi } from 'zustand/vanilla'

export const ModalContext = createContext<StoreApi<ModalStore> | null>(null)
