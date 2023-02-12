import { QueryClient } from '@tanstack/react-query'
import { LoaderFunction, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getState } from '@/services/store/auth'

export const loader =
  (_client: QueryClient): LoaderFunction =>
  () => {
    const { isAuthenticated } = getState()

    if (!isAuthenticated) {
      redirect(ROUTES.LOGIN)
      return null
    }

    return null
  }
