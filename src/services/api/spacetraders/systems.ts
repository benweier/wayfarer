import {
  type JumpGateResponse,
  type MarketResponse,
  type ShipyardResponse,
  type SystemsResponse,
  type WaypointResponse,
} from '@/types/spacetraders'
import { type Meta, type SpaceTradersResponse, queryFnFactory } from './core'

export const getSystemsList = queryFnFactory<SpaceTradersResponse<SystemsResponse[], Meta>>(() => 'systems')

export const getWaypointsList = queryFnFactory<
  SpaceTradersResponse<WaypointResponse[], Meta>,
  { systemSymbol: string }
>(({ systemSymbol }) => `systems/${systemSymbol}/waypoints`)

export const getSystemById = queryFnFactory<SpaceTradersResponse<SystemsResponse>, { systemSymbol: string }>(
  ({ systemSymbol }) => `systems/${systemSymbol}`,
)

export const getWaypointById = queryFnFactory<
  SpaceTradersResponse<WaypointResponse>,
  { systemSymbol: string; waypointSymbol: string }
>(({ systemSymbol, waypointSymbol }) => `systems/${systemSymbol}/waypoints/${waypointSymbol}`)

export const getMarket = queryFnFactory<
  SpaceTradersResponse<MarketResponse>,
  { systemSymbol: string; waypointSymbol: string }
>(({ systemSymbol, waypointSymbol }) => `systems/${systemSymbol}/waypoints/${waypointSymbol}/market`)

export const getShipyard = queryFnFactory<
  SpaceTradersResponse<ShipyardResponse>,
  { systemSymbol: string; waypointSymbol: string }
>(({ systemSymbol, waypointSymbol }) => `systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`)

export const getJumpGate = queryFnFactory<
  SpaceTradersResponse<JumpGateResponse>,
  { systemSymbol: string; waypointSymbol: string }
>(({ systemSymbol, waypointSymbol }) => `systems/${systemSymbol}/waypoints/${waypointSymbol}/jump-gate`)
