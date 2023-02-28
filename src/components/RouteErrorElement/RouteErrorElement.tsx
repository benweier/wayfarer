import { useRouteError } from 'react-router-dom'
import { STATUS_CODES, STATUS_MESSAGES } from '@/services/http'

const messages: { [key: number]: string } = {
  [STATUS_CODES.UNAUTHORIZED]: STATUS_MESSAGES.UNAUTHORIZED,
  [STATUS_CODES.FORBIDDEN]: STATUS_MESSAGES.FORBIDDEN,
  [STATUS_CODES.NOT_FOUND]: STATUS_MESSAGES.NOT_FOUND,
  [STATUS_CODES.UNPROCESSABLE_ENTITY]: STATUS_MESSAGES.UNPROCESSABLE_ENTITY,
  [STATUS_CODES.INTERNAL_SERVER_ERROR]: STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
}

const isRouteErrorResponse = (error: any): error is Response => {
  return typeof error === 'object' && Object.hasOwn(error, 'status')
}

export const RouteErrorElement = () => {
  const error: any = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      (
        <div className="flex h-full grow flex-col items-center justify-center p-5">
          <div className="text-5xl font-black">{messages[error.status]}</div>
        </div>
      ) ?? <></>
    )
  }

  return <></>
}
