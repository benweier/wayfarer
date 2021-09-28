import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from 'config/routes'
import { selectIsAuthenticated } from 'store/auth'
import { useAppSelector } from 'store/hooks'

export const ProtectedRoute: FC = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={`${ROUTES.AUTH}/${ROUTES.LOGIN}`} replace state={{ origin: window.location.pathname }} />
  }

  return <>{children}</>
}
