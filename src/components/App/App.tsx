import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from 'components/ProtectedRoute'
import { Redirect } from 'components/Redirect'
import { ROUTES } from 'config/routes'
import { HomePage } from 'routes/Home'
import { store } from 'store'

const DashboardPage = lazy(() => import('routes/Dashboard').then((mod) => ({ default: mod.DashboardPage })))
const AuthPage = lazy(() => import('routes/Auth').then((mod) => ({ default: mod.AuthPage })))
const LoanPage = lazy(() => import('routes/Loans').then((mod) => ({ default: mod.LoanPage })))
const ShipPage = lazy(() => import('routes/Ships').then((mod) => ({ default: mod.ShipPage })))

export const App = () => {
  return (
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
              <Route path={ROUTES.SHIPS} element={<ShipPage />} />
              <Route path={ROUTES.LOANS} element={<LoanPage />} />
              <Route path="*" element={<Redirect to={ROUTES.DASHBOARD} />} />
            </Route>
            <Route path="/auth/*" element={<AuthPage />} />
            <Route path="*" element={<Redirect to={ROUTES.HOME} />} />
          </Routes>
        </Suspense>
      </Provider>
    </BrowserRouter>
  )
}
