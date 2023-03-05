type Keys<T> = keyof T
type Values<T> = T[keyof T]

export type HttpError = Response

export const http = async <T = unknown>(url: URL | RequestInfo, args: RequestInit): Promise<T> => {
  const response = await fetch(url, args)

  if (!response.ok) {
    throw response
  }

  try {
    if (response.status === 204) return undefined as never
    return response.json()
  } catch (err) {
    throw response
  }
}

export const isHttpError = (err: any, status?: Values<typeof STATUS_CODES>): err is HttpError => {
  if (!err) return false

  if (typeof err === 'object' && err.ok === false) {
    if (status && err.status === status) return true
    return err.status >= 400
  }

  return false
}

export const STATUS_MESSAGES: Record<Keys<typeof STATUS_CODES>, string> = {
  OK: 'OK',
  CREATED: 'Created',
  NO_CONTENT: 'No Content',
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  METHOD_NOT_ALLOWED: 'Method Not Allowed',
  NOT_ACCEPTABLE: 'Not Acceptable',
  REQUEST_TIMEOUT: 'Request Timeout',
  CONFLICT: 'Conflict',
  TEAPOT: "I'm a teapot",
  UNPROCESSABLE_ENTITY: 'Unprocessable Entity',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  BAD_GATEWAY: 'Bad Gateway',
  SERVICE_UNAVAILABLE: 'Service Unavailable',
  GATEWAY_TIMEOUT: 'Gateway Timeout',
}

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  TEAPOT: 418,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const
