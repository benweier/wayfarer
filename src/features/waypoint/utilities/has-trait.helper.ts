import type { WaypointTraits } from '@/config/spacetraders'
import type { WaypointTrait } from '@/types/spacetraders'

export const hasTrait = (traits: WaypointTrait[] = [], symbol: WaypointTraits[] = []) => {
  return traits?.findIndex((trait) => symbol.indexOf(trait.symbol) > -1) > -1
}
