export interface HttpResponse<T> extends Response {
  data?: T
}

export interface HttpError<
  T = {
    status: string
    title: string
  },
> extends Response {
  data?: {
    errors: Array<T>
  }
}

export async function http<T>(url: string, args: RequestInit): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(url, args)

  if (!response.ok) {
    throw response
  }

  try {
    if (response.status === 204) return response
    response.data = (await response.json()) as T
  } catch (err) {
    throw response
  }

  return response
}

export function isObject(value: any): value is Record<string, any> {
  if (!value) return false

  return typeof value === 'object'
}

export function isHttpError(err: any): err is HttpError {
  if (!err) return false

  return isObject(err) && (err.ok === false || err.status >= 400)
}
