import {
  AgentResponse,
  ChartResponse,
  CooldownResponse,
  NavigationResponse,
  ShipResponse,
  WaypointResponse,
} from '@/types/spacetraders'
import { mutationFnFactory, queryFnFactory } from './core'

export const getShipsList = queryFnFactory<ShipResponse[]>(() => '/my/ships')

export const getShipById = queryFnFactory<ShipResponse, string>((ship) => `/my/ships/${ship}`)

export const createShipPurchase = mutationFnFactory<
  { agent: AgentResponse; ship: ShipResponse },
  void,
  { shipType: string; waypointSymbol: string }
>(() => '/my/ships')

export const createShipScanWaypoint = mutationFnFactory<unknown, string>((ship) => `/my/ships/${ship}/scan/waypoints`)

export const createShipScanSystems = mutationFnFactory<
  {
    cooldown: CooldownResponse
    systems: Array<{
      symbol: string
      sectorSymbol: string
      type: string
      x: number
      y: number
    }>
  },
  string
>((ship) => `/my/ships/${ship}/scan/systems`)

export const createShipOrbit = mutationFnFactory<{ nav: NavigationResponse }, string, void>(
  (ship) => `/my/ships/${ship}/orbit`,
)

export const createShipChart = mutationFnFactory<{ chart: ChartResponse; waypoint: WaypointResponse }, string>(
  (ship) => `/my/ships/${ship}/chart`,
)
