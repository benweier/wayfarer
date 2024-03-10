import { NotFoundRoute } from '@tanstack/react-router'
import { type TFunction } from 'i18next'
import { NotFound } from '@/components/not-found'
import { Route as rootRoute } from './conf/__root'

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  beforeLoad: () => {
    return {
      meta: (t: TFunction) => [{ title: t('not_found.title') }],
    }
  },
  component: NotFound,
})
