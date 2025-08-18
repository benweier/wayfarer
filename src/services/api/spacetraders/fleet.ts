import { queryOptions } from '@tanstack/react-query'
import * as v from 'valibot'
import { authStore } from '@/store/auth'
import { getPageList } from '@/utilities/get-page-list.helper'
import { api } from './api'
import {
  ShipResponseSchema,
  AgentResponseSchema,
  NavigationResponseSchema,
  FuelResponseSchema,
  CooldownResponseSchema,
  WaypointResponseSchema,
  SurveyResponseSchema,
  ExtractResponseSchema,
  ShipCargoSchema,
  ShipSiphonResponseSchema,
  ShipMountSchema,
  ContractResponseSchema,
  ChartResponseSchema,
  ShipRepairTransactionSchema,
  ShipScrapTransactionSchema,
  MarketTransactionSchema,
  SpaceTradersResponseSchema,
  PaginationMetaSchema,
} from './schema'

type ShipMutationKey = { shipSymbol: string }

export function getShipListQuery() {
  return queryOptions({
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    queryKey: [{ scope: 'ships', entity: 'list' }],
    queryFn: async ({ signal }) => {
      const { isAuthenticated } = authStore.getState()

      if (!isAuthenticated) {
        return { data: [], meta: { page: 0, total: 0, limit: 0 } }
      }

      const initial = await api('my/ships', {
        params: { page: 1, limit: 20 },
        signal,
        schema: SpaceTradersResponseSchema(v.array(ShipResponseSchema), PaginationMetaSchema),
      })
      const pages = getPageList(Math.ceil(initial.meta.total / initial.meta.limit), 1)
      const remaining = await Promise.all(
        pages.map((page) => {
          return api('my/ships', {
            params: { page, limit: 20 },
            signal,
            schema: SpaceTradersResponseSchema(v.array(ShipResponseSchema), PaginationMetaSchema),
          })
        }),
      )
      const data = initial.data.concat(...remaining.map((page) => page.data))
      const meta = { page: 1, total: data.length, limit: data.length }

      return { data, meta }
    },
  })
}

export function getShipByIdQuery(args: { shipSymbol: string }) {
  return queryOptions({
    queryKey: [{ scope: 'ships', entity: 'item' }, args],
    queryFn: ({ signal }) => {
      return api(`my/ships/${args.shipSymbol.toUpperCase()}`, {
        signal,
        schema: SpaceTradersResponseSchema(ShipResponseSchema),
      })
    },
  })
}

export const createShipPurchaseMutation = {
  getMutationKey: () => [{ scope: 'ships', entity: 'list', action: 'purchase' }],
  mutationFn: ({ shipType, waypointSymbol }: { shipType: string; waypointSymbol: string }) => {
    return api('my/ships', {
      method: 'POST',
      body: { shipType, waypointSymbol },
      schema: SpaceTradersResponseSchema(
        v.object({
          agent: AgentResponseSchema,
          ship: ShipResponseSchema,
        }),
      ),
    })
  },
}

export const createShipCargoPurchaseMutation = {
  getMutationKey: (args?: ShipMutationKey | null) => [
    { scope: 'ships', entity: 'item', action: 'purchase-cargo' },
    args,
  ],
  mutationFn: ({ shipSymbol, itemSymbol, units }: { shipSymbol: string; itemSymbol: string; units: number }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/purchase`, {
      method: 'POST',
      body: { symbol: itemSymbol, units },
      schema: SpaceTradersResponseSchema(
        v.object({
          agent: AgentResponseSchema,
          cargo: ShipCargoSchema,
          transaction: MarketTransactionSchema,
        }),
      ),
    })
  },
}

export const createShipCargoSellMutation = {
  getMutationKey: (args?: ShipMutationKey | null) => [{ scope: 'ships', entity: 'item', action: 'sell-cargo' }, args],
  mutationFn: ({ shipSymbol, itemSymbol, units }: { shipSymbol: string; itemSymbol: string; units: number }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/sell`, {
      method: 'POST',
      body: { symbol: itemSymbol, units },
      schema: SpaceTradersResponseSchema(
        v.object({
          agent: AgentResponseSchema,
          cargo: ShipCargoSchema,
          transaction: MarketTransactionSchema,
        }),
      ),
    })
  },
}

export const createShipScanWaypointsMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'scan-waypoints' }, args],
  mutationFn: (args: { shipSymbol: string }) => {
    return api(`my/ships/${args.shipSymbol.toUpperCase()}/scan/waypoints`, {
      method: 'POST',
      schema: SpaceTradersResponseSchema(
        v.object({
          waypoints: v.array(WaypointResponseSchema),
          cooldown: CooldownResponseSchema,
        }),
      ),
    })
  },
}

