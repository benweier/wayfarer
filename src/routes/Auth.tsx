import { Suspense } from 'react'
import { GiNorthStarShuriken } from 'react-icons/gi'
import { Navigate, Outlet } from 'react-router-dom'
import tw, { theme } from 'twin.macro'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/useLocation'
import { AuthLayout } from '@/layouts/Auth'
import { selectIsAuthenticated } from '@/store/auth'
import { useAppSelector } from '@/store/hooks'

export const AuthPage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const location = useLocation<{ origin: string }>()

  if (isAuthenticated) {
    return <Navigate to={location.state?.origin ?? ROUTES.DASHBOARD} replace />
  }

  return (
    <AuthLayout>
      <div css={tw`rounded-lg border border-gray-700 shadow-xl p-8`}>
        <Suspense
          fallback={
            <div css={tw`grid justify-items-center animate-pulse`}>
              <GiNorthStarShuriken size={96} color={theme`colors.gray.700`} />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </AuthLayout>
  )
}
