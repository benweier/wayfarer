import {
  JumpGateResponse,
  MarketResponse,
  ShipyardResponse,
  SystemsResponse,
  WaypointResponse,
} from '@/types/spacetraders'
import { Meta, SpaceTradersResponse, queryFnFactory } from './core'

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
  { systemSymbol: string; waypointID: string }
>(({ systemSymbol, waypointID }) => `systems/${systemSymbol}/waypoints/${waypointID}`)

export const getMarket = queryFnFactory<
  SpaceTradersResponse<MarketResponse>,
  { systemSymbol: string; waypointID: string }
>(({ systemSymbol, waypointID }) => `systems/${systemSymbol}/waypoints/${waypointID}/market`)

export const getShipyard = queryFnFactory<
  SpaceTradersResponse<ShipyardResponse>,
  { systemSymbol: string; waypointID: string }
>(({ systemSymbol, waypointID }) => `systems/${systemSymbol}/waypoints/${waypointID}/shipyard`)

export const getJumpGate = queryFnFactory<
  SpaceTradersResponse<JumpGateResponse>,
  { systemSymbol: string; waypointID: string }
>(({ systemSymbol, waypointID }) => `systems/${systemSymbol}/waypoints/${waypointID}/jump-gate`)
