import type { ReactNode } from 'react'

export type Toast = {
  label: ReactNode
  description?: ReactNode
  status: 'success' | 'error' | 'warning' | 'info' | 'neutral'
}

type ToastState = {
  toasts: Map<string, Toast>
}

type ToastActions = {
  create: (
    status: 'success' | 'error' | 'warning' | 'info' | 'neutral',
    toast: {
      label: ReactNode
      description?: ReactNode
    },
  ) => void
  remove: (id: string) => void
}

export type ToastStore = ToastState & { actions: ToastActions }

export type ToastElementProps = {
  id: string
  toast: Toast
}
