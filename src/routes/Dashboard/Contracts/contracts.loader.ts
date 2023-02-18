import { QueryClient } from '@tanstack/react-query'
import { LoaderFunction, defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getContractsList } from '@/services/api/spacetraders'
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
      const contracts = client.ensureQueryData({
        queryKey: ['contracts'],
        queryFn: ({ signal }) => getContractsList(undefined, { signal }),
      })

      return defer({ contracts })
    } catch (err) {
      return null
    }
  }
