import { Navigate } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'
import { StatusCode, isHttpErrorResponse } from '@/services/http'

export const RouteError = ({ error }: { error?: any }) => {
  if (isHttpErrorResponse(error)) {
    if (error.status === StatusCode.Unauthorized) {
      return <Navigate to="/login" replace search={{ redirect: location.pathname }} mask={{ to: '/login' }} />
    }

    if (error.status === StatusCode.NotFound) {
      return <NotFound />
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-5">
      <div className="container-paragraph text-h1 text-center font-bold">
        An error occurred while displaying this content
      </div>
    </div>
  )
}
