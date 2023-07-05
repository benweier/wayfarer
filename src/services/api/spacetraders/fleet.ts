import {
  AgentResponse,
  ChartResponse,
  CooldownResponse,
  ExtractResponse,
  FuelResponse,
  MarketTransaction,
  NavigationResponse,
  ShipCargo,
  ShipResponse,
  SurveyResponse,
  WaypointResponse,
} from '@/types/spacetraders'
import { Meta, SpaceTradersResponse, mutationFnFactory, queryFnFactory } from './core'

export const getShipsList = queryFnFactory<SpaceTradersResponse<ShipResponse[], Meta>>(() => 'my/ships')

export const getShipById = queryFnFactory<SpaceTradersResponse<ShipResponse>, { shipID: string }>(
  ({ shipID }) => `my/ships/${shipID}`,
)

export const createShipPurchase = mutationFnFactory<
  SpaceTradersResponse<{ agent: AgentResponse; ship: ShipResponse }>,
  void,
  { shipType: string; waypointSymbol: string }
>(() => 'my/ships')

export const createShipCargoPurchase = mutationFnFactory<
  SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; transaction: MarketTransaction }>,
  { shipID: string },
  { symbol: string; units: number }
>(({ shipID }) => `my/ships/${shipID}/purchase`)

export const createShipCargoSell = mutationFnFactory<
  SpaceTradersResponse<{ agent: AgentResponse; cargo: ShipCargo; transaction: MarketTransaction }>,
  { shipID: string },
  { symbol: string; units: number }
>(({ shipID }) => `my/ships/${shipID}/sell`)

export const createShipScanWaypoint = mutationFnFactory<
  SpaceTradersResponse<{ waypoints: WaypointResponse[]; cooldown: CooldownResponse }>,
  { shipID: string }
>(({ shipID }) => `my/ships/${shipID}/scan/waypoints`)

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
  { shipID: string }
>(({ shipID }) => `my/ships/${shipID}/scan/systems`)

export const createShipOrbit = mutationFnFactory<
  SpaceTradersResponse<{ nav: NavigationResponse }>,
  { shipID: string },
  void
>(({ shipID }) => `my/ships/${shipID}/orbit`)
export const createShipDock = mutationFnFactory<
  SpaceTradersResponse<{ nav: NavigationResponse }>,
  { shipID: string },
  void
>(({ shipID }) => `my/ships/${shipID}/dock`)

export const createShipNavigate = mutationFnFactory<
  SpaceTradersResponse<{ nav: NavigationResponse; fuel: FuelResponse }>,
  { shipID: string },
  { waypointSymbol: string }
>(({ shipID }) => `my/ships/${shipID}/navigate`)

export const createShipWarp = mutationFnFactory<
  SpaceTradersResponse<{ nav: NavigationResponse; fuel: FuelResponse }>,
  { shipID: string },
  { waypointSymbol: string }
>(({ shipID }) => `my/ships/${shipID}/warp`)

export const createShipJump = mutationFnFactory<
  SpaceTradersResponse<{ nav: NavigationResponse; cooldown: CooldownResponse }>,
  { shipID: string },
  { systemSymbol: string }
>(({ shipID }) => `my/ships/${shipID}/jump`)

export const createShipRefuel = mutationFnFactory<
  SpaceTradersResponse<{ agent: AgentResponse; fuel: FuelResponse }>,
  { shipID: string }
>(({ shipID }) => `my/ships/${shipID}/refuel`)

export const createShipSurvey = mutationFnFactory<
  SpaceTradersResponse<{ surveys: SurveyResponse[]; cooldown: CooldownResponse }>,
  { shipID: string }
>(({ shipID }) => `my/ships/${shipID}/survey`)

export const createShipExtract = mutationFnFactory<
  SpaceTradersResponse<{ cooldown: CooldownResponse; extraction: ExtractResponse; cargo: ShipCargo }>,
  { shipID: string },
  { survey?: SurveyResponse } | void
>(({ shipID }) => `my/ships/${shipID}/extract`)

export const createShipRefine = mutationFnFactory<
  SpaceTradersResponse<{
    cooldown: CooldownResponse
    cargo: ShipCargo
    produced: Array<{ tradeSymbol: string; units: 0 }>
    consumed: Array<{ tradeSymbol: string; units: 0 }>
  }>,
  { shipID: string },
  { produce: string }
>(({ shipID }) => `my/ships/${shipID}/refine`)

export const createShipJettison = mutationFnFactory<
  SpaceTradersResponse<{ cargo: ShipCargo }>,
  { shipID: string },
  { symbol: string; units: number }
>(({ shipID }) => `my/ships/${shipID}/jettison`)

export const createShipChart = mutationFnFactory<
  SpaceTradersResponse<{ chart: ChartResponse; waypoint: WaypointResponse }>,
  { shipID: string }
>(({ shipID }) => `my/ships/${shipID}/chart`)
