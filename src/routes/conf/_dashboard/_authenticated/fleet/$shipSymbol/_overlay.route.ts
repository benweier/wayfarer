import { FileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = new FileRoute('/_dashboard/_authenticated/fleet/$shipSymbol/_overlay').createRoute({
  component: lazyRouteComponent(() => import('@/routes/fleet/ship/overlay'), 'ShipOverlayRoute'),
})
