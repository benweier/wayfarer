import { FC, PropsWithChildren, ReactNode } from 'react'
import { ErrorComponentProps } from '@/components/ErrorBoundary'

export type QuerySuspenseBoundaryProps = {
  error?: ReactNode | FC<PropsWithChildren<ErrorComponentProps>>
  onError?: (error: Error) => void
  fallback?: ReactNode
}
