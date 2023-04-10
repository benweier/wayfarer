import { createContext } from 'react'
import { StoreApi } from 'zustand/vanilla'
import { ModalStore } from './modal.store'

export const ModalContext = createContext<StoreApi<ModalStore> | null>(null)
