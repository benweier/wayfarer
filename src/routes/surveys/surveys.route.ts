import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { authRequiredRoute } from '@/routes/auth/auth.route'
import { surveyStore } from '@/store/surveys'
import { meta } from './surveys-route.meta'

export const surveysRoute = new Route({
  path: 'surveys',
  getParentRoute: () => authRequiredRoute,
})
export const surveysIndexRoute = new Route({
  path: '/',
  getParentRoute: () => surveysRoute,
  beforeLoad: () => ({ meta }),
  loader: () => {
    const { surveys } = surveyStore.getState()

    return {
      surveys,
    }
  },
  component: lazyRouteComponent(() => import('./surveys-route.component'), 'SurveysRoute'),
})
