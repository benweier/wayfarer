import { ReactNode } from 'react'
import { useRouteError } from 'react-router-dom'
import { NotFound } from '@/components/NotFound'

const errorElements: { [key: number]: ReactNode } = {
  401: <NotFound />,
  404: <NotFound />,
  422: <NotFound />,
  500: <NotFound />,
}

export const RouteErrorElement = () => {
  const error: any = useRouteError()

  if (error) {
    return <>{errorElements[error.status]}</> ?? <></>
  }

  return <></>
}
