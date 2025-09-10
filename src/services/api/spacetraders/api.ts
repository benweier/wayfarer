import { up } from 'up-fetch'
import { authStore } from '@/store/auth'

export const api = up(fetch, () => {
  const { isAuthenticated, token } = authStore.getState()
  const headers = new Headers()

  if (isAuthenticated && !headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`)
  if (!headers.has('Accept')) headers.set('Accept', 'application/json')
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')

  return {
    baseUrl: import.meta.env.SPACETRADERS_API_BASE_URL,
    timeout: 10_000,
    credentials: 'omit',
    headers,
  }
})
