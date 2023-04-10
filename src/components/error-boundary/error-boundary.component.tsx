import { FC, cloneElement, createElement, isValidElement } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { ErrorBoundaryProps, ErrorComponentProps } from './error-boundary.types'

const DefaultErrorFallback: FC<ErrorComponentProps> = () => <></>

export const ErrorBoundary = ({
  component = <DefaultErrorFallback />,
  onReset,
  onError,
  children,
}: WithChildren<ErrorBoundaryProps>) => (
  <ReactErrorBoundary
    onReset={onReset}
    onError={onError}
    fallbackRender={({ error, resetErrorBoundary }) => {
      if (isValidElement<ErrorComponentProps>(component)) {
        return cloneElement(component, { error, onReset: resetErrorBoundary })
      }

      if (typeof component === 'function') {
        return createElement(component, { error, onReset: resetErrorBoundary })
      }

      return component
    }}
  >
    {children}
  </ReactErrorBoundary>
)
