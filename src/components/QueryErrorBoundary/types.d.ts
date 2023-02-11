import { FC, PropsWithChildren, ReactNode } from 'react'
import { ErrorComponentProps } from '@/components/ErrorBoundary'

export type QueryErrorBoundaryProps = {
  error?: ReactNode | FC<PropsWithChildren<ErrorComponentProps>>
  onError?: (error: Error) => void
  loading?: ReactNode
}
