import { createContext } from 'react'
import { StoreApi } from 'zustand/vanilla'
import { ModalStore } from './modal.types'

export const ModalContext = createContext<StoreApi<ModalStore> | null>(null)
