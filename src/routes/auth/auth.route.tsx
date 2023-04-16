import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { Layout } from '@/features/auth'
import { useLocation } from '@/hooks/use-location.hook'
import { useAuthStore } from '@/services/store/auth'

type Redirect = { destination: string }

export const Route = () => {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation<{ redirect: Redirect }>()

  if (isAuthenticated) {
    const to = location.state?.redirect?.destination ?? ROUTES.OVERVIEW

    return <Navigate to={to} replace />
  }

  return (
    <Layout>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </Layout>
  )
}
