import {
  JumpGateResponse,
  MarketResponse,
  ShipyardResponse,
  SystemsResponse,
  WaypointResponse,
} from '@/types/spacetraders'
import { Meta, SpaceTradersResponse, queryFnFactory } from './core'

export const getSystemsList = queryFnFactory<SpaceTradersResponse<SystemsResponse[], Meta>>(() => 'systems')

export const getWaypointsList = queryFnFactory<SpaceTradersResponse<WaypointResponse[], Meta>, { systemID: string }>(
  ({ systemID }) => `systems/${systemID}/waypoints`,
)

export const getSystemById = queryFnFactory<SpaceTradersResponse<SystemsResponse>, { systemID: string }>(
  ({ systemID }) => `systems/${systemID}`,
)

export const getWaypointById = queryFnFactory<
  SpaceTradersResponse<WaypointResponse>,
  { systemID: string; waypointID: string }
>(({ systemID, waypointID }) => `systems/${systemID}/waypoints/${waypointID}`)

export const getMarket = queryFnFactory<SpaceTradersResponse<MarketResponse>, { systemID: string; waypointID: string }>(
  ({ systemID, waypointID }) => `systems/${systemID}/waypoints/${waypointID}/market`,
)

export const getShipyard = queryFnFactory<
  SpaceTradersResponse<ShipyardResponse>,
  { systemID: string; waypointID: string }
>(({ systemID, waypointID }) => `systems/${systemID}/waypoints/${waypointID}/shipyard`)

export const getJumpGate = queryFnFactory<
  SpaceTradersResponse<JumpGateResponse>,
  { systemID: string; waypointID: string }
>(({ systemID, waypointID }) => `systems/${systemID}/waypoints/${waypointID}/jump-gate`)
