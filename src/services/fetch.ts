import { http } from './http'

export type QueryParams = Record<string, any> | null | undefined
export type RequestPayload = Record<string, any> | null | undefined

const DEFAULT_CREDENTIALS = 'same-origin'
export const get = <T>(url: URL | RequestInfo, args: RequestInit = {}) => {
  return http<T>(url, { ...args, method: 'GET', credentials: DEFAULT_CREDENTIALS })
}

export const post = <T = unknown, P extends RequestPayload = any>(
  url: URL | RequestInfo,
  payload?: P,
  args: RequestInit = {},
) => {
  return http<T>(url, {
    ...args,
    method: 'POST',
    credentials: DEFAULT_CREDENTIALS,
    body: payload ? JSON.stringify(payload) : undefined,
  })
}

export const patch = <T = unknown, P extends RequestPayload = any>(
  url: URL | RequestInfo,
  payload?: P,
  args: RequestInit = {},
) => {
  return http<T>(url, {
    ...args,
    method: 'PATCH',
    credentials: DEFAULT_CREDENTIALS,
    body: payload ? JSON.stringify(payload) : undefined,
  })
}

export const put = <T>(url: URL | RequestInfo, payload: BodyInit, args: RequestInit = {}) => {
  return http<T>(url, { ...args, method: 'POST', credentials: DEFAULT_CREDENTIALS, body: payload })
}

export const remove = <T = unknown, P extends RequestPayload = any>(
  url: URL | RequestInfo,
  payload: P,
  args: RequestInit = {},
) => {
  return http<T>(url, {
    ...args,
    method: 'DELETE',
    credentials: DEFAULT_CREDENTIALS,
    body: payload ? JSON.stringify(payload) : undefined,
  })
}
