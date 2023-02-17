import { MarketResponse, SystemsResponse, WaypointResponse } from '@/types/spacetraders'
import { queryFnFactory } from './core'

export const getSystemsList = queryFnFactory<SystemsResponse[], void>(() => '/systems')

export const getWaypointsListBySystem = queryFnFactory<WaypointResponse[], string>(
  (system) => `/systems/${system}/waypoints`,
)

export const getSystemById = queryFnFactory<SystemsResponse, string>((system) => `/systems/${system}`)

export const getWaypointById = queryFnFactory<WaypointResponse, { system: string; waypoint: string }>(
  ({ system, waypoint }) => `/systems/${system}/waypoints/${waypoint}`,
)

export const getMarket = queryFnFactory<MarketResponse, { system: string; waypoint: string }>(
  ({ system, waypoint }) => `/systems/${system}/waypoints/${waypoint}/market`,
)

export const getShipyard = queryFnFactory<SystemsResponse, { system: string; waypoint: string }>(
  ({ system, waypoint }) => `/systems/${system}/waypoints/${waypoint}/shipyard`,
)

export const getJumpGate = queryFnFactory<SystemsResponse, { system: string; waypoint: string }>(
  ({ system, waypoint }) => `/systems/${system}/waypoints/${waypoint}/jump-gate`,
)
