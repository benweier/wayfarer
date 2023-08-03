import { type QueryFunctionContext } from '@tanstack/react-query'
import { get } from '@/services/fetch'
import {
  type JumpGateResponse,
  type MarketResponse,
  type ShipyardResponse,
  type SystemsResponse,
  type WaypointResponse,
} from '@/types/spacetraders'
import { type Meta, type SpaceTradersResponse, attachQueryParams, createHeaders } from './core'

const SYSTEM_QUERIES = {
  systemList: (params?: { page?: number; limit?: number }) => [{ scope: 'systems', entity: 'list' }, params] as const,
  systemById: ({ systemSymbol }: { systemSymbol: string }) =>
    [{ scope: 'systems', entity: 'item' }, { systemSymbol }] as const,
}

const WAYPOINT_QUERIES = {
  waypointList: (args: { systemSymbol: string }, params?: { page?: number; limit?: number }) =>
    [{ scope: 'waypoints', entity: 'list' }, args, params] as const,
  waypointById: ({ systemSymbol, waypointSymbol }: { systemSymbol: string; waypointSymbol: string }) =>
    [
      { scope: 'waypoints', entity: 'item' },
      { systemSymbol, waypointSymbol },
    ] as const,
  waypointMarket: ({ systemSymbol, waypointSymbol }: { systemSymbol: string; waypointSymbol: string }) =>
    [
      { scope: 'waypoints', entity: 'market' },
      { systemSymbol, waypointSymbol },
    ] as const,
  waypointShipyard: ({ systemSymbol, waypointSymbol }: { systemSymbol: string; waypointSymbol: string }) =>
    [
      { scope: 'waypoints', entity: 'shipyard' },
      { systemSymbol, waypointSymbol },
    ] as const,
  waypointJumpGate: ({ systemSymbol, waypointSymbol }: { systemSymbol: string; waypointSymbol: string }) =>
    [
      { scope: 'waypoints', entity: 'jump-gate' },
      { systemSymbol, waypointSymbol },
    ] as const,
}

type SystemQueryKey<T extends keyof typeof SYSTEM_QUERIES> = ReturnType<(typeof SYSTEM_QUERIES)[T]>
type WaypointQueryKey<T extends keyof typeof WAYPOINT_QUERIES> = ReturnType<(typeof WAYPOINT_QUERIES)[T]>

export const getSystemListQuery = {
  getQueryKey: SYSTEM_QUERIES.systemList,
  queryFn: async ({ queryKey: [, params], signal }: QueryFunctionContext<SystemQueryKey<'systemList'>>) => {
    const url = new URL(`systems`, import.meta.env.SPACETRADERS_API_BASE_URL)

    if (params) attachQueryParams(url, params)

    return get<SpaceTradersResponse<SystemsResponse[], Meta>>(url, { signal, headers: createHeaders() })
  },
}

export const getSystemByIdQuery = {
  getQueryKey: SYSTEM_QUERIES.systemById,
  queryFn: async ({ queryKey: [, args], signal }: QueryFunctionContext<SystemQueryKey<'systemById'>>) => {
    const url = new URL(`systems/${args.systemSymbol}`, import.meta.env.SPACETRADERS_API_BASE_URL)
    return get<SpaceTradersResponse<SystemsResponse>>(url, { signal, headers: createHeaders() })
  },
}

export const getWaypointListQuery = {
  getQueryKey: WAYPOINT_QUERIES.waypointList,
  queryFn: async ({ queryKey: [, args, params], signal }: QueryFunctionContext<WaypointQueryKey<'waypointList'>>) => {
    const url = new URL(`systems/${args.systemSymbol}/waypoints`, import.meta.env.SPACETRADERS_API_BASE_URL)

    if (params) attachQueryParams(url, params)

    return get<SpaceTradersResponse<WaypointResponse[], Meta>>(url, { signal, headers: createHeaders() })
  },
}

export const getWaypointByIdQuery = {
  getQueryKey: WAYPOINT_QUERIES.waypointById,
  queryFn: async ({ queryKey: [, args], signal }: QueryFunctionContext<WaypointQueryKey<'waypointById'>>) => {
    const url = new URL(
      `systems/${args.systemSymbol}/waypoints/${args.waypointSymbol}`,
      import.meta.env.SPACETRADERS_API_BASE_URL,
    )
    return get<SpaceTradersResponse<WaypointResponse>>(url, { signal, headers: createHeaders() })
  },
}

export const getWaypointMarketQuery = {
  getQueryKey: WAYPOINT_QUERIES.waypointMarket,
  queryFn: async ({ queryKey: [, args], signal }: QueryFunctionContext<WaypointQueryKey<'waypointMarket'>>) => {
    const url = new URL(
      `systems/${args.systemSymbol}/waypoints/${args.waypointSymbol}/market`,
      import.meta.env.SPACETRADERS_API_BASE_URL,
    )
    return get<SpaceTradersResponse<MarketResponse>>(url, { signal, headers: createHeaders() })
  },
}

export const getWaypointShipyardQuery = {
  getQueryKey: WAYPOINT_QUERIES.waypointShipyard,
  queryFn: async ({ queryKey: [, args], signal }: QueryFunctionContext<WaypointQueryKey<'waypointShipyard'>>) => {
    const url = new URL(
      `systems/${args.systemSymbol}/waypoints/${args.waypointSymbol}/shipyard`,
      import.meta.env.SPACETRADERS_API_BASE_URL,
    )
    return get<SpaceTradersResponse<ShipyardResponse>>(url, { signal, headers: createHeaders() })
  },
}

export const getWaypointJumpGateQuery = {
  getQueryKey: WAYPOINT_QUERIES.waypointJumpGate,
  queryFn: async ({ queryKey: [, args], signal }: QueryFunctionContext<WaypointQueryKey<'waypointJumpGate'>>) => {
    const url = new URL(
      `systems/${args.systemSymbol}/waypoints/${args.waypointSymbol}/jump-gate`,
      import.meta.env.SPACETRADERS_API_BASE_URL,
    )
    return get<SpaceTradersResponse<JumpGateResponse>>(url, { signal, headers: createHeaders() })
  },
}
