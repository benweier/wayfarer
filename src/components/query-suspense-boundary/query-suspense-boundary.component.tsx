import { ErrorBoundary } from '@/components/error-boundary'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { type PropsWithChildren, Suspense } from 'react'
import type { QuerySuspenseBoundaryProps } from './query-suspense-boundary.types'

export const QuerySuspenseBoundary = ({
  error,
  onError,
  fallback = <></>,
  children,
}: PropsWithChildren<QuerySuspenseBoundaryProps>) => {
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
