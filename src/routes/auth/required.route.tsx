import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { useAuthStore } from '@/services/store/auth'

export const Required = ({ children = <Outlet /> }: WithChildren) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ redirect: { destination: window.location.pathname } }} />
  }

  return <>{children}</>
}
