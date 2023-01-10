import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, lazy, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { GiNorthStarShuriken } from 'react-icons/gi'
import { Provider } from 'react-redux'
import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
  createRoutesFromElements,
  matchRoutes,
  useNavigationType,
} from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { ROUTES } from '@/config/routes'
import { useLocation } from '@/hooks/useLocation'
import { HomePage } from '@/routes/Home'
import { store } from '@/store'

Sentry.init({
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
  ],
  tracesSampleRate: 1.0,
})

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter)
const client = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })

const Loading = () => (
  <div className="flex h-screen w-screen animate-pulse items-center justify-center text-zinc-200 dark:text-zinc-700">
    <GiNorthStarShuriken size={96} />
  </div>
)

const DashboardPage = lazy(() => import('@/routes/Dashboard').then((mod) => ({ default: mod.DashboardPage })))
const AuthPage = lazy(() => import('@/routes/Auth').then((mod) => ({ default: mod.AuthPage })))
const Login = lazy(() => import('@/components/Auth').then((mod) => ({ default: mod.Login })))
const Register = lazy(() => import('@/components/Auth').then((mod) => ({ default: mod.Register })))
const OverviewPage = lazy(() => import('@/routes/Overview').then((mod) => ({ default: mod.OverviewPage })))
const SystemPage = lazy(() => import('@/routes/Systems').then((mod) => ({ default: mod.SystemPage })))
const LoanPage = lazy(() => import('@/routes/Loans').then((mod) => ({ default: mod.LoanPage })))
const ShipPage = lazy(() => import('@/routes/Ships').then((mod) => ({ default: mod.ShipPage })))
const MarketplacePage = lazy(() => import('@/routes/Marketplace').then((mod) => ({ default: mod.MarketplacePage })))
const LeaderboardPage = lazy(() => import('@/routes/Leaderboard').then((mod) => ({ default: mod.LeaderboardPage })))

const Base = () => (
  <QueryClientProvider client={client}>
    <HelmetProvider>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Provider>
    </HelmetProvider>
  </QueryClientProvider>
)

const router = sentryCreateBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />}>
      <Route index element={<HomePage />} />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={ROUTES.OVERVIEW} replace />} />
        <Route path={ROUTES.OVERVIEW} element={<OverviewPage />} />
        <Route path={ROUTES.SYSTEMS} element={<SystemPage />} />
        <Route path={ROUTES.SHIPS} element={<ShipPage />} />
        <Route path={ROUTES.LOANS} element={<LoanPage />} />
        <Route path={ROUTES.MARKETPLACE} element={<MarketplacePage />} />
        <Route path={ROUTES.LEADERBOARD} element={<LeaderboardPage />} />
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Route>
      <Route path={ROUTES.AUTH} element={<AuthPage />}>
        <Route index element={<Navigate to={ROUTES.LOGIN} replace />} />

        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path="*" element={<Navigate to={ROUTES.AUTH} replace />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Route>,
  ),
)

export const App = Sentry.withProfiler(() => {
  return <RouterProvider router={router} />
})
