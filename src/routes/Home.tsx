import { Navigate } from 'react-router'
import { ROUTES } from '@/config/routes'
import { useAuthStore } from '@/services/store/auth'

export const HomePage = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Navigate to={ROUTES.OVERVIEW} replace />
}
