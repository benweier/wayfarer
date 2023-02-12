import { QueryClient } from '@tanstack/react-query'
import { LoaderFunction, defer, redirect } from 'react-router'
import { ROUTES } from '@/config/routes'
import { getShipById } from '@/services/api/spacetraders'
import { getState } from '@/services/store/auth'

export const loader =
  (client: QueryClient): LoaderFunction =>
  ({ params }) => {
    const { isAuthenticated } = getState()
    const { id } = params

    if (!id) {
      throw new Response('Not Found', { status: 404 })
    }

    if (!isAuthenticated) {
      redirect(ROUTES.LOGIN)
      return null
    }

    try {
      const ship = client.ensureQueryData({ queryKey: ['ship', id], queryFn: () => getShipById(id) })

      return defer({ ship })
    } catch (err) {
      return null
    }
  }
