import { nanoid } from 'nanoid/non-secure'
import { create } from 'zustand'
import { useStore } from 'zustand/react'
import type { ToastStore } from './toast.types'

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: new Map(),
  actions: {
    create: (status, { title, description, adornment }) => {
      const id = nanoid()
      const toasts = get().toasts

      toasts.set(id, { status, title, description, adornment })

      set({ toasts: new Map(toasts) })

      setTimeout(() => {
        get().actions.remove(id)
      }, 7_000)
    },
    remove: (id) => {
      const toasts = get().toasts

      toasts.delete(id)

      set({ toasts: new Map(toasts) })
    },
  },
}))

export const useToastState = () => {
  return useStore(useToastStore, (state) => state.toasts)
}

export const useToastActions = () => {
  return useStore(useToastStore, (state) => state.actions)
}
