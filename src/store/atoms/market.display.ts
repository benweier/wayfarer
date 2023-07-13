import { atomWithStorage } from 'jotai/utils'

type MarketDisplayModeState = 'grid' | 'list'
type MarketDescriptionState = boolean

export const marketDisplayAtom = atomWithStorage<MarketDisplayModeState>('market.display', 'grid')
export const marketDescriptionAtom = atomWithStorage<MarketDescriptionState>('market.description', true)
