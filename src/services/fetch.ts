import { http } from './http'

export async function get<T>(path: string, args: RequestInit = { method: 'GET' }) {
  return await http<T>(path, { ...args, method: 'GET', credentials: 'same-origin' })
}

export async function post<T>(path: string, data: Record<string, any> | null = null, args: RequestInit = {}) {
  return await http<T>(path, { ...args, method: 'POST', credentials: 'same-origin', body: JSON.stringify(data) })
}

export async function patch<T>(path: string, data: Record<string, any> | null = null, args: RequestInit = {}) {
  return await http<T>(path, { ...args, method: 'PATCH', credentials: 'same-origin', body: JSON.stringify(data) })
}

export async function put<T>(path: string, data: BodyInit, args: RequestInit = {}) {
  return await http<T>(path, { ...args, method: 'POST', credentials: 'same-origin', body: data })
}

export async function remove<T>(path: string, data: Record<string, any> | null = null, args: RequestInit = {}) {
  return await http<T>(path, {
    ...args,
    method: 'DELETE',
    credentials: 'same-origin',
    body: data ? JSON.stringify(data) : undefined,
  })
}
