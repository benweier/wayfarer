import { type FC } from 'react'

export type OnErrorCaptureHandler = (error: Error, info?: { componentStack: string }) => void

export type ErrorComponentProps = {
  error?: Error
  onReset?: () => void
}

export type ErrorBoundaryProps = {
  Component?: FC<ErrorComponentProps>
  onReset?: () => void
  onError?: OnErrorCaptureHandler
}
