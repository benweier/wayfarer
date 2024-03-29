import { Navigate } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'
import { STATUS_CODES, isHttpErrorResponse } from '@/services/http'

export const RouteError = ({ error }: { error: any }) => {
  if (isHttpErrorResponse(error)) {
    if (error.status === STATUS_CODES.UNAUTHORIZED) {
      return <Navigate to="/login" replace search={{ redirect: location.pathname }} mask={{ to: '/login' }} />
    }

    if (error.status === STATUS_CODES.NOT_FOUND) {
      return <NotFound />
    }
  }

  return (
    <div className="flex h-full grow flex-col items-center justify-center p-5">
      <div className="text-5xl font-black">An error occurred while displaying this content</div>
    </div>
  )
}
