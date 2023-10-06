import { type QueryFunctionContext } from '@tanstack/react-query'
import { get, post } from '@/services/fetch'
import {
  type AgentResponse,
  type ChartResponse,
  type CooldownResponse,
  type ExtractResponse,
  type FuelResponse,
  type MarketTransaction,
  type NavigationResponse,
  type ShipCargo,
  type ShipMount,
  type ShipResponse,
  type SurveyResponse,
  type WaypointResponse,
} from '@/types/spacetraders'
import { getPageList } from '@/utilities/get-page-list.helper'
import { type Meta, type SpaceTradersResponse, createHeaders } from './core'

type MaybeMutationKey<T = never> = [] | [Partial<T>]

export const FLEET_QUERIES = {
  shipList: () => [{ scope: 'ships', entity: 'list' }] as const,
  shipById: (args: { shipSymbol: string }) => [{ scope: 'ships', entity: 'item' }, args] as const,
}

type FleetQueryKey<T extends keyof typeof FLEET_QUERIES> = ReturnType<(typeof FLEET_QUERIES)[T]>

export const getShipListQuery = {
  getQueryKey: FLEET_QUERIES.shipList,
  queryFn: async ({ signal }: QueryFunctionContext<FleetQueryKey<'shipList'>>) => {
    const url = new URL(`my/ships`, import.meta.env.SPACETRADERS_API_BASE_URL)

    url.searchParams.set('page', '1')
    url.searchParams.set('limit', '20')

    const initial = await get<SpaceTradersResponse<ShipResponse[], Meta>>(url, { signal, headers: createHeaders() })
    const pages = getPageList(Math.floor(initial.meta.total / initial.meta.limit), 1)
    const remaining = await Promise.all(
      pages.map((page) => {
        url.searchParams.set('page', String(page))

        return get<SpaceTradersResponse<ShipResponse[], Meta>>(url, { signal, headers: createHeaders() })
      }),
    )

    return {
      data: initial.data.concat(...remaining.map((page) => page.data)),
    }
  },
}

export const getShipByIdQuery = {
  getQueryKey: FLEET_QUERIES.shipById,
  queryFn: async ({ queryKey: [, args], signal }: QueryFunctionContext<FleetQueryKey<'shipById'>>) => {
    const url = new URL(`my/ships/${args.shipSymbol}`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return get<SpaceTradersResponse<ShipResponse>>(url, { signal, headers: createHeaders() })
  },
}

export const createShipPurchaseMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipType: string; waypointSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'purchase' }, args] as const,
  mutationFn: async ({ shipType, waypointSymbol }: { shipType: string; waypointSymbol: string }) => {
    const url = new URL(`my/ships`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ agent: AgentResponse; ship: ShipResponse }>>(
      url,
      { shipType, waypointSymbol },
      { headers: createHeaders() },
    )
  },
}

export const createShipCargoPurchaseMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'purchase-cargo' }, ...args] as const,
  mutationFn: async ({ shipSymbol, itemSymbol, units }: { shipSymbol: string; itemSymbol: string; units: number }) => {
    const url = new URL(`my/ships/${shipSymbol}/purchase`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; transaction: MarketTransaction }>>(
      url,
      { symbol: itemSymbol, units },
      { headers: createHeaders() },
    )
  },
}

export const createShipCargoSellMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'sell-cargo' }, ...args] as const,
  mutationFn: async ({ shipSymbol, itemSymbol, units }: { shipSymbol: string; itemSymbol: string; units: number }) => {
    const url = new URL(`my/ships/${shipSymbol}/sell`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; transaction: MarketTransaction }>>(
      url,
      { symbol: itemSymbol, units },
      { headers: createHeaders() },
    )
  },
}

