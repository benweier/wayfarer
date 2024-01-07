import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { authRequiredRoute } from '@/routes/auth.route'
import { meta } from '@/routes/surveys/surveys-route.meta'
import { surveyStore } from '@/store/surveys'

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
  component: lazyRouteComponent(() => import('@/routes/surveys'), 'SurveysRoute'),
})
