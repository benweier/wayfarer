import { Navigate } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'

export const HomeRoute = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <Navigate to="/fleet" />
}
