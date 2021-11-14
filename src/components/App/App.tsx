import { Suspense, lazy, StrictMode } from 'react'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { HelmetProvider } from 'react-helmet-async'
import { GiNorthStarShuriken } from 'react-icons/gi'
import { QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import tw, { theme } from 'twin.macro'
import { AppStyles } from 'components/AppStyles'
import { ProtectedRoute } from 'components/ProtectedRoute'
import { ROUTES } from 'config/routes'
import { HomePage } from 'routes/Home'
import { store } from 'store'
import { queryClient } from 'utilities/query-client'

const Loading = () => (
  <div css={tw`w-screen h-screen animate-pulse flex justify-center items-center`}>
    <GiNorthStarShuriken size={96} color={theme`colors.gray.700`} />
  </div>
)

Sentry.init({
  dsn: 'https://628afa9a45cd4952adf380cb9224ce2f@o121131.ingest.sentry.io/5977586',
  integrations: [new Integrations.BrowserTracing()],
  enabled: process.env.NODE_ENV === 'production',
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.2,
})

const DashboardPage = lazy(() => import('routes/Dashboard').then((mod) => ({ default: mod.DashboardPage })))
const AuthPage = lazy(() => import('routes/Auth').then((mod) => ({ default: mod.AuthPage })))
const Login = lazy(() => import('components/Auth').then((mod) => ({ default: mod.Login })))
const Register = lazy(() => import('components/Auth').then((mod) => ({ default: mod.Register })))
const SystemPage = lazy(() => import('routes/Systems').then((mod) => ({ default: mod.SystemPage })))
const LoanPage = lazy(() => import('routes/Loans').then((mod) => ({ default: mod.LoanPage })))
const ShipPage = lazy(() => import('routes/Ships').then((mod) => ({ default: mod.ShipPage })))
const MarketplacePage = lazy(() => import('routes/Marketplace').then((mod) => ({ default: mod.MarketplacePage })))
const LeaderboardPage = lazy(() => import('routes/Leaderboard').then((mod) => ({ default: mod.LeaderboardPage })))

export const App = Sentry.withProfiler(() => {
  return (
    <StrictMode>
      <HelmetProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <AppStyles />
            <BrowserRouter>
              <Suspense fallback={<Loading />}>
                <Routes>
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
                    <Route path={ROUTES.OVERVIEW} element={<>overview</>} />
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
                </Routes>
              </Suspense>
            </BrowserRouter>
          </QueryClientProvider>
        </Provider>
      </HelmetProvider>
    </StrictMode>
  )
})
