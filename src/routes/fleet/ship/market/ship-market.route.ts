import { Route, defer, lazyRouteComponent, redirect } from '@tanstack/react-router'
import { getShipByIdQuery, getWaypointByIdQuery, getWaypointMarketQuery } from '@/services/api/spacetraders'
import { ShipOverlayRoute } from '../overlay'
import { shipIndexRoute, shipRoute } from '../ship.route'

export const shipOverlayRoute = new Route({
  id: '_ship_overlay',
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
      throw redirect({
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
  component: lazyRouteComponent(() => import('./ship-market-route.component'), 'ShipMarketRoute'),
})
