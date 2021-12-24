import { Suspense } from 'react'
import { GiNorthStarShuriken } from 'react-icons/gi'
import { Navigate, Outlet } from 'react-router-dom'
import tw, { theme } from 'twin.macro'
import { Box } from '@/components/Box'
import { Grid } from '@/components/Grid'
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
      <Box p={8} css={tw`rounded-lg border border-gray-700 shadow-xl`}>
        <Suspense
          fallback={
            <Grid justify="center" align="center" css={tw`animate-pulse`}>
              <GiNorthStarShuriken size={96} color={theme`colors.gray.700`} />
            </Grid>
          }
        >
          <Outlet />
        </Suspense>
      </Box>
    </AuthLayout>
  )
}
