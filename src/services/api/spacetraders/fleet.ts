import {
  AgentResponse,
  ChartResponse,
  CooldownResponse,
  ExtractResponse,
  FuelResponse,
  NavigationResponse,
  ShipCargo,
  ShipResponse,
  SurveyResponse,
  WaypointResponse,
} from '@/types/spacetraders'
import { Meta, SpaceTradersResponse, mutationFnFactory, queryFnFactory } from './core'

export const getShipsList = queryFnFactory<SpaceTradersResponse<ShipResponse[], Meta>>(() => '/my/ships')

export const getShipById = queryFnFactory<SpaceTradersResponse<ShipResponse>, string>((ship) => `/my/ships/${ship}`)

export const createShipPurchase = mutationFnFactory<
  SpaceTradersResponse<{ agent: AgentResponse; ship: ShipResponse }>,
  void,
  { shipType: string; waypointSymbol: string }
>(() => '/my/ships')

export const createShipScanWaypoint = mutationFnFactory<
  SpaceTradersResponse<{ waypoints: WaypointResponse[]; cooldown: CooldownResponse }>,
  string
>((ship) => `/my/ships/${ship}/scan/waypoints`)

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
  string
>((ship) => `/my/ships/${ship}/scan/systems`)

export const createShipOrbit = mutationFnFactory<SpaceTradersResponse<{ nav: NavigationResponse }>, string, void>(
  (ship) => `/my/ships/${ship}/orbit`,
)
export const createShipDock = mutationFnFactory<SpaceTradersResponse<{ nav: NavigationResponse }>, string, void>(
  (ship) => `/my/ships/${ship}/dock`,
)

export const createShipNavigate = mutationFnFactory<
  SpaceTradersResponse<{ nav: NavigationResponse; fuel: FuelResponse }>,
  string,
  { waypointSymbol: string }
>((ship) => `/my/ships/${ship}/navigate`)

export const createShipWarp = mutationFnFactory<
  SpaceTradersResponse<{ nav: NavigationResponse; fuel: FuelResponse }>,
  string,
  { waypointSymbol: string }
>((ship) => `/my/ships/${ship}/warp`)

export const createShipJump = mutationFnFactory<
  SpaceTradersResponse<{ nav: NavigationResponse; cooldown: CooldownResponse }>,
  string,
  { systemSymbol: string }
>((ship) => `/my/ships/${ship}/jump`)

export const createShipRefuel = mutationFnFactory<
  SpaceTradersResponse<{ agent: AgentResponse; fuel: FuelResponse }>,
  string
>((ship) => `/my/ships/${ship}/refuel`)

export const createShipSurvey = mutationFnFactory<
  SpaceTradersResponse<{ surveys: SurveyResponse[]; cooldown: CooldownResponse }>,
  string
>((ship) => `/my/ships/${ship}/survey`)

export const createShipExtract = mutationFnFactory<
  SpaceTradersResponse<{ cooldown: CooldownResponse; extraction: ExtractResponse; cargo: ShipCargo }>,
  string,
  { survey?: SurveyResponse } | void
>((ship) => `/my/ships/${ship}/extract`)

export const createShipRefine = mutationFnFactory<
  SpaceTradersResponse<{
    cooldown: CooldownResponse
    cargo: ShipCargo
    produced: Array<{ tradeSymbol: string; units: 0 }>
    consumed: Array<{ tradeSymbol: string; units: 0 }>
  }>,
  string,
  { produce: string }
>((ship) => `/my/ships/${ship}/refine`)

export const createShipJettison = mutationFnFactory<
  SpaceTradersResponse<{ cargo: ShipCargo }>,
  string,
  { symbol: string; units: number }
>((ship) => `/my/ships/${ship}/jettison`)

export const createShipChart = mutationFnFactory<
  SpaceTradersResponse<{ chart: ChartResponse; waypoint: WaypointResponse }>,
  string
>((ship) => `/my/ships/${ship}/chart`)
