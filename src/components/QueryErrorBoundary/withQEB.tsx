import { ComponentType, FC } from 'react'
import { QueryErrorBoundary } from './QueryErrorBoundary'
import { QueryErrorBoundaryProps } from './types'

const getDisplayName = <T,>(Component: ComponentType<T>) => {
  return Component.displayName || Component.name || 'Component'
}

export const withQEB =
  ({ error, loading, onError }: QueryErrorBoundaryProps = {}) =>
  <T,>(Component: ComponentType<T>) => {
    const WithQueryErrorBoundary: FC<T & JSX.IntrinsicAttributes> = (props) => {
      return (
        <QueryErrorBoundary error={error} loading={loading} onError={onError}>
          <Component {...props} />
        </QueryErrorBoundary>
      )
    }

    WithQueryErrorBoundary.displayName = `WithQueryErrorBoundary(${getDisplayName(Component)})`

    return WithQueryErrorBoundary
  }
