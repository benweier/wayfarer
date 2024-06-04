import { authStore } from '@/store/auth'
import type {
  AgentResponse,
  ChartResponse,
  ContractResponse,
  CooldownResponse,
  ExtractResponse,
  FuelResponse,
  MarketTransaction,
  NavigationResponse,
  ShipCargo,
  ShipMount,
  ShipRepairTransaction,
  ShipResponse,
  ShipScrapTransaction,
  ShipSiphonResponse,
  SurveyResponse,
  WaypointResponse,
} from '@/types/spacetraders'
import { getPageList } from '@/utilities/get-page-list.helper'
import { queryOptions } from '@tanstack/react-query'
import { type Meta, type SpaceTradersResponse, api } from './core'

type ShipMutationKey = { shipSymbol: string }

export const getShipListQuery = () =>
  queryOptions({
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    queryKey: [{ scope: 'ships', entity: 'list' }],
    queryFn: async ({ signal }) => {
      const { isAuthenticated } = authStore.getState()

      if (!isAuthenticated) {
        return { data: [], meta: { page: 0, total: 0, limit: 0 } }
      }

      const initial = await api
        .get('my/ships', { page: 1, limit: 20 }, { signal })
        .json<SpaceTradersResponse<ShipResponse[], Meta>>()
      const pages = getPageList(Math.ceil(initial.meta.total / initial.meta.limit), 1)
      const remaining = await Promise.all(
        pages.map((page) => {
          return api.get('my/ships', { page, limit: 20 }, { signal }).json<SpaceTradersResponse<ShipResponse[], Meta>>()
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
    queryFn: ({ signal }) => {
      return api
        .get(`my/ships/${args.shipSymbol.toUpperCase()}`, undefined, { signal })
        .json<SpaceTradersResponse<ShipResponse>>()
    },
  })

export const createShipPurchaseMutation = {
  getMutationKey: () => [{ scope: 'ships', entity: 'list', action: 'purchase' }],
  mutationFn: ({ shipType, waypointSymbol }: { shipType: string; waypointSymbol: string }) => {
    return api
      .post('my/ships', { shipType, waypointSymbol })
      .json<SpaceTradersResponse<{ agent: AgentResponse; ship: ShipResponse }>>()
  },
}

export const createShipCargoPurchaseMutation = {
  getMutationKey: (args?: ShipMutationKey | null) => [
    { scope: 'ships', entity: 'item', action: 'purchase-cargo' },
    args,
  ],
  mutationFn: ({ shipSymbol, itemSymbol, units }: { shipSymbol: string; itemSymbol: string; units: number }) => {
    return api
      .post(`my/ships/${shipSymbol.toUpperCase()}/purchase`, { symbol: itemSymbol, units })
      .json<SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; transaction: MarketTransaction }>>()
  },
}

export const createShipCargoSellMutation = {
  getMutationKey: (args?: ShipMutationKey | null) => [{ scope: 'ships', entity: 'item', action: 'sell-cargo' }, args],
  mutationFn: ({ shipSymbol, itemSymbol, units }: { shipSymbol: string; itemSymbol: string; units: number }) => {
    return api
      .post(`my/ships/${shipSymbol.toUpperCase()}/sell`, { symbol: itemSymbol, units })
      .json<SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; transaction: MarketTransaction }>>()
  },
}

export const createShipScanWaypointsMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'scan-waypoints' }, args],
  mutationFn: (args: { shipSymbol: string }) => {
    return api
      .post(`my/ships/${args.shipSymbol.toUpperCase()}/scan/waypoints`, undefined)
      .json<SpaceTradersResponse<{ waypoints: WaypointResponse[]; cooldown: CooldownResponse }>>()
  },
}

export const createShipScanSystemMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'scan-system' }, args],
  mutationFn: (args: { shipSymbol: string }) => {
    return api.post(`my/ships/${args.shipSymbol.toUpperCase()}/scan/systems`).json<
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
    >()
  },
}

