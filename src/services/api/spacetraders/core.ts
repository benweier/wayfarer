import * as f from '@/services/fetch'
import { getState } from '@/services/store/auth'

export const get = async <T = unknown>(
  path: string,
  { params, headers = new Headers() }: { params?: f.QueryParams; headers?: HeadersInit } = {},
) => {
  const { isAuthenticated, token } = getState()

  const url = new URL(path, import.meta.env.SPACETRADERS_API_URL)
  const _headers = new Headers(headers)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) url.searchParams.append(key, String(value))
    })
  }

  if (isAuthenticated) {
    _headers.set('Authorization', `Bearer ${token}`)
  }

  if (isAuthenticated && !_headers.has('Authorization')) _headers.set('Authorization', `Bearer ${token}`)
  if (!_headers.has('Accept')) _headers.set('Accept', 'application/json')
  if (!_headers.has('Content-Type')) _headers.set('Content-Type', 'application/json')

  const response = await f.get<{ data: T }>(url, { headers: _headers })

  return response?.data
}

export const post = async <T = unknown, P extends f.RequestPayload = unknown>(
  path: string,
  payload?: P,
  { params, headers = new Headers() }: { params?: f.QueryParams; headers?: HeadersInit } = {},
) => {
  const { isAuthenticated, token } = getState()

  const url = new URL(path, import.meta.env.SPACETRADERS_API_URL)
  const _headers = new Headers(headers)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) url.searchParams.append(key, String(value))
    })
  }

  if (isAuthenticated && !_headers.has('Authorization')) _headers.set('Authorization', `Bearer ${token}`)
  if (!_headers.has('Accept')) _headers.set('Accept', 'application/json')
  if (!_headers.has('Content-Type')) _headers.set('Content-Type', 'application/json')

  const response = await f.post<{ data: T }, P>(url, payload, { headers: _headers })

  return response?.data
}
