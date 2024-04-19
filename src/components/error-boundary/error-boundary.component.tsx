import type { FC, PropsWithChildren } from 'react'
import { ErrorBoundaryContext, ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import type { ErrorBoundaryProps, ErrorComponentProps } from './error-boundary.types'

const DefaultErrorFallback: FC<ErrorComponentProps> = () => <></>

export const ErrorBoundary = ({
  component = <DefaultErrorFallback />,
  onReset,
  onError,
  children,
}: PropsWithChildren<ErrorBoundaryProps>) => (
  <ReactErrorBoundary
    onReset={onReset}
    onError={onError}
    fallbackRender={({ error, resetErrorBoundary }) => {
      return (
        <ErrorBoundaryContext.Provider value={{ didCatch: true, error, resetErrorBoundary }}>
          {component}
        </ErrorBoundaryContext.Provider>
      )
    }}
  >
    {children}
  </ReactErrorBoundary>
)
