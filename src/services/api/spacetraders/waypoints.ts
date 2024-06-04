import { type Meta, type SpaceTradersResponse, api } from '@/services/api/spacetraders/core'

import type { JumpGateResponse, MarketResponse, ShipyardResponse, WaypointResponse } from '@/types/spacetraders'
import { getPageList } from '@/utilities/get-page-list.helper'
import { queryOptions } from '@tanstack/react-query'

export const getWaypointListQuery = (args: { systemSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'waypoints', entity: 'list' }, args],
    queryFn: async ({ signal }) => {
      const path = `systems/${args.systemSymbol.toUpperCase()}/waypoints`

      const initial = await api
        .get(path, { page: 1, limit: 20 }, { signal })
        .json<SpaceTradersResponse<WaypointResponse[], Meta>>()
      const pages = getPageList(Math.ceil(initial.meta.total / initial.meta.limit), 1)
      const remaining = await Promise.all(
        pages.map((page) => {
          return api.get(path, { page, limit: 20 }, { signal }).json<SpaceTradersResponse<WaypointResponse[], Meta>>()
        }),
      )
      const data = initial.data.concat(...remaining.map((page) => page.data))
      const meta = { page: 1, total: data.length, limit: data.length }

      return { data, meta }
    },
  })

export const getWaypointByIdQuery = (args: { systemSymbol: string; waypointSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'waypoints', entity: 'item' }, args],
    queryFn: ({ signal }) => {
      const path = `systems/${args.systemSymbol.toUpperCase()}/waypoints/${args.waypointSymbol.toUpperCase()}`

      return api.get(path, undefined, { signal }).json<SpaceTradersResponse<WaypointResponse>>()
    },
  })

export const getWaypointMarketQuery = (args: { systemSymbol: string; waypointSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'waypoints', entity: 'market' }, args],
    queryFn: ({ signal }) => {
      const path = `systems/${args.systemSymbol.toUpperCase()}/waypoints/${args.waypointSymbol.toUpperCase()}/market`

      return api.get(path, undefined, { signal }).json<SpaceTradersResponse<MarketResponse>>()
    },
  })

export const getWaypointShipyardQuery = (args: { systemSymbol: string; waypointSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'waypoints', entity: 'shipyard' }, args],
    queryFn: ({ signal }) => {
      const path = `systems/${args.systemSymbol.toUpperCase()}/waypoints/${args.waypointSymbol.toUpperCase()}/shipyard`

      return api.get(path, undefined, { signal }).json<SpaceTradersResponse<ShipyardResponse>>()
    },
  })

export const getWaypointJumpGateQuery = (args: { systemSymbol: string; waypointSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'waypoints', entity: 'jump-gate' }, args],
    queryFn: ({ signal }) => {
      const path = `systems/${args.systemSymbol.toUpperCase()}/waypoints/${args.waypointSymbol.toUpperCase()}/jump-gate`

      return api.get(path, undefined, { signal }).json<SpaceTradersResponse<JumpGateResponse>>()
    },
  })
