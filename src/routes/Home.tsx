import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from 'config/routes'
import { selectIsAuthenticated } from 'store/auth'
import { useAppSelector } from 'store/hooks'

export const HomePage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD)
    } else {
      navigate(ROUTES.LOGIN)
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) return null

  return <></>
}
