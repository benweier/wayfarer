import { type LoaderFunction, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getState } from '@/store/auth'

export const loader: LoaderFunction = () => {
  const { isAuthenticated } = getState()

  if (!isAuthenticated) {
    return redirect(ROUTES.LOGIN)
  }

  return null
}
