import { ShipResponse } from '@/types/spacetraders'
import * as st from './core'

export const myShipsQuery = () => st.get<ShipResponse[]>(`/my/ships`)

export const getShipByIdQuery = (id: string) => st.get<ShipResponse>(`/my/ships/${id}`)
