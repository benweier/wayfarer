import type { ErrorInfo, ReactNode } from 'react'

export type OnErrorCaptureHandler = (error: Error, info: ErrorInfo) => void

export type ErrorComponentProps = {
  error?: Error
  onReset?: () => void
}

export type ErrorBoundaryProps = {
  component?: ReactNode
  onReset?: () => void
  onError?: OnErrorCaptureHandler
}
