import { ComponentType, FC } from 'react'
import { QuerySuspenseBoundary } from './QuerySuspenseBoundary'
import { QuerySuspenseBoundaryProps } from './types'

const getDisplayName = <T,>(Component: ComponentType<T>) => {
  return Component.displayName || Component.name || 'Component'
}

export const withQSB =
  ({ error, fallback, onError }: QuerySuspenseBoundaryProps = {}) =>
  <T,>(Component: ComponentType<T>) => {
    const WithQuerySuspenseBoundary: FC<T & JSX.IntrinsicAttributes> = (props) => {
      return (
        <QuerySuspenseBoundary error={error} fallback={fallback} onError={onError}>
          <Component {...props} />
        </QuerySuspenseBoundary>
      )
    }

    WithQuerySuspenseBoundary.displayName = `WithQuerySuspenseBoundary(${getDisplayName(Component)})`

    return WithQuerySuspenseBoundary
  }
