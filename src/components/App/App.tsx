import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthRoute } from 'components/AuthRoute'
import { store } from 'store'
import { Main } from 'templates/Main'

const AuthPage = lazy(() => import('routes/Auth').then((mod) => ({ default: mod.AuthPage })))

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Main>
          <Suspense fallback={<></>}>
            <Routes>
              <Route
                path="/"
                element={
                  <AuthRoute>
                    <></>
                  </AuthRoute>
                }
              />
              <Route path="/auth/*" element={<AuthPage />} />
            </Routes>
          </Suspense>
        </Main>
      </Provider>
    </BrowserRouter>
  )
}
