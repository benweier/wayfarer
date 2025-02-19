import { createFetcher } from '@/services/create-fetcher'
import { authStore } from '@/store/auth'
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
  const { isAuthenticated, token } = authStore.getState()
  const headers = new Headers(init)

  if (isAuthenticated && !headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`)
  if (!headers.has('Accept')) headers.set('Accept', 'application/json')
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')

  return headers
}

export const attachQueryParams = (url: URL, params?: f.QueryParams) => {
  if (!params) return url

  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) url.searchParams.append(key, String(params[key]))
  }

  return url
}

export const api = createFetcher(import.meta.env.SPACETRADERS_API_BASE_URL, createHeaders)
