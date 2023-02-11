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

export const isHttpError = (err: any): err is HttpError => {
  if (!err) return false

  return typeof err === 'object' && (err.ok === false || err.status >= 400)
}
