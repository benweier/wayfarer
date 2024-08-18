import type { ReactNode } from 'react'

export type ToastStatus = 'success' | 'error' | 'warning' | 'info' | 'neutral'

export type ToastConf = {
  title: ReactNode
  description?: ReactNode
}

export type ToastProps = {
  status: ToastStatus
  icon: ReactNode
  title: ReactNode
  description?: ReactNode
  onDismiss?: () => void
}
