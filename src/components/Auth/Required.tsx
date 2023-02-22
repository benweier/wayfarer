import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { useAuthStore } from '@/services/store/auth'

export const Required = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ redirect: { pathname: window.location.pathname } }} />
  }

  return <Outlet />
}
