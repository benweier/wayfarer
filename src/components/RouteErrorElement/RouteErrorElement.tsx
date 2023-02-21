import { ReactNode } from 'react'
import { useRouteError } from 'react-router-dom'
import { NotFound } from '@/components/NotFound'

const errorElements: { [key: number]: ReactNode } = {
  401: <NotFound />,
  404: <NotFound />,
  422: <NotFound />,
  500: <NotFound />,
}

const isRouteErrorResponse = (error: any): error is Response => {
  return typeof error === 'object' && Object.hasOwn(error, 'status')
}

export const RouteErrorElement = () => {
  const error: any = useRouteError()

  if (isRouteErrorResponse(error)) {
    return <>{errorElements[error.status]}</> ?? <></>
  }

  return <></>
}
