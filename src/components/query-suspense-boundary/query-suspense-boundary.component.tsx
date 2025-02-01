import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import type { QuerySuspenseBoundaryProps } from './query-suspense-boundary.types'
import type { PropsWithChildren } from 'react'

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
