import { queryOptions } from '@tanstack/react-query'
import { get, patch, post } from '@/services/fetch'
import { authStore } from '@/store/auth'
import {
  type AgentResponse,
  type ChartResponse,
  type ContractResponse,
  type CooldownResponse,
  type ExtractResponse,
  type FuelResponse,
  type MarketTransaction,
  type NavigationResponse,
  type ShipCargo,
  type ShipMount,
  type ShipRepairTransaction,
  type ShipResponse,
  type ShipScrapTransaction,
  type ShipSiphonResponse,
  type SurveyResponse,
  type WaypointResponse,
} from '@/types/spacetraders'
import { getPageList } from '@/utilities/get-page-list.helper'
import { type Meta, type SpaceTradersResponse, createHeaders } from './core'

type ShipMutationKey = { shipSymbol: string }

export const getShipListQuery = () =>
  queryOptions({
    staleTime: Infinity,
    gcTime: Infinity,
    queryKey: [{ scope: 'ships', entity: 'list' }],
    queryFn: async ({ signal }) => {
      const { isAuthenticated } = authStore.getState()

      if (!isAuthenticated) {
        return { data: [], meta: { page: 0, total: 0, limit: 0 } }
      }

      const url = new URL('my/ships', import.meta.env.SPACETRADERS_API_BASE_URL)

      url.searchParams.set('page', '1')
      url.searchParams.set('limit', '20')

      const initial = await get<SpaceTradersResponse<ShipResponse[], Meta>>(url, { signal, headers: createHeaders() })
      const pages = getPageList(Math.ceil(initial.meta.total / initial.meta.limit), 1)
      const remaining = await Promise.all(
        pages.map((page) => {
          url.searchParams.set('page', String(page))

          return get<SpaceTradersResponse<ShipResponse[], Meta>>(url, { signal, headers: createHeaders() })
        }),
      )
      const data = initial.data.concat(...remaining.map((page) => page.data))
      const meta = { page: 1, total: data.length, limit: data.length }

      return { data, meta }
    },
  })

export const getShipByIdQuery = (args: { shipSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'ships', entity: 'item' }, args],
    queryFn: async ({ signal }) => {
      const url = new URL(`my/ships/${args.shipSymbol.toUpperCase()}`, import.meta.env.SPACETRADERS_API_BASE_URL)

      return get<SpaceTradersResponse<ShipResponse>>(url, { signal, headers: createHeaders() })
    },
  })

export const createShipPurchaseMutation = {
  getMutationKey: () => [{ scope: 'ships', entity: 'list', action: 'purchase' }],
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
  getMutationKey: (args?: ShipMutationKey | null) => [
    { scope: 'ships', entity: 'item', action: 'purchase-cargo' },
    args,
  ],
  mutationFn: async ({ shipSymbol, itemSymbol, units }: { shipSymbol: string; itemSymbol: string; units: number }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/purchase`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; transaction: MarketTransaction }>>(
      url,
      { symbol: itemSymbol, units },
      { headers: createHeaders() },
    )
  },
}

export const createShipCargoSellMutation = {
  getMutationKey: (args?: ShipMutationKey | null) => [{ scope: 'ships', entity: 'item', action: 'sell-cargo' }, args],
  mutationFn: async ({ shipSymbol, itemSymbol, units }: { shipSymbol: string; itemSymbol: string; units: number }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/sell`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; transaction: MarketTransaction }>>(
      url,
      { symbol: itemSymbol, units },
      { headers: createHeaders() },
    )
  },
}

export const createShipScanWaypointsMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'scan-waypoints' }, args],
  mutationFn: async (args: { shipSymbol: string }) => {
    const url = new URL(
      `my/ships/${args.shipSymbol.toUpperCase()}/scan/waypoints`,
      import.meta.env.SPACETRADERS_API_BASE_URL,
    )

    return post<SpaceTradersResponse<{ waypoints: WaypointResponse[]; cooldown: CooldownResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createShipScanSystemMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'scan-system' }, args],
  mutationFn: async (args: { shipSymbol: string }) => {
    const url = new URL(
      `my/ships/${args.shipSymbol.toUpperCase()}/scan/systems`,
      import.meta.env.SPACETRADERS_API_BASE_URL,
    )

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
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'orbit' }, args],
  mutationFn: async (args: ShipMutationKey) => {
    const url = new URL(`my/ships/${args.shipSymbol.toUpperCase()}/orbit`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ nav: NavigationResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createShipDockMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'dock' }, args],
  mutationFn: async (args: ShipMutationKey) => {
    const url = new URL(`my/ships/${args.shipSymbol.toUpperCase()}/dock`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ nav: NavigationResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createShipNavigateMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'navigate' }, args],
  mutationFn: async ({ shipSymbol, waypointSymbol }: { shipSymbol: string; waypointSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/navigate`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ nav: NavigationResponse; fuel: FuelResponse }>>(
      url,
      { waypointSymbol },
      { headers: createHeaders() },
    )
  },
}

export const createShipWarpMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'warp' }, args],
  mutationFn: async ({ shipSymbol, waypointSymbol }: { shipSymbol: string; waypointSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/warp`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ nav: NavigationResponse; fuel: FuelResponse }>>(
      url,
      { waypointSymbol },
      { headers: createHeaders() },
    )
  },
}

