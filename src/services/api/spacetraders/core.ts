import * as f from '@/services/fetch'
import { getState } from '@/services/store/auth'

export const get = <T>(path: string) => {
  const { isAuthenticated, token } = getState()

  const url = new URL(path, 'https://api.spacetraders.io')

  if (isAuthenticated) {
    return f.get<T>(url, { headers: { Authorization: `Bearer ${token}` } })
  }

  return f.get<T>(url)
}

export const post = <T, P extends RequestInit['body']>(path: string, payload: P) => {
  const { isAuthenticated, token } = getState()

  const url = new URL(path, 'https://api.spacetraders.io')

  if (isAuthenticated) {
    return f.post<T, P>(url, payload, { headers: { Authorization: `Bearer ${token}` } })
  }

  return f.post<T, P>(url)
}