export const createShipOrbitMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'orbit' }, args],
  mutationFn: (args: ShipMutationKey) => {
    return api
      .post(`my/ships/${args.shipSymbol.toUpperCase()}/orbit`)
      .json<SpaceTradersResponse<{ nav: NavigationResponse }>>()
  },
}

export const createShipDockMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'dock' }, args],
  mutationFn: (args: ShipMutationKey) => {
    return api
      .post(`my/ships/${args.shipSymbol.toUpperCase()}/dock`)
      .json<SpaceTradersResponse<{ nav: NavigationResponse }>>()
  },
}

export const createShipNavigateMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'navigate' }, args],
  mutationFn: ({ shipSymbol, waypointSymbol }: { shipSymbol: string; waypointSymbol: string }) => {
    return api
      .post(`my/ships/${shipSymbol.toUpperCase()}/navigate`, { waypointSymbol })
      .json<SpaceTradersResponse<{ nav: NavigationResponse; fuel: FuelResponse }>>()
  },
}

export const createShipWarpMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'warp' }, args],
  mutationFn: ({ shipSymbol, waypointSymbol }: { shipSymbol: string; waypointSymbol: string }) => {
    return api
      .post(`my/ships/${shipSymbol.toUpperCase()}/warp`, { waypointSymbol })
      .json<SpaceTradersResponse<{ nav: NavigationResponse; fuel: FuelResponse }>>()
  },
}

export const createShipJumpMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'jump' }, args],
  mutationFn: ({ shipSymbol, systemSymbol }: { shipSymbol: string; systemSymbol: string }) => {
    return api
      .post(`my/ships/${shipSymbol.toUpperCase()}/jump`, { systemSymbol })
      .json<SpaceTradersResponse<{ nav: NavigationResponse; cooldown: CooldownResponse }>>()
  },
}

export const createShipRefuelMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'refuel' }, args],
  mutationFn: ({ shipSymbol }: { shipSymbol: string }) => {
    return api
      .post(`my/ships/${shipSymbol.toUpperCase()}/refuel`)
      .json<SpaceTradersResponse<{ agent: AgentResponse; fuel: FuelResponse }>>()
  },
}

export const createShipFlightModeMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'flight-mode' }, args],
  mutationFn: ({ shipSymbol, flightMode }: { shipSymbol: string; flightMode: string }) => {
    return api
      .patch(`my/ships/${shipSymbol.toUpperCase()}/nav`, { flightMode })
      .json<SpaceTradersResponse<NavigationResponse>>()
  },
}

export const createShipSurveyMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'survey' }, args],
  mutationFn: ({ shipSymbol }: { shipSymbol: string }) => {
    return api
      .post(`my/ships/${shipSymbol.toUpperCase()}/survey`)
      .json<SpaceTradersResponse<{ surveys: SurveyResponse[]; cooldown: CooldownResponse }>>()
  },
}

export const createShipExtractMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'extract' }, args],
  mutationFn: ({ shipSymbol, survey }: { shipSymbol: string; survey?: SurveyResponse }) => {
    const path =
      survey === undefined
        ? `my/ships/${shipSymbol.toUpperCase()}/extract`
        : `my/ships/${shipSymbol.toUpperCase()}/extract/survey`

    return api
      .post(path, survey)
      .json<SpaceTradersResponse<{ cooldown: CooldownResponse; extraction: ExtractResponse; cargo: ShipCargo }>>()
  },
}

export const createShipSiphonMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'siphon' }, args],
  mutationFn: ({ shipSymbol }: { shipSymbol: string }) => {
    return api.post(`my/ships/${shipSymbol.toUpperCase()}/siphon`).json<SpaceTradersResponse<ShipSiphonResponse>>()
  },
}

export const createShipRefineMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'refine' }, args],
  mutationFn: ({ shipSymbol, produce }: { shipSymbol: string; produce: string }) => {
    return api.post<
      SpaceTradersResponse<{
        cooldown: CooldownResponse
        cargo: ShipCargo
        produced: Array<{ tradeSymbol: string; units: number }>
        consumed: Array<{ tradeSymbol: string; units: number }>
      }>
    >(`my/ships/${shipSymbol.toUpperCase()}/refine`, { produce })
  },
}

