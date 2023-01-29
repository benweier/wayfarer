import { Suspense } from 'react'
import { HiOutlineLockClosed, HiOutlineLockOpen } from 'react-icons/hi'
import { Outlet } from 'react-router'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/useLocation'
import { useAuthStore } from '@/services/store/auth'
import { AuthTemplate } from '@/templates/Auth'

export const AuthPage = () => {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation<{ origin: string }>()

  if (isAuthenticated) {
    return (
      <Suspense
        fallback={
          <div className="flex h-full grow flex-col items-center justify-center p-5">
            <HiOutlineLockOpen size={96} />
          </div>
        }
      >
        <Navigate to={location.state?.origin ?? ROUTES.OVERVIEW} replace />
      </Suspense>
    )
  }

  return (
    <AuthTemplate>
      <div className="bg-zinc-200/40 dark:bg-zinc-700/20">
        <div className="mx-auto grid w-full max-w-lg items-center">
          <div className="p-8">
            <Suspense
              fallback={
                <div className="flex h-full grow flex-col items-center justify-center p-5">
                  <HiOutlineLockClosed size={96} />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </AuthTemplate>
  )
}
