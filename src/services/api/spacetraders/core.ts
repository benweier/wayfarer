import * as f from '@/services/fetch'
import { getState } from '@/services/store/auth'

export const get = <T>(path: string, params?: f.URLParams) => {
  const { isAuthenticated, token } = getState()

  const url = new URL(path, 'https://api.spacetraders.io')

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) url.searchParams.append(key, String(value))
    })
  }

  if (isAuthenticated) {
    return f.get<T>(url, { headers: { Authorization: `Bearer ${token}` } })
  }

  return f.get<T>(url)
}

export const post = <T, P extends f.RequestPayload = unknown>(path: string, payload: P, params?: f.URLParams) => {
  const { isAuthenticated, token } = getState()

  const url = new URL(path, 'https://api.spacetraders.io')

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) url.searchParams.append(key, String(value))
    })
  }

  if (isAuthenticated) {
    return f.post<T, P>(url, payload, { headers: { Authorization: `Bearer ${token}` } })
  }

  return f.post<T, P>(url, payload)
}
