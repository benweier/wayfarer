import * as f from '@/services/fetch'
import { http } from '@/services/http'
import { getState } from '@/store/auth'

type RequestPath<T> = T extends void | unknown ? Partial<{ path: T }> : Required<{ path: T }>
type RequestParams<Q> = Q extends void | unknown ? Partial<{ params: Q }> : Required<{ params: Q }>
type RequestPayload<P> = P extends void | unknown ? Partial<{ payload: P }> : Required<{ payload: P }>

type RequestArguments<T, Q extends f.QueryParams, P extends f.RequestPayload = void> = RequestPath<T> &
  RequestParams<Q> &
  RequestPayload<P>

export type Meta = {
  total: number
  page: number
  limit: number
}

export type SpaceTradersResponse<R = unknown, M = unknown> = { data: R; meta: M }
export type SpaceTradersError<R = unknown> = {
  error?: {
    message: string
    code: number
    data: R
  }
}

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
  base: string = import.meta.env.SPACETRADERS_API_BASE_URL,
): ((args?: RequestArguments<T, Q>, req?: RequestInit) => Promise<R>) => {
  return (args, req) => {
    const path = fn(args?.path as T)
    const url = path instanceof URL ? path : new URL(path, base)
    const headers = createHeaders(req?.headers)

    attachQueryParams(url, args?.params)

    return http(url, {
      headers,
      signal: req?.signal,
      method: req?.method ?? 'GET',
      credentials: 'same-origin',
    })
  }
}

export const mutationFnFactory = <
  R = unknown,
  T = unknown,
  P extends f.RequestPayload = void,
  Q extends f.QueryParams = f.QueryParams,
>(
  fn: (path: T) => string | URL,
  base: string | URL = import.meta.env.SPACETRADERS_API_BASE_URL,
): ((args?: RequestArguments<T, Q, P>, req?: RequestInit) => Promise<R>) => {
  return (args, req) => {
    const path = fn(args?.path as T)
    const url = path instanceof URL ? path : new URL(path, base)
    const headers = createHeaders(req?.headers)

    attachQueryParams(url, args?.params)

    return http(url, {
      headers,
      signal: req?.signal,
      method: req?.method ?? 'POST',
      credentials: 'same-origin',
      body: args?.payload ? JSON.stringify(args.payload) : undefined,
    })
  }
}
