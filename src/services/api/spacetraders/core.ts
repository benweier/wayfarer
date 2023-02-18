import * as f from '@/services/fetch'
import { http } from '@/services/http'
import { getState } from '@/services/store/auth'

type RequestPath<T> = T extends void | unknown ? Partial<{ path: T }> : Required<{ path: T }>
type RequestParams<T> = T extends void | unknown ? Partial<{ params: T }> : Required<{ params: T }>
type RequestPayload<T> = T extends void | unknown ? Partial<{ payload: T }> : Required<{ payload: T }>

type RequestArguments<T, Q extends f.QueryParams, P extends f.RequestPayload = void> = RequestPath<T> &
  RequestParams<Q> &
  RequestPayload<P>

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
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) url.searchParams.append(key, String(value))
    }
  }

  return url
}

export const queryFnFactory = <R = unknown, T = unknown, Q extends f.QueryParams = f.QueryParams>(
  fn: (path: T) => string | URL,
  base: string = import.meta.env.SPACETRADERS_API_URL,
) => {
  return async (args?: RequestArguments<T, Q>, req?: RequestInit) => {
    const path = fn(args?.path as T)
    const url = path instanceof URL ? path : new URL(path, base)
    const headers = createHeaders(req?.headers)

    attachQueryParams(url, args?.params)

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
  P extends f.RequestPayload = void,
  Q extends f.QueryParams = f.QueryParams,
>(
  fn: (path: T) => string | URL,
  base: string | URL = import.meta.env.SPACETRADERS_API_URL,
) => {
  return async (args?: RequestArguments<T, Q, P>, req?: RequestInit) => {
    const path = fn(args?.path as T)
    const url = path instanceof URL ? path : new URL(path, base)
    const headers = createHeaders(req?.headers)

    attachQueryParams(url, args?.params)

    const response = await http<{ data: R }>(url, {
      headers,
      signal: req?.signal,
      method: req?.method ?? 'POST',
      credentials: 'same-origin',
      body: args?.payload ? JSON.stringify(args.payload) : undefined,
    })

    return response?.data
  }
}
