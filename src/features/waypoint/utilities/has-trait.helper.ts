import { type WaypointTrait } from '@/types/spacetraders'

export const hasTrait = (traits?: WaypointTrait[], symbol?: string[]) => {
  return traits?.find((trait) => symbol?.includes(trait.symbol)) !== undefined
}
