import {
  type AgentResponse,
  type ChartResponse,
  type CooldownResponse,
  type ExtractResponse,
  type FuelResponse,
  type MarketTransaction,
  type NavigationResponse,
  type ShipCargo,
  type ShipResponse,
  type SurveyResponse,
  type WaypointResponse,
} from '@/types/spacetraders'
import { type Meta, type SpaceTradersResponse, mutationFnFactory, queryFnFactory } from './core'

export const getShipsList = queryFnFactory<SpaceTradersResponse<ShipResponse[], Meta>>(() => 'my/ships')

export const getShipById = queryFnFactory<SpaceTradersResponse<ShipResponse>, { shipSymbol: string }>(
  ({ shipSymbol }) => `my/ships/${shipSymbol}`,
)

export const createShipPurchase = mutationFnFactory<
  SpaceTradersResponse<{ agent: AgentResponse; ship: ShipResponse }>,
  undefined,
  { shipType: string; waypointSymbol: string }
>(() => 'my/ships')

export const createShipCargoPurchase = mutationFnFactory<
  SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; transaction: MarketTransaction }>,
  { shipSymbol: string },
  { symbol: string; units: number }
>(({ shipSymbol }) => `my/ships/${shipSymbol}/purchase`)

export const createShipCargoSell = mutationFnFactory<
  SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; transaction: MarketTransaction }>,
  { shipSymbol: string },
  { symbol: string; units: number }
>(({ shipSymbol }) => `my/ships/${shipSymbol}/sell`)

export const createShipScanWaypoint = mutationFnFactory<
  SpaceTradersResponse<{ waypoints: WaypointResponse[]; cooldown: CooldownResponse }>,
  { shipSymbol: string }
>(({ shipSymbol }) => `my/ships/${shipSymbol}/scan/waypoints`)

export const createShipScanSystems = mutationFnFactory<
  SpaceTradersResponse<{
    cooldown: CooldownResponse
    systems: Array<{
      symbol: string
      sectorSymbol: string
      type: string
      x: number
      y: number
    }>
  }>,
  { shipSymbol: string }
>(({ shipSymbol }) => `my/ships/${shipSymbol}/scan/systems`)

export const createShipOrbit = mutationFnFactory<
  SpaceTradersResponse<{ nav: NavigationResponse }>,
  { shipSymbol: string }
>(({ shipSymbol }) => `my/ships/${shipSymbol}/orbit`)
export const createShipDock = mutationFnFactory<
  SpaceTradersResponse<{ nav: NavigationResponse }>,
  { shipSymbol: string }
>(({ shipSymbol }) => `my/ships/${shipSymbol}/dock`)

export const createShipNavigate = mutationFnFactory<
  SpaceTradersResponse<{ nav: NavigationResponse; fuel: FuelResponse }>,
  { shipSymbol: string },
  { waypointSymbol: string }
>(({ shipSymbol }) => `my/ships/${shipSymbol}/navigate`)

export const createShipWarp = mutationFnFactory<
  SpaceTradersResponse<{ nav: NavigationResponse; fuel: FuelResponse }>,
  { shipSymbol: string },
  { waypointSymbol: string }
>(({ shipSymbol }) => `my/ships/${shipSymbol}/warp`)

export const createShipJump = mutationFnFactory<
  SpaceTradersResponse<{ nav: NavigationResponse; cooldown: CooldownResponse }>,
  { shipSymbol: string },
  { systemSymbol: string }
>(({ shipSymbol }) => `my/ships/${shipSymbol}/jump`)

export const createShipRefuel = mutationFnFactory<
  SpaceTradersResponse<{ agent: AgentResponse; fuel: FuelResponse }>,
  { shipSymbol: string }
>(({ shipSymbol }) => `my/ships/${shipSymbol}/refuel`)

export const createShipSurvey = mutationFnFactory<
  SpaceTradersResponse<{ surveys: SurveyResponse[]; cooldown: CooldownResponse }>,
  { shipSymbol: string }
>(({ shipSymbol }) => `my/ships/${shipSymbol}/survey`)

export const createShipExtract = mutationFnFactory<
  SpaceTradersResponse<{ cooldown: CooldownResponse; extraction: ExtractResponse; cargo: ShipCargo }>,
  { shipSymbol: string },
  { survey?: SurveyResponse } | undefined
>(({ shipSymbol }) => `my/ships/${shipSymbol}/extract`)

export const createShipRefine = mutationFnFactory<
  SpaceTradersResponse<{
    cooldown: CooldownResponse
    cargo: ShipCargo
    produced: Array<{ tradeSymbol: string; units: 0 }>
    consumed: Array<{ tradeSymbol: string; units: 0 }>
  }>,
  { shipSymbol: string },
  { produce: string }
>(({ shipSymbol }) => `my/ships/${shipSymbol}/refine`)

export const createShipJettison = mutationFnFactory<
  SpaceTradersResponse<{ cargo: ShipCargo }>,
  { shipSymbol: string },
  { symbol: string; units: number }
>(({ shipSymbol }) => `my/ships/${shipSymbol}/jettison`)

export const createShipChart = mutationFnFactory<
  SpaceTradersResponse<{ chart: ChartResponse; waypoint: WaypointResponse }>,
  { shipSymbol: string }
>(({ shipSymbol }) => `my/ships/${shipSymbol}/chart`)
