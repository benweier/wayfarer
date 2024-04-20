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

export const isHttpErrorResponse = (err: any, status?: StatusCode): err is Response => {
  if (!err || !(err instanceof Response)) return false

  if (status !== undefined) {
    return err.status === status
  }

  return true
}

export const StatusMessage = {
  OK: 'OK',
  Created: 'Created',
  NoContent: 'No Content',
  BadRequest: 'Bad Request',
  Unauthorized: 'Unauthorized',
  Forbidden: 'Forbidden',
  NotFound: 'Not Found',
  MethodNotAllowed: 'Method Not Allowed',
  NotAcceptable: 'Not Acceptable',
  RequestTimeout: 'Request Timeout',
  Conflict: 'Conflict',
  Teapot: "I'm a teapot",
  UnprocessableEntity: 'Unprocessable Entity',
  InternalServerError: 'Internal Server Error',
  BadGateway: 'Bad Gateway',
  ServiceUnavailable: 'Service Unavailable',
  GatewayTimeout: 'Gateway Timeout',
} as const

export type StatusMessage = Values<typeof StatusMessage>

export const StatusCode = {
  OK: 200,
  Created: 201,
  NoContent: 204,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  RequestTimeout: 408,
  Conflict: 409,
  Teapot: 418,
  UnprocessableEntity: 422,
  InternalServerError: 500,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
} as const

export type StatusCode = Values<typeof StatusCode>
