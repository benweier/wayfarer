import { Navigate, isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { STATUS_CODES, STATUS_MESSAGES } from '@/services/http'
import { redirectSchema } from '@/validators/redirect.schema'

const messages: Record<number, string> = {
  [STATUS_CODES.UNAUTHORIZED]: STATUS_MESSAGES.UNAUTHORIZED,
  [STATUS_CODES.FORBIDDEN]: STATUS_MESSAGES.FORBIDDEN,
  [STATUS_CODES.NOT_FOUND]: STATUS_MESSAGES.NOT_FOUND,
  [STATUS_CODES.UNPROCESSABLE_ENTITY]: STATUS_MESSAGES.UNPROCESSABLE_ENTITY,
  [STATUS_CODES.INTERNAL_SERVER_ERROR]: STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
}

export const RouteError = () => {
  const error = useRouteError()

  if (!isRouteErrorResponse(error)) {
    return <></>
  }

  if (error.status === STATUS_CODES.UNAUTHORIZED) {
    const result = redirectSchema.safeParse(error.data)

    return <Navigate to="/login" replace state={result.success ? result.data : null} />
  }

  return (
    <div className="flex h-full grow flex-col items-center justify-center p-5">
      <div className="text-5xl font-black">{messages[error.status]}</div>
    </div>
  )
}