export const createShipJumpMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'jump' }, args],
  mutationFn: async ({ shipSymbol, systemSymbol }: { shipSymbol: string; systemSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/jump`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ nav: NavigationResponse; cooldown: CooldownResponse }>>(
      url,
      { systemSymbol },
      { headers: createHeaders() },
    )
  },
}

export const createShipRefuelMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'refuel' }, args],
  mutationFn: async ({ shipSymbol }: { shipSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/refuel`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ agent: AgentResponse; fuel: FuelResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createShipFlightModeMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'flight-mode' }, args],
  mutationFn: async ({ shipSymbol, flightMode }: { shipSymbol: string; flightMode: string }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/nav`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return patch<SpaceTradersResponse<NavigationResponse>>(
      url,
      { flightMode },
      {
        headers: createHeaders(),
      },
    )
  },
}

export const createShipSurveyMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'survey' }, args],
  mutationFn: async ({ shipSymbol }: { shipSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/survey`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ surveys: SurveyResponse[]; cooldown: CooldownResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createShipExtractMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'extract' }, args],
  mutationFn: async ({ shipSymbol, survey }: { shipSymbol: string; survey?: SurveyResponse }) => {
    const url =
      survey === undefined
        ? new URL(`my/ships/${shipSymbol.toUpperCase()}/extract`, import.meta.env.SPACETRADERS_API_BASE_URL)
        : new URL(`my/ships/${shipSymbol.toUpperCase()}/extract/survey`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ cooldown: CooldownResponse; extraction: ExtractResponse; cargo: ShipCargo }>>(
      url,
      survey,
      { headers: createHeaders() },
    )
  },
}

export const createShipSiphonMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'siphon' }, args],
  mutationFn: async ({ shipSymbol }: { shipSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/siphon`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<ShipSiphonResponse>>(url, undefined, { headers: createHeaders() })
  },
}

export const createShipRefineMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'refine' }, args],
  mutationFn: async ({ shipSymbol, produce }: { shipSymbol: string; produce: string }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/refine`, import.meta.env.SPACETRADERS_API_BASE_URL)

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

export const createShipTransferCargoMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'transfer-cargo' }, args],
  mutationFn: async ({
    shipSymbol,
    itemSymbol,
    units,
  }: {
    shipSymbol: {
      from: string
      to: string
    }
    itemSymbol: string
    units: number
  }) => {
    const url = new URL(`my/ships/${shipSymbol.from.toUpperCase()}/transfer`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ cargo: ShipCargo }>>(
      url,
      { shipSymbol: shipSymbol.to, tradeSymbol: itemSymbol, units },
      { headers: createHeaders() },
    )
  },
}

export const createShipJettisonMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'jettison' }, args],
  mutationFn: async ({ shipSymbol, itemSymbol, units }: { shipSymbol: string; itemSymbol: string; units: number }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/jettison`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ cargo: ShipCargo }>>(
      url,
      { symbol: itemSymbol, units },
      { headers: createHeaders() },
    )
  },
}

export const createShipChartMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'chart' }, args],
  mutationFn: async ({ shipSymbol }: { shipSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/chart`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ chart: ChartResponse; waypoint: WaypointResponse }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const createShipInstallMountMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'install-mount' }, args],
  mutationFn: async ({ shipSymbol, mountSymbol }: { shipSymbol: string; mountSymbol: string }) => {
    const url = new URL(
      `my/ships/${shipSymbol.toUpperCase()}/mounts/install`,
      import.meta.env.SPACETRADERS_API_BASE_URL,
    )

    return post<
      SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; mounts: ShipMount[] }>,
      { symbol: string }
    >(url, { symbol: mountSymbol }, { headers: createHeaders() })
  },
}

export const createShipRemoveMountMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'remove-mount' }, args],
  mutationFn: async ({ shipSymbol, mountSymbol }: { shipSymbol: string; mountSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/mounts/remove`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<
      SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; mounts: ShipMount[] }>,
      { symbol: string }
    >(url, { symbol: mountSymbol }, { headers: createHeaders() })
  },
}

export const createShipNegotiateContractMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'negotiate-contract' }, args],
  mutationFn: async ({ shipSymbol }: { shipSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol}/negotiate/contract`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ contract: ContractResponse }>>(url, undefined, { headers: createHeaders() })
  },
}

export const getShipScrapQuery = (args: { shipSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'ships', entity: 'scrap' }, args],
    queryFn: async ({ signal }) => {
      const url = new URL(`my/ships/${args.shipSymbol.toUpperCase()}/scrap`, import.meta.env.SPACETRADERS_API_BASE_URL)

      return get<SpaceTradersResponse<{ transaction: ShipScrapTransaction }>>(url, { signal, headers: createHeaders() })
    },
  })

export const createShipScrapMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'scrap' }, args],
  mutationFn: async ({ shipSymbol }: { shipSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/scrap`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ agent: AgentResponse; transaction: ShipScrapTransaction }>>(url, undefined, {
      headers: createHeaders(),
    })
  },
}

export const getShipRepairQuery = (args: { shipSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'ships', entity: 'repair' }, args],
    queryFn: async ({ signal }) => {
      const url = new URL(`my/ships/${args.shipSymbol.toUpperCase()}/repair`, import.meta.env.SPACETRADERS_API_BASE_URL)

      return get<SpaceTradersResponse<{ transaction: ShipRepairTransaction }>>(url, {
        signal,
        headers: createHeaders(),
      })
    },
  })

export const createShipRepairMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'repair' }, args],
  mutationFn: async ({ shipSymbol }: { shipSymbol: string }) => {
    const url = new URL(`my/ships/${shipSymbol.toUpperCase()}/repair`, import.meta.env.SPACETRADERS_API_BASE_URL)

    return post<SpaceTradersResponse<{ agent: AgentResponse; ship: ShipResponse; transaction: ShipRepairTransaction }>>(
      url,
      undefined,
      {
        headers: createHeaders(),
      },
    )
  },
}
