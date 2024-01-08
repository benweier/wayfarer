import { Route, defer, lazyRouteComponent, redirect } from '@tanstack/react-router'
import { fleetRoute } from '@/routes/fleet/fleet.route'
import { ShipOverlayRoute } from '@/routes/fleet/ship/overlay'
import { getShipByIdQuery, getWaypointByIdQuery, getWaypointMarketQuery } from '@/services/api/spacetraders'
import { meta } from './ship-route.meta'

export const shipRoute = new Route({
  path: '$shipSymbol',
  getParentRoute: () => fleetRoute,
  parseParams: ({ shipSymbol }) => ({ shipSymbol: shipSymbol.toUpperCase() }),
})
export const shipIndexRoute = new Route({
  path: '/',
  getParentRoute: () => shipRoute,
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    const ship = context.client.ensureQueryData(getShipByIdQuery({ shipSymbol: params.shipSymbol }))

    return {
      ship: await ship,
    }
  },
  component: lazyRouteComponent(() => import('./ship-route.component'), 'ShipRoute'),
})

export const shipOverlayRoute = new Route({
  id: 'ship_overlay',
  getParentRoute: () => shipIndexRoute,
  component: ShipOverlayRoute,
})

export const shipMarketRoute = new Route({
  path: 'market',
  getParentRoute: () => shipOverlayRoute,
  loader: async ({ context, params }) => {
    const ship = await context.client.ensureQueryData(getShipByIdQuery({ shipSymbol: params.shipSymbol }))
    const waypoint = await context.client.ensureQueryData(
      getWaypointByIdQuery({
        systemSymbol: ship.data.nav.systemSymbol,
        waypointSymbol: ship.data.nav.waypointSymbol,
      }),
    )

    if (waypoint.data.traits.findIndex((trait) => trait.symbol === 'MARKETPLACE') === -1) {
      return redirect({
        to: shipRoute.to,
        params: { shipSymbol: ship.data.symbol },
      })
    }

    const market = context.client.ensureQueryData(
      getWaypointMarketQuery({
        systemSymbol: ship.data.nav.systemSymbol,
        waypointSymbol: ship.data.nav.waypointSymbol,
      }),
    )

    return {
      ship,
      waypoint,
      market: defer(market),
    }
  },
  component: lazyRouteComponent(() => import('./market/ship-market-route.component'), 'ShipMarketRoute'),
})
