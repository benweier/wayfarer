import {
  JumpGateResponse,
  MarketResponse,
  ShipyardResponse,
  SystemsResponse,
  WaypointResponse,
} from '@/types/spacetraders'
import { Meta, SpaceTradersResponse, queryFnFactory } from './core'

export const getSystemsList = queryFnFactory<SpaceTradersResponse<SystemsResponse[], Meta>>(() => '/systems')

export const getWaypointsList = queryFnFactory<SpaceTradersResponse<WaypointResponse[], Meta>, string>(
  (system) => `/systems/${system}/waypoints`,
)

export const getSystemById = queryFnFactory<SpaceTradersResponse<SystemsResponse>, string>(
  (system) => `/systems/${system}`,
)

export const getWaypointById = queryFnFactory<
  SpaceTradersResponse<WaypointResponse>,
  { system: string; waypoint: string }
>(({ system, waypoint }) => `/systems/${system}/waypoints/${waypoint}`)

export const getMarket = queryFnFactory<SpaceTradersResponse<MarketResponse>, { system: string; waypoint: string }>(
  ({ system, waypoint }) => `/systems/${system}/waypoints/${waypoint}/market`,
)

export const getShipyard = queryFnFactory<SpaceTradersResponse<ShipyardResponse>, { system: string; waypoint: string }>(
  ({ system, waypoint }) => `/systems/${system}/waypoints/${waypoint}/shipyard`,
)

export const getJumpGate = queryFnFactory<SpaceTradersResponse<JumpGateResponse>, { system: string; waypoint: string }>(
  ({ system, waypoint }) => `/systems/${system}/waypoints/${waypoint}/jump-gate`,
)
