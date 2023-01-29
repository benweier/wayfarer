import * as f from '@/services/fetch'
import { getState } from '@/services/store/auth'

export const get = <T>(
  path: string,
  { params, headers = new Headers() }: { params?: f.QueryParams; headers?: Headers } = {},
) => {
  const { isAuthenticated, token } = getState()

  const url = new URL(path, import.meta.env.SPACETRADERS_API_URL)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) url.searchParams.append(key, String(value))
    })
  }

  if (isAuthenticated) {
    headers.set('Authorization', `Bearer ${token}`)

    return f.get<T>(url, { headers })
  }

  return f.get<T>(url)
}

export const post = <T, P extends f.RequestPayload = unknown>(
  path: string,
  payload: P,
  { params, headers = new Headers() }: { params?: f.QueryParams; headers?: Headers } = {},
) => {
  const { isAuthenticated, token } = getState()

  const url = new URL(path, import.meta.env.SPACETRADERS_API_URL)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) url.searchParams.append(key, String(value))
    })
  }

  if (isAuthenticated) {
    headers.set('Authorization', `Bearer ${token}`)

    return f.post<T, P>(url, payload, { headers })
  }

  return f.post<T, P>(url, payload)
}
