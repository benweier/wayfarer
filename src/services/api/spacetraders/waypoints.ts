import { queryOptions } from '@tanstack/react-query'
import { type Meta, type SpaceTradersResponse, createHeaders } from '@/services/api/spacetraders/core'
import { get } from '@/services/fetch'
import {
  type JumpGateResponse,
  type MarketResponse,
  type ShipyardResponse,
  type WaypointResponse,
} from '@/types/spacetraders'
import { getPageList } from '@/utilities/get-page-list.helper'

export const getWaypointListQuery = (args: { systemSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'waypoints', entity: 'list' }, args],
    queryFn: async ({ signal }) => {
      const url = new URL(`systems/${args.systemSymbol}/waypoints`, import.meta.env.SPACETRADERS_API_BASE_URL)

      url.searchParams.set('page', '1')
      url.searchParams.set('limit', '20')

      const initial = await get<SpaceTradersResponse<WaypointResponse[], Meta>>(url, {
        signal,
        headers: createHeaders(),
      })
      const pages = getPageList(Math.ceil(initial.meta.total / initial.meta.limit), 1)
      const remaining = await Promise.all(
        pages.map((page) => {
          url.searchParams.set('page', String(page))

          return get<SpaceTradersResponse<WaypointResponse[], Meta>>(url, { signal, headers: createHeaders() })
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
    queryFn: async ({ signal }) => {
      const url = new URL(
        `systems/${args.systemSymbol}/waypoints/${args.waypointSymbol}`,
        import.meta.env.SPACETRADERS_API_BASE_URL,
      )

      return get<SpaceTradersResponse<WaypointResponse>>(url, { signal, headers: createHeaders() })
    },
  })

export const getWaypointMarketQuery = (args: { systemSymbol: string; waypointSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'waypoints', entity: 'market' }, args],
    queryFn: async ({ signal }) => {
      const url = new URL(
        `systems/${args.systemSymbol}/waypoints/${args.waypointSymbol}/market`,
        import.meta.env.SPACETRADERS_API_BASE_URL,
      )

      return get<SpaceTradersResponse<MarketResponse>>(url, { signal, headers: createHeaders() })
    },
  })

export const getWaypointShipyardQuery = (args: { systemSymbol: string; waypointSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'waypoints', entity: 'shipyard' }, args],
    queryFn: async ({ signal }) => {
      const url = new URL(
        `systems/${args.systemSymbol}/waypoints/${args.waypointSymbol}/shipyard`,
        import.meta.env.SPACETRADERS_API_BASE_URL,
      )

      return get<SpaceTradersResponse<ShipyardResponse>>(url, { signal, headers: createHeaders() })
    },
  })

export const getWaypointJumpGateQuery = (args: { systemSymbol: string; waypointSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'waypoints', entity: 'jump-gate' }, args],
    queryFn: async ({ signal }) => {
      const url = new URL(
        `systems/${args.systemSymbol}/waypoints/${args.waypointSymbol}/jump-gate`,
        import.meta.env.SPACETRADERS_API_BASE_URL,
      )

      return get<SpaceTradersResponse<JumpGateResponse>>(url, { signal, headers: createHeaders() })
    },
  })
