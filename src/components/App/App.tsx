import { Suspense, lazy, StrictMode } from 'react'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppStyles } from 'components/AppStyles'
import { ProtectedRoute } from 'components/ProtectedRoute'
import { Redirect } from 'components/Redirect'
import { ROUTES } from 'config/routes'
import { HomePage } from 'routes/Home'
import { store } from 'store'
import { queryClient } from 'utilities/query-client'

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
const LeaderboardPage = lazy(() => import('routes/Leaderboard').then((mod) => ({ default: mod.LeaderboardPage })))

export const App = Sentry.withProfiler(() => {
  return (
    <StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AppStyles />
          <BrowserRouter>
            <Provider store={store}>
              <Suspense fallback={<></>}>
                <Routes>
                  <Route path={ROUTES.HOME} element={<HomePage />} />
                  <Route
                    path={ROUTES.DASHBOARD}
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  >
                    <Route path={ROUTES.SYSTEMS} element={<SystemPage />} />
                    <Route path={ROUTES.SHIPS} element={<ShipPage />} />
                    <Route path={ROUTES.LOANS} element={<LoanPage />} />
                    <Route path={ROUTES.LEADERBOARD} element={<LeaderboardPage />} />
                    <Route path="*" element={<Redirect to={ROUTES.DASHBOARD} />} />
                  </Route>
                  <Route path={ROUTES.AUTH} element={<AuthPage />}>
                    <Route path="" element={<Redirect to={ROUTES.LOGIN} />} />
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.REGISTER} element={<Register />} />
                  </Route>
                  <Route path="*" element={<Redirect to={ROUTES.HOME} />} />
                </Routes>
              </Suspense>
            </Provider>
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </StrictMode>
  )
})
