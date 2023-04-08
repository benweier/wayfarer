import { ComponentType, PropsWithChildren, memo } from 'react'
import { QuerySuspenseBoundary } from './query-suspense-boundary.component'
import { QuerySuspenseBoundaryProps } from './query-suspense-boundary.types'

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

    WithQuerySuspenseBoundary.displayName = `WithQuerySuspenseBoundary(${
      Component.displayName ?? Component.name ?? 'Component'
    })`

    return WithQuerySuspenseBoundary
  }
