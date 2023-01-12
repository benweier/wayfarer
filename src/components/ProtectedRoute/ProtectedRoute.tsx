import { Navigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { useAuthStore } from '@/services/store/auth'

export const ProtectedRoute = ({ children }: WithChildren) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={`${ROUTES.AUTH}/${ROUTES.LOGIN}`} replace state={{ origin: window.location.pathname }} />
  }

  return <>{children}</>
}
