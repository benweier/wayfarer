import { QueryClient } from '@tanstack/react-query'
import { LoaderFunction, defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getMarket } from '@/services/api/spacetraders'
import { getState } from '@/services/store/auth'

export const loader =
  (client: QueryClient): LoaderFunction =>
  ({ params }) => {
    const { isAuthenticated } = getState()
    const { system, waypoint } = params

    if (!isAuthenticated) {
      redirect(ROUTES.LOGIN)
      return null
    }

    if (!system || !waypoint) {
      return null
    }

    try {
      const market = client.ensureQueryData({
        queryKey: ['market', system, waypoint],
        queryFn: () => getMarket(system, waypoint),
      })

      return defer({ market })
    } catch (err) {
      return null
    }
  }
