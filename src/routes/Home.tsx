import { Navigate } from 'react-router'
import { ROUTES } from '@/config/routes'
import { useAuthStore } from '@/services/store/auth'

export const HomePage = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={`${ROUTES.AUTH}/${ROUTES.LOGIN}`} replace />
  }

  return <Navigate to={`${ROUTES.DASHBOARD}/${ROUTES.OVERVIEW}`} replace />
}
