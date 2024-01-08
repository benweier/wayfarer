import { Navigate } from '@tanstack/react-router'
import { loginRoute } from '@/routes/auth/auth.route'
import { fleetRoute } from '@/routes/fleet/fleet.route'
import { useAuthStore } from '@/store/auth'

export const HomeRoute = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={loginRoute.to} />
  }

  return <Navigate to={fleetRoute.to} />
}
