import { http } from './http'

export type QueryParams = Record<string, any>
export type RequestPayload = Record<string, any> | null | undefined | unknown

export const get = <T>(url: URL | RequestInfo, args: RequestInit = {}) => {
  return http<T>(url, { ...args, method: 'GET', credentials: 'same-origin' })
}

export const post = <T = unknown, P extends RequestPayload = unknown>(
  url: URL | RequestInfo,
  payload?: P,
  args: RequestInit = {},
) => {
  return http<T>(url, {
    ...args,
    method: 'POST',
    credentials: 'same-origin',
    body: payload ? JSON.stringify(payload) : undefined,
  })
}

export const patch = <T = unknown, P extends RequestPayload = unknown>(
  url: URL | RequestInfo,
  payload?: P,
  args: RequestInit = {},
) => {
  return http<T>(url, {
    ...args,
    method: 'PATCH',
    credentials: 'same-origin',
    body: payload ? JSON.stringify(payload) : undefined,
  })
}

export const put = <T>(url: URL | RequestInfo, payload: BodyInit, args: RequestInit = {}) => {
  return http<T>(url, { ...args, method: 'POST', credentials: 'same-origin', body: payload })
}

export const remove = <T = unknown, P extends RequestPayload = unknown>(
  url: URL | RequestInfo,
  payload: P,
  args: RequestInit = {},
) => {
  return http<T>(url, {
    ...args,
    method: 'DELETE',
    credentials: 'same-origin',
    body: payload ? JSON.stringify(payload) : undefined,
  })
}
