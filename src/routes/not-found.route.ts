import { NotFoundRoute } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'
import { rootRoute } from './root.route'

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFound,
})
