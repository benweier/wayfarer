import { queryOptions } from '@tanstack/react-query'
import * as v from 'valibot'
import { api } from './api'
import { getPageList } from '@/utilities/get-page-list.helper'
import {
  WaypointResponseSchema,
  MarketResponseSchema,
  ShipyardResponseSchema,
  JumpGateResponseSchema,
  SpaceTradersResponseSchema,
  PaginationMetaSchema,
} from './schema'

export function getWaypointListQuery(args: { systemSymbol: string }) {
  return queryOptions({
    queryKey: [{ scope: 'waypoints', entity: 'list' }, args],
    queryFn: async ({ signal }) => {
      const initial = await api(`systems/${args.systemSymbol.toUpperCase()}/waypoints`, {
        params: { page: 1, limit: 20 },
        signal,
        schema: SpaceTradersResponseSchema(v.array(WaypointResponseSchema), PaginationMetaSchema),
      })
      const pages = getPageList(Math.ceil(initial.meta.total / initial.meta.limit), 1)
      const remaining = await Promise.all(
        pages.map((page) => {
          return api(`systems/${args.systemSymbol.toUpperCase()}/waypoints`, {
            params: { page, limit: 20 },
            signal,
            schema: SpaceTradersResponseSchema(v.array(WaypointResponseSchema), PaginationMetaSchema),
          })
        }),
      )
      const data = initial.data.concat(...remaining.map((page) => page.data))
      const meta = { page: 1, total: data.length, limit: data.length }

      return { data, meta }
    },
  })
}

export function getWaypointByIdQuery(args: { systemSymbol: string; waypointSymbol: string }) {
  return queryOptions({
    queryKey: [{ scope: 'waypoints', entity: 'item' }, args],
    queryFn: ({ signal }) => {
      return api(`systems/${args.systemSymbol.toUpperCase()}/waypoints/${args.waypointSymbol.toUpperCase()}`, {
        signal,
        schema: SpaceTradersResponseSchema(WaypointResponseSchema),
      })
    },
  })
}

export function getWaypointMarketQuery(args: { systemSymbol: string; waypointSymbol: string }) {
  return queryOptions({
    queryKey: [{ scope: 'waypoints', entity: 'market' }, args],
    queryFn: ({ signal }) => {
      return api(`systems/${args.systemSymbol.toUpperCase()}/waypoints/${args.waypointSymbol.toUpperCase()}/market`, {
        signal,
        schema: SpaceTradersResponseSchema(MarketResponseSchema),
      })
    },
  })
}

export function getWaypointShipyardQuery(args: { systemSymbol: string; waypointSymbol: string }) {
  return queryOptions({
    queryKey: [{ scope: 'waypoints', entity: 'shipyard' }, args],
    queryFn: ({ signal }) => {
      return api(`systems/${args.systemSymbol.toUpperCase()}/waypoints/${args.waypointSymbol.toUpperCase()}/shipyard`, {
        signal,
        schema: SpaceTradersResponseSchema(ShipyardResponseSchema),
      })
    },
  })
}

export function getWaypointJumpGateQuery(args: { systemSymbol: string; waypointSymbol: string }) {
  return queryOptions({
    queryKey: [{ scope: 'waypoints', entity: 'jump-gate' }, args],
    queryFn: ({ signal }) => {
      return api(
        `systems/${args.systemSymbol.toUpperCase()}/waypoints/${args.waypointSymbol.toUpperCase()}/jump-gate`,
        {
          signal,
          schema: SpaceTradersResponseSchema(JumpGateResponseSchema),
        },
      )
    },
  })
}
