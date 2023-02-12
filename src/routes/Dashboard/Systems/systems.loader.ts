import { QueryClient } from '@tanstack/react-query'
import { LoaderFunction, defer, redirect } from 'react-router'
import { ROUTES } from '@/config/routes'
import { getSystemById, getSystemsList } from '@/services/api/spacetraders'
import { getState } from '@/services/store/auth'

export const list =
  (client: QueryClient): LoaderFunction =>
  () => {
    const { isAuthenticated } = getState()

    if (!isAuthenticated) {
      redirect(ROUTES.LOGIN)
      return null
    }
    try {
      const systems = client.ensureQueryData({ queryKey: ['systems'], queryFn: getSystemsList })

      return defer({ systems })
    } catch (err) {
      return null
    }
  }

export const view =
  (client: QueryClient): LoaderFunction =>
  ({ params }) => {
    const { isAuthenticated } = getState()
    const { systemID } = params

    if (!isAuthenticated) {
      redirect(ROUTES.LOGIN)
      return null
    }

    if (!systemID) {
      redirect(ROUTES.SYSTEMS)
      return null
    }

    try {
      const system = client.ensureQueryData({ queryKey: ['system', systemID], queryFn: () => getSystemById(systemID) })

      return defer({ system })
    } catch (err) {
      return null
    }
  }