export const createShipScanSystemMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'scan-system' }, args],
  mutationFn: (args: { shipSymbol: string }) => {
    return api(`my/ships/${args.shipSymbol.toUpperCase()}/scan/systems`, {
      method: 'POST',
      schema: SpaceTradersResponseSchema(
        v.object({
          cooldown: CooldownResponseSchema,
          systems: v.array(
            v.object({
              symbol: v.string(),
              sectorSymbol: v.string(),
              type: v.string(),
              x: v.number(),
              y: v.number(),
            }),
          ),
        }),
      ),
    })
  },
}

export const createShipOrbitMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'orbit' }, args],
  mutationFn: (args: ShipMutationKey) => {
    return api(`my/ships/${args.shipSymbol.toUpperCase()}/orbit`, {
      method: 'POST',
      schema: SpaceTradersResponseSchema(
        v.object({
          nav: NavigationResponseSchema,
        }),
      ),
    })
  },
}

export const createShipDockMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'dock' }, args],
  mutationFn: (args: ShipMutationKey) => {
    return api(`my/ships/${args.shipSymbol.toUpperCase()}/dock`, {
      method: 'POST',
      schema: SpaceTradersResponseSchema(
        v.object({
          nav: NavigationResponseSchema,
        }),
      ),
    })
  },
}

export const createShipNavigateMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'navigate' }, args],
  mutationFn: ({ shipSymbol, waypointSymbol }: { shipSymbol: string; waypointSymbol: string }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/navigate`, {
      method: 'POST',
      body: { waypointSymbol },
      schema: SpaceTradersResponseSchema(
        v.object({
          nav: NavigationResponseSchema,
          fuel: FuelResponseSchema,
        }),
      ),
    })
  },
}

export const createShipWarpMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'warp' }, args],
  mutationFn: ({ shipSymbol, waypointSymbol }: { shipSymbol: string; waypointSymbol: string }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/warp`, {
      method: 'POST',
      body: { waypointSymbol },
      schema: SpaceTradersResponseSchema(
        v.object({
          nav: NavigationResponseSchema,
          fuel: FuelResponseSchema,
        }),
      ),
    })
  },
}

export const createShipJumpMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'jump' }, args],
  mutationFn: ({ shipSymbol, systemSymbol }: { shipSymbol: string; systemSymbol: string }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/jump`, {
      method: 'POST',
      body: { systemSymbol },
      schema: SpaceTradersResponseSchema(
        v.object({
          nav: NavigationResponseSchema,
          cooldown: CooldownResponseSchema,
        }),
      ),
    })
  },
}

export const createShipRefuelMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'refuel' }, args],
  mutationFn: ({ shipSymbol }: { shipSymbol: string }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/refuel`, {
      method: 'POST',
      schema: SpaceTradersResponseSchema(
        v.object({
          agent: AgentResponseSchema,
          fuel: FuelResponseSchema,
        }),
      ),
    })
  },
}

export const createShipFlightModeMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'flight-mode' }, args],
  mutationFn: ({ shipSymbol, flightMode }: { shipSymbol: string; flightMode: string }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/nav`, {
      method: 'PATCH',
      body: { flightMode },
      schema: SpaceTradersResponseSchema(NavigationResponseSchema),
    })
  },
}

export const createShipSurveyMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'survey' }, args],
  mutationFn: ({ shipSymbol }: { shipSymbol: string }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/survey`, {
      method: 'POST',
      schema: SpaceTradersResponseSchema(
        v.object({
          surveys: v.array(SurveyResponseSchema),
          cooldown: CooldownResponseSchema,
        }),
      ),
    })
  },
}

export const createShipExtractMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'extract' }, args],
  mutationFn: ({ shipSymbol, survey }: { shipSymbol: string; survey?: any }) => {
    const endpoint =
      survey === undefined
        ? `my/ships/${shipSymbol.toUpperCase()}/extract`
        : `my/ships/${shipSymbol.toUpperCase()}/extract/survey`

    return api(endpoint, {
      method: 'POST',
      body: survey,
      schema: SpaceTradersResponseSchema(
        v.object({
          cooldown: CooldownResponseSchema,
          extraction: ExtractResponseSchema,
          cargo: ShipCargoSchema,
        }),
      ),
    })
  },
}

