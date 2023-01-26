import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { useAuthStore } from '@/services/store/auth'

export const AuthenticationRequired = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ origin: window.location.pathname }} />
  }

  return <Outlet />
}
