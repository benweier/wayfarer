import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { authRequiredRoute } from '@/routes/auth.route'

export const surveysRoute = new Route({
  path: 'surveys',
  getParentRoute: () => authRequiredRoute,
})
export const surveysIndexRoute = new Route({
  path: '/',
  getParentRoute: () => surveysRoute,
  component: lazyRouteComponent(() => import('@/routes/surveys'), 'SurveysRoute'),
})
