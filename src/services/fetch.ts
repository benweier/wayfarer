import { http } from './http'

export type URLParams = Record<string, any>
export type RequestPayload = Record<string, any> | null | undefined | unknown

export async function get<T>(url: URL | RequestInfo, args: RequestInit = {}) {
  return await http<T>(url, { ...args, method: 'GET', credentials: 'same-origin' })
}

export async function post<T = unknown, P extends RequestPayload = unknown>(
  url: URL | RequestInfo,
  payload?: P,
  args: RequestInit = {},
) {
  return await http<T>(url, {
    ...args,
    method: 'POST',
    credentials: 'same-origin',
    body: payload ? JSON.stringify(payload) : undefined,
  })
}

export async function patch<T = unknown, P extends RequestPayload = unknown>(
  url: URL | RequestInfo,
  payload?: P,
  args: RequestInit = {},
) {
  return await http<T>(url, {
    ...args,
    method: 'PATCH',
    credentials: 'same-origin',
    body: payload ? JSON.stringify(payload) : undefined,
  })
}

export async function put<T>(url: URL | RequestInfo, payload: BodyInit, args: RequestInit = {}) {
  return await http<T>(url, { ...args, method: 'POST', credentials: 'same-origin', body: payload })
}

export async function remove<T = unknown, P extends RequestPayload = unknown>(
  url: URL | RequestInfo,
  payload: P,
  args: RequestInit = {},
) {
  return await http<T>(url, {
    ...args,
    method: 'DELETE',
    credentials: 'same-origin',
    body: payload ? JSON.stringify(payload) : undefined,
  })
}
