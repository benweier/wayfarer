import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'components/Auth'
import { ROUTES } from 'config/routes'
import { AuthLayout } from 'layouts/Auth'
import { selectIsAuthenticated } from 'store/auth'
import { useAppSelector } from 'store/hooks'

export const AuthPage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <AuthLayout>
      <Auth />
    </AuthLayout>
  )
}
