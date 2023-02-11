import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { QuerySuspenseBoundaryProps } from './types'

export const QuerySuspenseBoundary = ({
  error,
  onError,
  fallback = <></>,
  children,
}: WithChildren<QuerySuspenseBoundaryProps>) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary component={error} onReset={reset} onError={onError}>
          <Suspense fallback={fallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
