import type { ReactNode } from 'react'

export type Toast = {
  title: ReactNode
  description?: ReactNode
  adornment?: ReactNode
  status: 'success' | 'error' | 'warning' | 'info' | 'neutral'
}

type ToastState = {
  toasts: Map<string, Toast>
}

type ToastActions = {
  create: (
    status: 'success' | 'error' | 'warning' | 'info' | 'neutral',
    toast: {
      title: ReactNode
      description?: ReactNode
      adornment?: ReactNode
    },
  ) => void
  remove: (id: string) => void
}

export type ToastStore = ToastState & { actions: ToastActions }

export type ToastItemProps = {
  id: string
  toast: Toast
}
