import { AvailableShipsResponse, YourShip } from '@/types/spacetraders'
import * as st from './core'

export const myShipsQuery = () => st.get<{ ships: YourShip[] }>('/my/ships')

export const shipListingsQuery = (args: { class?: string; system: string }) =>
  st.get<AvailableShipsResponse>(`/systems/${args.system}/ship-listings`, args)

export const purchaseShipMutation = (payload: { location: string; type: string }) =>
  st.post<{ credits: number; ship: YourShip }, { location: string; type: string }>('/my/ships', payload)
