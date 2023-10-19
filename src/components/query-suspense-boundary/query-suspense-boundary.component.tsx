import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { type PropsWithChildren, Suspense } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { type QuerySuspenseBoundaryProps } from './query-suspense-boundary.types'

export const QuerySuspenseBoundary = ({
  error,
  onError,
  fallback = <></>,
  children,
}: PropsWithChildren<QuerySuspenseBoundaryProps>) => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary component={error} onReset={reset} onError={onError}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}
