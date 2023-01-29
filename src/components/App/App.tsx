import { QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { GiNorthStarShuriken } from 'react-icons/gi'
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigation,
} from 'react-router-dom'
import { AuthenticationRequired } from '@/components/AuthenticationRequired'
import { NotFound } from '@/components/NotFound'
import { ROUTES } from '@/config/routes'
import * as DashboardRoute from '@/routes/Dashboard'
import * as LeaderboardRoute from '@/routes/Leaderboard'
import { lazy } from '@/utilities/lazy'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: 1000 * 60 * 1,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    },
  },
})

const Loading = () => (
  <div className="flex h-screen w-screen animate-pulse items-center justify-center text-zinc-200 dark:text-zinc-700">
    <GiNorthStarShuriken size={96} />
  </div>
)

const { HomePage } = lazy(() => import('@/routes/Home'), 'HomePage')
const { AuthPage } = lazy(() => import('@/routes/Auth'), 'AuthPage')
const { Login } = lazy(() => import('@/components/Auth'), 'Login')
const { Register } = lazy(() => import('@/components/Auth'), 'Register')

const Core = () => {
  const navigation = useNavigation()
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex w-full max-w-xs flex-col gap-4 p-3">
            <div className="animate-pulse text-center font-mono text-5xl font-bold text-rose-500">ERROR</div>
            <button className="btn btn-primary" onClick={() => resetErrorBoundary()}>
              Try again
            </button>
          </div>
        </div>
      )}
    >
      <Suspense fallback={<Loading />}>
        {navigation.state !== 'idle' && <span className="loader" />}

        <div className="flex min-h-screen flex-col">
          <Outlet />
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Core />}>
      <Route index element={<HomePage />} />

      <Route element={<AuthenticationRequired />}>
        <Route element={<DashboardRoute.Layout />}>
          <Route path={ROUTES.OVERVIEW} element={<DashboardRoute.Overview />} />
          <Route path={ROUTES.SYSTEMS} element={<DashboardRoute.Systems />} />
          <Route path={ROUTES.SHIPS} element={<DashboardRoute.Ships />} />
          <Route path={ROUTES.LOANS} element={<DashboardRoute.Loans />} />
          <Route path={ROUTES.MARKETPLACE} element={<DashboardRoute.Marketplace />} />

          <Route element={<LeaderboardRoute.Layout />}>
            <Route
              path={ROUTES.LEADERBOARD}
              element={<LeaderboardRoute.Screen />}
              loader={LeaderboardRoute.loader(client)}
            />
          </Route>
        </Route>
      </Route>

      <Route element={<AuthPage />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

export const App = () => {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
