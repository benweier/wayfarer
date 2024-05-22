import { http } from './http'

export type QueryParams = Record<string, any> | null | undefined
export type RequestPayload = Record<string, any> | null | undefined

const DEFAULT_CREDENTIALS = 'same-origin'

export const get = (url: URL | RequestInfo, args: RequestInit = {}) => {
  return http(url, { ...args, method: 'GET', credentials: DEFAULT_CREDENTIALS })
}

export const post = <P extends RequestPayload = any>(url: URL | RequestInfo, payload?: P, args: RequestInit = {}) => {
  return http(url, {
    ...args,
    method: 'POST',
    credentials: DEFAULT_CREDENTIALS,
    body: payload ? JSON.stringify(payload) : undefined,
  })
}

export const patch = <P extends RequestPayload = any>(url: URL | RequestInfo, payload?: P, args: RequestInit = {}) => {
  return http(url, {
    ...args,
    method: 'PATCH',
    credentials: DEFAULT_CREDENTIALS,
    body: payload ? JSON.stringify(payload) : undefined,
  })
}

export const put = (url: URL | RequestInfo, payload: BodyInit, args: RequestInit = {}) => {
  return http(url, { ...args, method: 'POST', credentials: DEFAULT_CREDENTIALS, body: payload })
}

export const remove = <P extends RequestPayload = any>(url: URL | RequestInfo, payload: P, args: RequestInit = {}) => {
  return http(url, {
    ...args,
    method: 'DELETE',
    credentials: DEFAULT_CREDENTIALS,
    body: payload ? JSON.stringify(payload) : undefined,
  })
}
