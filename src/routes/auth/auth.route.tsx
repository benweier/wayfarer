import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { Layout } from '@/features/auth'
import { useLocation } from '@/hooks/use-location.hook'
import { useAuthStore } from '@/store/auth'
import { redirectSchema } from '@/validators/redirect.schema'

type Redirect = { destination: string }

export const Route = () => {
  const { isAuthenticated } = useAuthStore()
  const loc = useLocation<{ redirect: Redirect }>()

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
