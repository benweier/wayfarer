import { Suspense } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { Layout } from '@/features/auth'
import { useAuthStore } from '@/store/auth'
import { redirectSchema } from '@/validators/redirect.schema'

export const Route = () => {
  const { isAuthenticated } = useAuthStore()
  const loc = useLocation()

  if (isAuthenticated) {
    const result = redirectSchema.safeParse(loc.state)
    const to = result.success ? result.data.redirect.destination : ROUTES.OVERVIEW

    return <Navigate to={to} replace state={null} />
  }

  return (
    <Layout>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </Layout>
  )
}
