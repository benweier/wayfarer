import { QueryClient } from '@tanstack/react-query'
import { LoaderFunction, defer, redirect } from 'react-router'
import { ROUTES } from '@/config/routes'
import { leaderboardQuery } from '@/services/api/spacetraders'
import { getState } from '@/services/store/auth'

export const loader =
  (client: QueryClient): LoaderFunction =>
  () => {
    const { isAuthenticated } = getState()

    if (!isAuthenticated) {
      redirect(ROUTES.LOGIN)
      return null
    }

    const leaderboard = client.ensureQueryData(['leaderboard'], leaderboardQuery)

    return defer({ leaderboard })
  }
