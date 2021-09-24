import { useEffect, Suspense } from 'react'
import { GiNorthStarShuriken } from 'react-icons/gi'
import { useNavigate, Outlet } from 'react-router-dom'
import tw, { theme } from 'twin.macro'
import { ROUTES } from 'config/routes'
import { AuthLayout } from 'layouts/Auth'
import { selectIsAuthenticated } from 'store/auth'
import { useAppSelector } from 'store/hooks'

export const AuthPage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <AuthLayout>
      <div css={tw`rounded-lg border border-gray-700 shadow-xl px-8 py-8`}>
        <Suspense
          fallback={
            <div css={tw`animate-pulse flex justify-center items-center`}>
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
