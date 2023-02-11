import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { QueryErrorBoundaryProps } from './types'

export const QueryErrorBoundary = ({
  error,
  onError,
  loading = <></>,
  children,
}: WithChildren<QueryErrorBoundaryProps>) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary component={error} onReset={reset} onError={onError}>
          <Suspense fallback={loading}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
