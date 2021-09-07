import { useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from 'config/routes'
import { selectIsAuthenticated } from 'store/auth'
import { useAppSelector } from 'store/hooks'

export const AuthRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    } else {
      navigate(ROUTES.LOGIN)
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) return null

  return <>{children}</>
}
