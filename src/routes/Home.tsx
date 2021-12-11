import { Navigate } from 'react-router'
import { ROUTES } from '@/config/routes'
import { selectIsAuthenticated } from '@/store/auth'
import { useAppSelector } from '@/store/hooks'

export const HomePage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={`${ROUTES.AUTH}/${ROUTES.LOGIN}`} replace />
  }

  return <Navigate to={ROUTES.DASHBOARD} replace />
}
