import { Meta, SpaceTradersResponse, queryFnFactory } from '@/services/api/spacetraders/core'
import { FactionResponse } from '@/types/spacetraders'

export const getFactionsList = queryFnFactory<SpaceTradersResponse<FactionResponse[], Meta>>(() => 'factions')

export const getFactionById = queryFnFactory<SpaceTradersResponse<FactionResponse>, { factionSymbol: string }>(
  ({ factionSymbol }) => `factions/${factionSymbol}`,
)
