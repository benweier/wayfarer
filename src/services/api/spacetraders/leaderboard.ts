import { LeaderboardResponse } from '@/types/spacetraders'
import * as st from './core'

export const leaderboardQuery = () => st.get<LeaderboardResponse>(`/game/leaderboard/net-worth`)
