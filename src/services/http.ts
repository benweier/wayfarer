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

export const isHttpError = (err: any, status?: number): err is HttpError => {
  if (!err) return false

  if (typeof err === 'object' && err.ok === false) {
    if (status && err.status === status) return true
    return err.status >= 400
  }

  return false
}
