import { SystemsResponse } from '@/types/spacetraders'
import * as st from './core'

export const availableSystemsQuery = () => st.get<SystemsResponse>('/game/systems')
