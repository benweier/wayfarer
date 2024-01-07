import { Navigate, Route, lazyRouteComponent, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { dashboardRoute } from '@/routes/dashboard.route'
import { rootRoute } from '@/routes/root.route'

export const authRoute = new Route({
  id: 'auth',
  getParentRoute: () => rootRoute,
  component: lazyRouteComponent(() => import('@/routes/auth'), 'Route'),
})

export const authRequiredRoute = new Route({
  id: 'authenticated',
  getParentRoute: () => dashboardRoute,
  beforeLoad: ({ location, context }) => {
    if (!context.auth.getState().isAuthenticated) {
      throw redirect({
        to: loginRoute.to,
        search: { redirect: location.href },
        mask: { to: loginRoute.to },
        replace: true,
      })
    }
  },
})

export const loginRoute = new Route({
  path: 'login',
  getParentRoute: () => authRoute,
  pendingComponent: () => null,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: ({ search }) => ({ search }),
  component: lazyRouteComponent(() => import('@/features/auth'), 'Login'),
})
export const registerRoute = new Route({
  path: 'register',
  getParentRoute: () => authRoute,
  pendingComponent: () => null,
  component: lazyRouteComponent(() => import('@/features/auth'), 'Register'),
})
export const logoutRoute = new Route({
  path: 'logout',
  getParentRoute: () => authRoute,
  beforeLoad: ({ context }) => {
    const auth = context.auth.getState()

    if (auth.isAuthenticated) {
      auth.actions.signout()
      throw redirect({ to: loginRoute.to, replace: true })
    }
  },
  component: () => <Navigate to={loginRoute.to} replace />,
})
