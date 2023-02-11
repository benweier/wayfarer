import { FC, cloneElement, createElement, isValidElement } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { ErrorBoundaryProps, ErrorComponentProps } from './types'

const DefaultErrorFallback: FC<WithChildren<ErrorComponentProps>> = () => <></>

export const ErrorBoundary = ({
  component = <DefaultErrorFallback />,
  onReset,
  onError,
  children,
}: WithChildren<ErrorBoundaryProps>) => (
  <ReactErrorBoundary
    onReset={onReset}
    onError={onError}
    fallbackRender={({ error, resetErrorBoundary }) =>
      isValidElement<ErrorComponentProps>(component)
        ? cloneElement(component, { error, onReset: resetErrorBoundary })
        : createElement(component, { error, onReset: resetErrorBoundary })
    }
  >
    {children}
  </ReactErrorBoundary>
)
