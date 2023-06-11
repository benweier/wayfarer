import { FC } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { ErrorBoundaryProps, ErrorComponentProps } from './error-boundary.types'

const DefaultErrorFallback: FC<ErrorComponentProps> = () => <></>

export const ErrorBoundary = ({
  Component = DefaultErrorFallback,
  onReset,
  onError,
  children,
}: WithChildren<ErrorBoundaryProps>) => (
  <ReactErrorBoundary
    onReset={onReset}
    onError={onError}
    fallbackRender={({ error, resetErrorBoundary }) => {
      return <Component error={error} onReset={resetErrorBoundary} />
    }}
  >
    {children}
  </ReactErrorBoundary>
)
