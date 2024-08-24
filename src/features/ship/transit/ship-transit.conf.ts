export const ShipTransitState = {
  Complete: 'COMPLETE',
  InProgress: 'IN_PROGRESS',
} as const

export type ShipTransitState = Keys<typeof ShipTransitState>