export const createShipTransferCargoMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'transfer-cargo' }, args],
  mutationFn: ({
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
    return api.post<SpaceTradersResponse<{ cargo: ShipCargo }>>(`my/ships/${shipSymbol.from.toUpperCase()}/transfer`, {
      shipSymbol: shipSymbol.to,
      tradeSymbol: itemSymbol,
      units,
    })
  },
}

export const createShipJettisonMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'jettison' }, args],
  mutationFn: ({ shipSymbol, itemSymbol, units }: { shipSymbol: string; itemSymbol: string; units: number }) => {
    return api.post<SpaceTradersResponse<{ cargo: ShipCargo }>>(`my/ships/${shipSymbol.toUpperCase()}/jettison`, {
      symbol: itemSymbol,
      units,
    })
  },
}

export const createShipChartMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'chart' }, args],
  mutationFn: ({ shipSymbol }: { shipSymbol: string }) => {
    return api.post<SpaceTradersResponse<{ chart: ChartResponse; waypoint: WaypointResponse }>>(
      `my/ships/${shipSymbol.toUpperCase()}/chart`,
      undefined,
    )
  },
}

export const createShipInstallMountMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'install-mount' }, args],
  mutationFn: ({ shipSymbol, mountSymbol }: { shipSymbol: string; mountSymbol: string }) => {
    return api
      .post(`my/ships/${shipSymbol.toUpperCase()}/mounts/install`, { symbol: mountSymbol })
      .json<SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; mounts: ShipMount[] }>>()
  },
}

export const createShipRemoveMountMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'remove-mount' }, args],
  mutationFn: ({ shipSymbol, mountSymbol }: { shipSymbol: string; mountSymbol: string }) => {
    return api
      .post(`my/ships/${shipSymbol.toUpperCase()}/mounts/remove`, { symbol: mountSymbol })
      .json<SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; mounts: ShipMount[] }>>()
  },
}

export const createShipNegotiateContractMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'negotiate-contract' }, args],
  mutationFn: ({ shipSymbol }: { shipSymbol: string }) => {
    return api.post<SpaceTradersResponse<{ contract: ContractResponse }>>(`my/ships/${shipSymbol}/negotiate/contract`)
  },
}

export const getShipScrapQuery = (args: { shipSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'ships', entity: 'scrap' }, args],
    queryFn: ({ signal }) => {
      return api
        .get(`my/ships/${args.shipSymbol.toUpperCase()}/scrap`, undefined, { signal })
        .json<SpaceTradersResponse<{ transaction: ShipScrapTransaction }>>()
    },
  })

export const createShipScrapMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'scrap' }, args],
  mutationFn: ({ shipSymbol }: { shipSymbol: string }) => {
    return api
      .post(`my/ships/${shipSymbol.toUpperCase()}/scrap`)
      .json<SpaceTradersResponse<{ agent: AgentResponse; transaction: ShipScrapTransaction }>>()
  },
}

export const getShipRepairQuery = (args: { shipSymbol: string }) =>
  queryOptions({
    queryKey: [{ scope: 'ships', entity: 'repair' }, args],
    queryFn: ({ signal }) => {
      return api
        .get(`my/ships/${args.shipSymbol.toUpperCase()}/repair`, undefined, {
          signal,
        })
        .json<SpaceTradersResponse<{ transaction: ShipRepairTransaction }>>()
    },
  })

export const createShipRepairMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'repair' }, args],
  mutationFn: ({ shipSymbol }: { shipSymbol: string }) => {
    return api
      .post(`my/ships/${shipSymbol.toUpperCase()}/repair`, undefined)
      .json<SpaceTradersResponse<{ agent: AgentResponse; ship: ShipResponse; transaction: ShipRepairTransaction }>>()
  },
}
