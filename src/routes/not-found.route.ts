import { NotFoundRoute } from '@tanstack/react-router'
import { type TFunction } from 'i18next'
import { NotFound } from '@/components/not-found'
import { rootRoute } from './root.route'

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  beforeLoad: () => {
    return {
      meta: (t: TFunction) => [{ title: t('not_found.title', { ns: 'meta' }) }],
    }
  },
  component: NotFound,
})
