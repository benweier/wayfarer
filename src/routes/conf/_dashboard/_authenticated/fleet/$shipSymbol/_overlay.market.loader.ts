import { type QueryClient } from '@tanstack/react-query'
import { type RouteLoaderFn, defer, redirect } from '@tanstack/react-router'
import { type StoreApi } from 'zustand/vanilla'
import { getShipByIdQuery, getWaypointByIdQuery, getWaypointMarketQuery } from '@/services/api/spacetraders'
import { type AuthStore } from '@/store/auth'

export const loader: RouteLoaderFn<
  { shipSymbol: string },
  Record<string, never>,
  { client: QueryClient; auth: StoreApi<AuthStore> },
  { meta: MetaFunction }
> = async ({ context, params }) => {
  const ship = await context.client.ensureQueryData(getShipByIdQuery({ shipSymbol: params.shipSymbol }))
  const waypoint = await context.client.ensureQueryData(
    getWaypointByIdQuery({
      systemSymbol: ship.data.nav.systemSymbol,
      waypointSymbol: ship.data.nav.waypointSymbol,
    }),
  )

  if (waypoint.data.traits.findIndex((trait) => trait.symbol === 'MARKETPLACE') === -1) {
    throw redirect({
      to: '/fleet/$shipSymbol',
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
}
