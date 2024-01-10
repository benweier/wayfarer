import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { authRequiredRoute } from '@/routes/auth/auth.route'
import { surveyStore } from '@/store/surveys'
import { meta } from './surveys-route.meta'

export const surveysRoute = new Route({
  path: 'surveys',
  getParentRoute: () => authRequiredRoute,
  beforeLoad: () => ({ meta }),
  loader: () => {
    const { surveys } = surveyStore.getState()

    return {
      surveys,
    }
  },
  component: lazyRouteComponent(() => import('./surveys-route.component'), 'SurveysRoute'),
})
