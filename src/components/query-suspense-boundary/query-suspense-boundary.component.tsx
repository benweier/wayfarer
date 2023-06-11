import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { QuerySuspenseBoundaryProps } from './query-suspense-boundary.types'

export const QuerySuspenseBoundary = ({
  error,
  onError,
  fallback = <></>,
  children,
}: WithChildren<QuerySuspenseBoundaryProps>) => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary Component={error} onReset={reset} onError={onError}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}
