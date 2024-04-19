import { useAuthStore } from '@/store/auth'
import { Navigate } from '@tanstack/react-router'

export const HomeRoute = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <Navigate to="/fleet" />
}
