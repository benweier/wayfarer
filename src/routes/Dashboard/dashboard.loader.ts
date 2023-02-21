import { QueryClient } from '@tanstack/react-query'
import { LoaderFunction, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { STATUS_CODES, STATUS_MESSAGES } from '@/services/http'
import { getState } from '@/services/store/auth'

export const loader =
  (_client: QueryClient): LoaderFunction =>
  () => {
    const { isAuthenticated } = getState()

    if (!isAuthenticated) {
      redirect(ROUTES.LOGIN)
      throw new Response(STATUS_MESSAGES.UNAUTHORIZED, { status: STATUS_CODES.UNAUTHORIZED })
    }

    return null
  }
