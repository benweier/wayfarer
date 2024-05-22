import { attachQueryParams, createHeaders } from '@/services/api/spacetraders/core'
import { StatusCode } from '@/services/http'
import * as f from './fetch'

export function json<T>(response: Awaited<Response>): Promise<T> {
  if (response.status === StatusCode.NoContent) return Promise.resolve(null as T)
  return response.json()
}

export function blob(response: Awaited<Response>) {
  return response.blob()
}

export function text<T extends string = string>(response: Awaited<Response>): Promise<T> {
  if (response.status === StatusCode.NoContent) return Promise.resolve('' as T)
  return response.text() as Promise<T>
}

export function unwrapper(response: Promise<Response>) {
  return {
    async response() {
      return await response
    },
    async json<T>() {
      return json<T>(await response)
    },
    async text<T extends string = string>() {
      return text<T>(await response)
    },
    async blob() {
      return blob(await response)
    },
  }
}

export function createFetcher(baseURL: string, getHeaders = createHeaders, getSearchParams = attachQueryParams) {
  return {
    get<Q extends f.QueryParams = f.QueryParams>(path: URL | string, params?: Q, args: RequestInit = {}) {
      const url = new URL(path, baseURL)

      getSearchParams(url, params)

      return unwrapper(f.get(url, { ...args, headers: getHeaders(args.headers) }))
    },
    post<Q extends f.QueryParams = f.QueryParams>(
      path: URL | string,
      payload?: f.RequestPayload,
      params?: Q,
      args: RequestInit = {},
    ) {
      const url = new URL(path, baseURL)

      getSearchParams(url, params)

      return unwrapper(f.post(url, payload, { ...args, headers: getHeaders(args.headers) }))
    },
    patch<Q extends f.QueryParams = f.QueryParams>(
      path: URL | string,
      payload?: f.RequestPayload,
      params?: Q,
      args: RequestInit = {},
    ) {
      const url = new URL(path, baseURL)

      getSearchParams(url, params)

      return unwrapper(f.patch(url, payload, { ...args, headers: getHeaders(args.headers) }))
    },
    remove<Q extends f.QueryParams = f.QueryParams>(path: URL | string, params?: Q, args: RequestInit = {}) {
      const url = new URL(path, baseURL)

      getSearchParams(url, params)

      return unwrapper(f.remove(url, { ...args, headers: getHeaders(args.headers) }))
    },
  }
}
