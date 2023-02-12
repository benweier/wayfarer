import { QueryClient } from '@tanstack/react-query'
import { LoaderFunction, defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getShipsList } from '@/services/api/spacetraders'
import { getState } from '@/services/store/auth'

export const loader =
  (client: QueryClient): LoaderFunction =>
  () => {
    const { isAuthenticated } = getState()

    if (!isAuthenticated) {
      redirect(ROUTES.LOGIN)
      return null
    }

    try {
      const ships = client.ensureQueryData({ queryKey: ['ships'], queryFn: getShipsList })

      return defer({ ships })
    } catch (err) {
      return null
    }
  }
