import { MarketResponse, SystemsResponse, WaypointResponse } from '@/types/spacetraders'
import * as st from './core'

export const getSystemsList = () => st.get<SystemsResponse[]>('/systems')

export const getWaypointsListBySystem = (system: string) => st.get<WaypointResponse[]>(`/systems/${system}/waypoints`)

export const getSystemById = (system: string) => st.get<SystemsResponse>(`/systems/${system}`)

export const getWaypointById = (system: string, waypoint: string) =>
  st.get<WaypointResponse>(`/systems/${system}/waypoints/${waypoint}`)

export const getMarket = (system: string, waypoint: string) =>
  st.get<MarketResponse>(`/systems/${system}/waypoints/${waypoint}/market`)

export const getShipyard = (system: string, waypoint: string) =>
  st.get<SystemsResponse>(`/systems/${system}/waypoints/${waypoint}/shipyard`)

export const getJumpGate = (system: string, waypoint: string) =>
  st.get<SystemsResponse>(`/systems/${system}/waypoints/${waypoint}/jump-gate`)
