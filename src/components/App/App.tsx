import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthPage } from '../../routes'
import { store } from '../../store'
import { Main } from '../../templates/Main'
import { Login, Register } from '../Auth'
import { AuthRoute } from '../AuthRoute'

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Main>
          <Routes>
            <Route path="/auth" element={<AuthPage />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route
              path="/"
              element={
                <AuthRoute>
                  <AuthPage />
                </AuthRoute>
              }
            />
          </Routes>
        </Main>
      </Provider>
    </BrowserRouter>
  )
}
