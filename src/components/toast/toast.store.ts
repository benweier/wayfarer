import { nanoid } from 'nanoid/non-secure'
import { create } from 'zustand/react'
import { type ToastStore } from './toast.types'

export const useToastStore = create<ToastStore>()((set, get) => ({
  toasts: new Map(),
  actions: {
    create: (status, { label, description }) => {
      const id = nanoid()
      const toasts = get().toasts

      toasts.set(id, { status, label, description })

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
