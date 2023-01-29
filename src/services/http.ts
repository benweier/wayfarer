export type HttpError = Response

export async function http<T = unknown>(url: URL | RequestInfo, args: RequestInit) {
  const response = await fetch(url, args)

  if (!response.ok) {
    throw response
  }

  try {
    if (response.status === 204) return undefined as never
    return (await response.json()) as T
  } catch (err) {
    throw response
  }
}

export function isHttpError(err: any): err is HttpError {
  if (!err) return false

  return typeof err === 'object' && (err.ok === false || err.status >= 400)
}
