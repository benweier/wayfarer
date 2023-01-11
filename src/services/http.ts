export interface HttpResponse<T> extends Response {
  data?: T
}

export interface HttpError extends Response {
  data: never
}

export async function http<T>(url: URL | RequestInfo, args: RequestInit): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(url, args)

  if (!response.ok) {
    throw response
  }

  try {
    if (response.status === 204) return response
    response.data = await response.json()
  } catch (err) {
    throw response
  }

  return response
}

export function isHttpError(err: any): err is HttpError {
  if (!err) return false

  return typeof err === 'object' && (err.ok === false || err.status >= 400)
}
