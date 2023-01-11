import { YourShip } from '@/types/spacetraders'
import * as st from './core'

export const myShipsQuery = () => st.get<{ ships: YourShip[] }>('/my/ships')
