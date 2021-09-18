import { useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from 'config/routes'
import { selectIsAuthenticated } from 'store/auth'
import { useAppSelector } from 'store/hooks'

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN)
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) return <></>

  return <>{children}</>
}
