import { getState } from '@/store/auth'
import type * as f from '@/services/fetch'

export type Meta = {
  total: number
  page: number
  limit: number
}

export type SpaceTradersResponse<R = unknown, M = never> = { data: R; meta: M }
export type SpaceTradersError<R = unknown> = {
  error?: {
    message: string
    code: number
    data: R
  }
}

export const createHeaders = (init?: HeadersInit) => {
  const { isAuthenticated, token } = getState()
  const headers = new Headers(init)

  if (isAuthenticated && !headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`)
  if (!headers.has('Accept')) headers.set('Accept', 'application/json')
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')

  return headers
}

export const attachQueryParams = (url: URL, params?: f.QueryParams) => {
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) url.searchParams.append(key, String(value))
    }
  }

  return url
}