export const createShipSiphonMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'siphon' }, args],
  mutationFn: ({ shipSymbol }: { shipSymbol: string }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/siphon`, {
      method: 'POST',
      schema: SpaceTradersResponseSchema(ShipSiphonResponseSchema),
    })
  },
}

export const createShipRefineMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'refine' }, args],
  mutationFn: ({ shipSymbol, produce }: { shipSymbol: string; produce: string }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/refine`, {
      method: 'POST',
      body: { produce },
      schema: SpaceTradersResponseSchema(
        v.object({
          cooldown: CooldownResponseSchema,
          cargo: ShipCargoSchema,
          produced: v.array(
            v.object({
              tradeSymbol: v.string(),
              units: v.number(),
            }),
          ),
          consumed: v.array(
            v.object({
              tradeSymbol: v.string(),
              units: v.number(),
            }),
          ),
        }),
      ),
    })
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
    return api(`my/ships/${shipSymbol.from.toUpperCase()}/transfer`, {
      method: 'POST',
      body: {
        shipSymbol: shipSymbol.to,
        tradeSymbol: itemSymbol,
        units,
      },
      schema: SpaceTradersResponseSchema(
        v.object({
          cargo: ShipCargoSchema,
        }),
      ),
    })
  },
}

export const createShipJettisonMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'jettison' }, args],
  mutationFn: ({ shipSymbol, itemSymbol, units }: { shipSymbol: string; itemSymbol: string; units: number }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/jettison`, {
      method: 'POST',
      body: {
        symbol: itemSymbol,
        units,
      },
      schema: SpaceTradersResponseSchema(
        v.object({
          cargo: ShipCargoSchema,
        }),
      ),
    })
  },
}

export const createShipChartMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'chart' }, args],
  mutationFn: ({ shipSymbol }: { shipSymbol: string }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/chart`, {
      method: 'POST',
      schema: SpaceTradersResponseSchema(
        v.object({
          chart: ChartResponseSchema,
          waypoint: WaypointResponseSchema,
        }),
      ),
    })
  },
}

export const createShipInstallMountMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'install-mount' }, args],
  mutationFn: ({ shipSymbol, mountSymbol }: { shipSymbol: string; mountSymbol: string }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/mounts/install`, {
      method: 'POST',
      body: { symbol: mountSymbol },
      schema: SpaceTradersResponseSchema(
        v.object({
          agent: AgentResponseSchema,
          cargo: ShipCargoSchema,
          mounts: v.array(ShipMountSchema),
        }),
      ),
    })
  },
}

export const createShipRemoveMountMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'remove-mount' }, args],
  mutationFn: ({ shipSymbol, mountSymbol }: { shipSymbol: string; mountSymbol: string }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/mounts/remove`, {
      method: 'POST',
      body: { symbol: mountSymbol },
      schema: SpaceTradersResponseSchema(
        v.object({
          agent: AgentResponseSchema,
          cargo: ShipCargoSchema,
          mounts: v.array(ShipMountSchema),
        }),
      ),
    })
  },
}

export const createShipNegotiateContractMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'item', action: 'negotiate-contract' }, args],
  mutationFn: ({ shipSymbol }: { shipSymbol: string }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/negotiate/contract`, {
      method: 'POST',
      schema: SpaceTradersResponseSchema(
        v.object({
          contract: ContractResponseSchema,
        }),
      ),
    })
  },
}

export function getShipScrapQuery(args: { shipSymbol: string }) {
  return queryOptions({
    queryKey: [{ scope: 'ships', entity: 'scrap' }, args],
    queryFn: ({ signal }) => {
      return api(`my/ships/${args.shipSymbol.toUpperCase()}/scrap`, {
        signal,
        schema: SpaceTradersResponseSchema(
          v.object({
            transaction: ShipScrapTransactionSchema,
          }),
        ),
      })
    },
  })
}

export const createShipScrapMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'scrap' }, args],
  mutationFn: ({ shipSymbol }: { shipSymbol: string }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/scrap`, {
      method: 'POST',
      schema: SpaceTradersResponseSchema(
        v.object({
          agent: AgentResponseSchema,
          transaction: ShipScrapTransactionSchema,
        }),
      ),
    })
  },
}

export function getShipRepairQuery(args: { shipSymbol: string }) {
  return queryOptions({
    queryKey: [{ scope: 'ships', entity: 'repair' }, args],
    queryFn: ({ signal }) => {
      return api(`my/ships/${args.shipSymbol.toUpperCase()}/repair`, {
        signal,
        schema: SpaceTradersResponseSchema(
          v.object({
            transaction: ShipRepairTransactionSchema,
          }),
        ),
      })
    },
  })
}

export const createShipRepairMutation = {
  getMutationKey: (args: ShipMutationKey) => [{ scope: 'ships', entity: 'repair' }, args],
  mutationFn: ({ shipSymbol }: { shipSymbol: string }) => {
    return api(`my/ships/${shipSymbol.toUpperCase()}/repair`, {
      method: 'POST',
      schema: SpaceTradersResponseSchema(
        v.object({
          agent: AgentResponseSchema,
          ship: ShipResponseSchema,
          transaction: ShipRepairTransactionSchema,
        }),
      ),
    })
  },
}
