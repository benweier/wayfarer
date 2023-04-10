import { FC, ReactNode } from 'react'

export type OnErrorCaptureHandler = (error: Error, info?: { componentStack: string }) => void

export type ErrorComponentProps = {
  error?: Error
  onReset?: () => void
}

export type ErrorBoundaryProps = {
  component?: ReactNode | FC<ErrorComponentProps>
  onReset?: () => void
  onError?: OnErrorCaptureHandler
}
