import { FileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = new FileRoute('/_dashboard').createRoute({
  component: lazyRouteComponent(() => import('@/routes/dashboard'), 'Layout'),
})
