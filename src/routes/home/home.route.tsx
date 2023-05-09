import { Navigate } from 'react-router-dom'
import { withQSB } from '@/components/query-suspense-boundary'
import { ROUTES } from '@/config/routes'
import { useAuthStore } from '@/store/auth'

const HomeRouteComponent = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />
  }

  return <Navigate to={ROUTES.OVERVIEW} />
}

export const Route = withQSB()(HomeRouteComponent)
