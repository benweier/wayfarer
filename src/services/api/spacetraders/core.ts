import * as f from '@/services/fetch'
import { http } from '@/services/http'
import { getState } from '@/services/store/auth'

const createHeaders = (init?: HeadersInit) => {
  const { isAuthenticated, token } = getState()
  const headers = new Headers(init)

  if (isAuthenticated && !headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`)
  if (!headers.has('Accept')) headers.set('Accept', 'application/json')
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')

  return headers
}

const attachQueryParams = (url: URL, params?: f.QueryParams) => {
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) url.searchParams.append(key, String(value))
    })
  }

  return url
}

export const queryFnFactory = <R = unknown, T = unknown, Q extends f.QueryParams = f.QueryParams>(
  fn: (path: T) => string,
  base: string = import.meta.env.SPACETRADERS_API_URL,
) => {
  return async (path: T, params?: Q, req?: RequestInit) => {
    const url = new URL(fn(path), base)
    const headers = createHeaders(req?.headers)

    attachQueryParams(url, params)

    const response = await http<{ data: R }>(url, {
      headers,
      signal: req?.signal,
      method: req?.method ?? 'GET',
      credentials: 'same-origin',
    })

    return response?.data
  }
}

export const mutationFnFactory = <
  R = unknown,
  T = unknown,
  P extends f.RequestPayload = f.RequestPayload,
  Q extends f.QueryParams = f.QueryParams,
>(
  fn: (path: T) => string,
  base: string = import.meta.env.SPACETRADERS_API_URL,
) => {
  return async (args: T, payload?: P, params?: Q, req?: RequestInit) => {
    const url = new URL(fn(args), base)
    const headers = createHeaders(req?.headers)

    attachQueryParams(url, params)

    const response = await http<{ data: R }>(url, {
      headers,
      signal: req?.signal,
      method: req?.method ?? 'POST',
      credentials: 'same-origin',
      body: payload ? JSON.stringify(payload) : undefined,
    })

    return response?.data
  }
}
