import { type ComponentType, type PropsWithChildren, memo } from 'react'
import { QuerySuspenseBoundary } from './query-suspense-boundary.component'
import { type QuerySuspenseBoundaryProps } from './query-suspense-boundary.types'

export const withQSB =
  ({ error, fallback, onError }: QuerySuspenseBoundaryProps = {}) =>
  <T,>(Component: ComponentType<T>) => {
    const WithQuerySuspenseBoundary = memo((props: PropsWithChildren<T & JSX.IntrinsicAttributes>) => {
      return (
        <QuerySuspenseBoundary error={error} fallback={fallback} onError={onError}>
          <Component {...props} />
        </QuerySuspenseBoundary>
      )
    })
    const displayName = Component.displayName ?? (Component.name || 'Component')

    WithQuerySuspenseBoundary.displayName = `WithQuerySuspenseBoundary(${displayName})`

    return WithQuerySuspenseBoundary
  }