export const createShipScanWaypointsMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'scan-waypoints' }, ...args] as const,
  mutationFn: async ({ shipSymbol }: { shipSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol}/scan/waypoints`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ waypoints: WaypointResponse[]; cooldown: CooldownResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createShipScanSystemsMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'scan-systems' }, ...args] as const,
  mutationFn: async ({ shipSymbol }: { shipSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol}/scan/systems`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<
      SpaceTradersResponse<{
        cooldown: CooldownResponse
        systems: Array<{
          symbol: string
          sectorSymbol: string
          type: string
          x: number
          y: number
        }>
      }>
    >(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createShipOrbitMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol?: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'orbit' }, ...args] as const,
  mutationFn: async ({ shipSymbol }: { shipSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol}/orbit`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ nav: NavigationResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createShipDockMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'dock' }, ...args] as const,
  mutationFn: async ({ shipSymbol }: { shipSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol}/dock`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ nav: NavigationResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createShipNavigateMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'navigate' }, ...args] as const,
  mutationFn: async ({ shipSymbol, waypointSymbol }: { shipSymbol: string; waypointSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol}/navigate`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ nav: NavigationResponse; fuel: FuelResponse }>>(
      url,
      { waypointSymbol },
      { headers: createHeaders() },
    )
  },
}

export const createShipWarpMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'warp' }, ...args] as const,
  mutationFn: async ({ shipSymbol, waypointSymbol }: { shipSymbol: string; waypointSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol}/warp`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ nav: NavigationResponse; fuel: FuelResponse }>>(
      url,
      { waypointSymbol },
      { headers: createHeaders() },
    )
  },
}

export const createShipJumpMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'jump' }, ...args] as const,
  mutationFn: async ({ shipSymbol, systemSymbol }: { shipSymbol: string; systemSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol}/jump`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ nav: NavigationResponse; cooldown: CooldownResponse }>>(
      url,
      { systemSymbol },
      { headers: createHeaders() },
    )
  },
}

export const createShipRefuelMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'refuel' }, ...args] as const,
  mutationFn: async ({ shipSymbol }: { shipSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol}/refuel`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ agent: AgentResponse; fuel: FuelResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createShipSurveyMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'survey' }, ...args] as const,
  mutationFn: async ({ shipSymbol }: { shipSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol}/survey`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ surveys: SurveyResponse[]; cooldown: CooldownResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createShipExtractMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'extract' }, ...args] as const,
  mutationFn: async ({ shipSymbol, survey }: { shipSymbol: string; survey?: SurveyResponse }) => {
    const url =
      survey === undefined
        ? new URL(`my/ships/${shipSymbol}/extract`, import.meta.env.SPACETRADERS_API_BASE_URL)
        : new URL(`my/ships/${shipSymbol}/extract/survey`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ cooldown: CooldownResponse; extraction: ExtractResponse; cargo: ShipCargo }>>(
      url,
      survey,
      { headers: createHeaders() },
    )
  },
}

export const createShipRefineMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'refine' }, ...args] as const,
  mutationFn: async ({ shipSymbol, produce }: { shipSymbol: string; produce: string }) => {
    const url = new URL(`my/ships/${shipSymbol}/refine`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<
      SpaceTradersResponse<{
        cooldown: CooldownResponse
        cargo: ShipCargo
        produced: Array<{ tradeSymbol: string; units: number }>
        consumed: Array<{ tradeSymbol: string; units: number }>
      }>
    >(url, { produce }, { headers: createHeaders() })
  },
}

export const createShipJettisonMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'jettison' }, ...args] as const,
  mutationFn: async ({ shipSymbol, itemSymbol, units }: { shipSymbol: string; itemSymbol: string; units: number }) => {
    const url = new URL(`my/ships/${shipSymbol}/jettison`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ cargo: ShipCargo }>>(
      url,
      { symbol: itemSymbol, units },
      { headers: createHeaders() },
    )
  },
}

export const createShipChartMutation = {
  getMutationKey: () => [{ scope: 'ships', entity: 'item', action: 'chart' }] as const,
  mutationFn: async ({ shipSymbol }: { shipSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol}/chart`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ chart: ChartResponse; waypoint: WaypointResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createShipInstallMountMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'install-mount' }, ...args] as const,
  mutationFn: async ({ shipSymbol, mountSymbol }: { shipSymbol: string; mountSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol}/mounts/install`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<
      SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; mounts: ShipMount[] }>,
      { symbol: string }
    >(url, { symbol: mountSymbol }, { headers: createHeaders() })
  },
}

export const createShipRemoveMountMutation = {
  getMutationKey: (...args: MaybeMutationKey<{ shipSymbol: string }>) =>
    [{ scope: 'ships', entity: 'item', action: 'remove-mount' }, ...args] as const,
  mutationFn: async ({ shipSymbol, mountSymbol }: { shipSymbol: string; mountSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol}/mounts/remove`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<
      SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; mounts: ShipMount[] }>,
      { symbol: string }
    >(url, { symbol: mountSymbol }, { headers: createHeaders() })
  },
}
