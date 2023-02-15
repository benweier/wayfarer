import { AgentResponse, ChartResponse, NavigationResponse, ShipResponse, WaypointResponse } from '@/types/spacetraders'
import * as st from './core'

export const getShipsList = () => st.get<ShipResponse[]>('/my/ships')

export const getShipById = (ship: string) => st.get<ShipResponse>(`/my/ships/${ship}`)

export const createShipPurchase = (ship: string, waypoint: string) =>
  st.post<{ agent: AgentResponse; ship: ShipResponse }, { shipType: string; waypointSymbol: string }>('/my/ships', {
    shipType: ship,
    waypointSymbol: waypoint,
  })

export const createShipScanWaypoint = (ship: string) => st.post<unknown>(`/my/ships/${ship}/scan/waypoints`)

export const createShipOrbit = (ship: string) => st.post<{ nav: NavigationResponse }>(`/my/ships/${ship}/orbit`)

export const createShipChart = (ship: string) =>
  st.post<{ chart: ChartResponse; waypoint: WaypointResponse }>(`/my/ships/${ship}/chart`)
