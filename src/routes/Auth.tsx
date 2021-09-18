import { useEffect, Suspense } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import tw from 'twin.macro'
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
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
      </div>
    </AuthLayout>
  )
}
