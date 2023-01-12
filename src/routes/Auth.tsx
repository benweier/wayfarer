import { Suspense } from 'react'
import { GiNorthStarShuriken } from 'react-icons/gi'
import { Outlet } from 'react-router'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/useLocation'
import { AuthLayout } from '@/layouts/Auth'
import { selectIsAuthenticated } from '@/store/auth'
import { useAppSelector } from '@/store/hooks'
import { AuthTemplate } from '@/templates/Auth'

export const AuthPage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const location = useLocation<{ origin: string }>()

  if (isAuthenticated) {
    return <Navigate to={location.state?.origin ?? ROUTES.DASHBOARD} replace />
  }

  return (
    <AuthTemplate>
      <AuthLayout>
        <div className="p-8">
          <Suspense
            fallback={
              <div className="grid animate-pulse items-center justify-center text-zinc-200 dark:text-zinc-700">
                <GiNorthStarShuriken size={96} />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </AuthLayout>
    </AuthTemplate>
  )
}
