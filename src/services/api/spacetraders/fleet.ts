import {
  AgentResponse,
  ChartResponse,
  CooldownResponse,
  NavigationResponse,
  ShipResponse,
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

export const createShipScanWaypoint = mutationFnFactory<SpaceTradersResponse<unknown>, string>(
  (ship) => `/my/ships/${ship}/scan/waypoints`,
)

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

export const createShipChart = mutationFnFactory<
  SpaceTradersResponse<{ chart: ChartResponse; waypoint: WaypointResponse }>,
  string
>((ship) => `/my/ships/${ship}/chart`)
